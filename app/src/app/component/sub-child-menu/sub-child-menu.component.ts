/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Sub child menu component component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 20:05:19 
 * Last modified  : 2022-07-05 20:41:10
 */ 

import { Component, OnInit, Input, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { CrudCourseMaterialTypeComponent } from "../crud-course-material-type/crud-course-material-type.component";

@Component({
	selector: "sub-child-menu",
	templateUrl: "./sub-child-menu.component.html",
	styleUrls: ["./sub-child-menu.component.scss"],
})
export class SubChildMenuComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	  * -------------------------------------------------|
	  * @description										|
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */
	@Input() childArticleId: string;

	/**
	 * Input  of child menu component
	 */
	@Input() courseMaterialId: string;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	subChildMenu$!: Observable<SubChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	totalNumberOfSubChildMenu$!: Observable<number>;

	/**
	 * Course material$ of sub child menu component
	 */
	courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Determines whether data has
	 */
	hasData$!: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get isMaterialOwner()
	{
		let isMaterialOwner = false;
		this.courseMaterial$.subscribe(data =>
		{
			const loggedInUser = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID);
			isMaterialOwner = loggedInUser === data.userId ? true : false
		});

		return isMaterialOwner;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of course material page.
	 * @param injector 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private translateService: TranslateService,
		private cookieService: CookieService,
		private courseMaterialStateFacade: CourseMaterialStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.subChildMenu$ = this.courseMaterialMenuStateFacade.subChildMenuByChildId$(this.childArticleId);
		this.totalNumberOfSubChildMenu$ = this.courseMaterialMenuStateFacade.totalNumberOfSubChildMenu$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this.courseMaterialId);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Opens crud course material
	 */
	 private async openCrudCourseMaterialType()
	 {
		 const modal = await this.modalController.create({
			 component: CrudCourseMaterialTypeComponent,
			 cssClass: 'modal-view',
			 backdropDismiss: false,
			 componentProps: {
				 menuType: MenuTypeEnum.SUB_CHILD_MENU
			 }
		 });
 
		 // present modal
		 await modal.present();
	 }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Adds new sub child
	 */
	async addNewSubChild()
	{
		let totalNumberOfSubChildMenu = 0;
		this.subChildMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfSubChildMenu = data.length)

		// build a empty object
		const subChildMenuModel: SubChildMenuModel = {
			childArticleId: this.childArticleId,
			subChildArticleOrder: totalNumberOfSubChildMenu + 1,
			courseMaterialId: this.courseMaterialId,
			articleTitle: '',
			operationType: OperationsEnum.CREATE
		}

		this.courseMaterialMenuStateFacade.actUponSubChildMenu(subChildMenuModel, OperationsEnum.CREATE);
		
		this.openCrudCourseMaterialType();
	}

	/**
	 * Navigates to course material article
	 * @param subChildMenuModel 
	 */
	public navigateToCourseMaterialArticle(subChildMenuModel: SubChildMenuModel)
	{
		const menuSelectModel: MenuSelectModel = {
			articleId: subChildMenuModel.subChildArticleId,
			courseMaterialId: subChildMenuModel.courseMaterialId,
			menuType: MenuTypeEnum.SUB_CHILD_MENU,
			courseMaterialType: subChildMenuModel.courseMaterialTypeId
		}
		this.courseMaterialMenuStateFacade.storeSelectedMenu(menuSelectModel);
	}

	/**
	 * Gets menu icon
	 * @param eachMenu 
	 * @returns  
	 */
	 public getMenuIcon(eachMenu: SubChildMenuModel)
	 {
		 return ArrayKey.COURSE_MATERIAL_TYPE.filter(eachType => eachType.id === eachMenu.courseMaterialTypeId)[0].icon;
	 }
	
	/**
	 * Edits child menu
	 * @param eachMenu 
	 */
	 public editSubChildMenu(eachMenu: ChildMenuModel)
	 {
		 const subChildMenuModel: SubChildMenuModel = {
			 ...eachMenu,
			 operationType: OperationsEnum.EDIT
		 }
		
		this.courseMaterialMenuStateFacade.actUponSubChildMenu(subChildMenuModel, OperationsEnum.EDIT);
 
		 this.openCrudCourseMaterialType();
	 }
 
	/**
	 * Deletes child menu
	 * @param eachMenu 
	 */
	public deleteSubChildMenu(eachMenu: SubChildMenuModel)
	 {
		 this.translateService
			  .get([
				  'actionAlert.confirm',
				  'actionAlert.delete',
				  'option.yes',
				  'option.no',
			  ]).pipe(takeUntil(this.unsubscribe))
			  .subscribe(async data =>
			  {
  
				  const alert = await this.alertController.create({
					  header: `${data['actionAlert.confirm']}`,
					  subHeader: data['actionAlert.delete'],
					  cssClass: 'custom-alert',
					  mode: 'md',
					  buttons: [
						  {
							  cssClass: 'ok-button ',
							  text: data['option.yes'],
							  handler: (_) =>
							  {
								 const subChildMenuModel: SubChildMenuModel = {
									 ...eachMenu,
									 operationType: OperationsEnum.DELETE
								 }
							 
								 this.courseMaterialMenuStateFacade.actUponSubChildMenu(subChildMenuModel, OperationsEnum.DELETE);
						 
								 this.openCrudCourseMaterialType();
							  }
						  },
						  {
							  cssClass: 'cancel-button',
							  text: data['option.no'],
							  handler: () =>
							  {
							  }
						  }
					  ]
				  });
				  await alert.present();
			  });
	 }
}

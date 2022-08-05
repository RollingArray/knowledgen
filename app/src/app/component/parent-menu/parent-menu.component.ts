/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent Menu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 20:00:41 
 * Last modified  : 2022-08-05 15:08:19
 */

import { Component, OnInit, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseViewComponent } from "../base/base-view.component";
import { CrudCourseMaterialTypeComponent } from "../crud-course-material-type/crud-course-material-type.component";

@Component({
	selector: "parent-menu",
	templateUrl: "./parent-menu.component.html",
	styleUrls: ["./parent-menu.component.scss"],
})
export class ParentMenuComponent extends BaseViewComponent implements OnInit
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
	parentMenuMenu$!: Observable<ParentMenuModel[]>;

	/**
	 * Course material owner$ of parent menu component
	 */
	courseMaterialOwner$!: Observable<string>;

	/**
	 * Logged in user id$ of parent menu component
	 */
	loggedInUserId$: Observable<string>;

	/**
	 * Course material$ of parent menu component
	 */
	courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Course material id of parent menu component
	 */
	private _courseMaterialId: string;

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
	get courseMaterialId()
	{
		return this._courseMaterialId;
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
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.translateService
			.get('loading.holdTight')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				this.errorMessage = data;
			});
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets course material material
	 */
	async getCourseMaterialMenu()
	{
		const courseMaterialModel: CourseMaterialModel = {
			courseMaterialId: this._courseMaterialId
		};

		this.translateService
			.get('loading.wait')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		this.courseMaterialMenuStateFacade.requestCourseMaterial(courseMaterialModel);
	}

	/**
	 * Opens crud course material type
	 */
	private async openCrudCourseMaterialType()
	{
		const modal = await this.modalController.create({
			component: CrudCourseMaterialTypeComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				menuType: MenuTypeEnum.PARENT_MENU
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
	 * @description Loads data
	 */
	public loadData()
	{
		this._courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');
		this.getCourseMaterialMenu();
		this.parentMenuMenu$ = this.courseMaterialMenuStateFacade.menuByCourseMaterialId$(this._courseMaterialId);
		this.courseMaterialOwner$ = this.courseMaterialStateFacade.courseMaterialOwner$(this._courseMaterialId);
		this.loggedInUserId$ = this.rootStateFacade.loggedInUserId$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this._courseMaterialId);
	}

	/**
	 * Adds new parent menu
	 */
	public async addNewParentMenu()
	{
		let totalNumberOfMenu = 0;
		this.parentMenuMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfMenu = data.length)

		const parentMenuModel: ParentMenuModel = {
			parentArticleOrder: totalNumberOfMenu + 1,
			courseMaterialId: this.courseMaterialId,
			articleTitle: '',
			articleSummery: '',
			articleCompletionReward: 10,
			articleCompletionTime: 10,
			operationType: OperationsEnum.CREATE
		}
	
		this.courseMaterialMenuStateFacade.actUponParentMenu(parentMenuModel, OperationsEnum.CREATE);

		this.openCrudCourseMaterialType();
	}

	/**
	 * Navigates to course material article
	 * @param parentMenuModel 
	 */
	public navigateToCourseMaterialArticle(parentMenuModel: ParentMenuModel)
	 {
		 const menuSelectModel: MenuSelectModel = {
			 articleId: parentMenuModel.parentArticleId,
			 articleStatus: parentMenuModel.articleStatus,
			 courseMaterialId: parentMenuModel.courseMaterialId,
			 menuType: MenuTypeEnum.PARENT_MENU,
			 courseMaterialType: parentMenuModel.courseMaterialTypeId
		 }
		 this.courseMaterialMenuStateFacade.storeSelectedMenu(menuSelectModel);
	 }

	/**
	 * Gets menu icon
	 * @param eachMenu 
	 * @returns  
	 */
	public getMenuIcon(eachMenu: ParentMenuModel)
	{
		return ArrayKey.COURSE_MATERIAL_TYPE.filter(eachType => eachType.id === eachMenu.courseMaterialTypeId)[0].icon;
	}

	/**
	 * Edits parent menu
	 * @param eachMenu 
	 */
	public editParentMenu(eachMenu: ParentMenuModel)
	{
		const parentMenuModel: ParentMenuModel = {
			...eachMenu,
			operationType: OperationsEnum.EDIT
		}
	
		this.courseMaterialMenuStateFacade.actUponParentMenu(parentMenuModel, OperationsEnum.EDIT);

		this.openCrudCourseMaterialType();
	}

	/**
	 * Deletes parent menu
	 * @param eachMenu 
	 */
	public deleteParentMenu(eachMenu: ParentMenuModel)
	{
		this.translateService
			 .get([
				 'actionAlert.delete',
				 'actionAlert.deleteMenu',
				 'option.yes',
				 'option.no',
			 ]).pipe(takeUntil(this.unsubscribe))
			 .subscribe(async data =>
			 {
 
				 const alert = await this.alertController.create({
					 header: `${data['actionAlert.delete']}`,
					 subHeader: data['actionAlert.deleteMenu'],
					 cssClass: 'custom-alert',
					 mode: 'md',
					 buttons: [
						 {
							 cssClass: 'ok-button ',
							 text: data['option.yes'],
							 handler: (_) =>
							 {
								const parentMenuModel: ParentMenuModel = {
									...eachMenu,
									operationType: OperationsEnum.DELETE
								}
							
								this.courseMaterialMenuStateFacade.actUponParentMenu(parentMenuModel, OperationsEnum.DELETE);
						
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

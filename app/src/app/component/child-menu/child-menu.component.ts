/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:47:28 
 * Last modified  : 2022-08-05 15:08:35
 */
import { Component, OnInit, Input, Output, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { BaseViewComponent } from "../base/base-view.component";
import { CrudCourseMaterialTypeComponent } from "../crud-course-material-type/crud-course-material-type.component";

@Component({
	selector: "child-menu",
	templateUrl: "./child-menu.component.html",
	styleUrls: ["./child-menu.component.scss"],
})
export class ChildMenuComponent extends BaseViewComponent implements OnInit
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
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */
	@Input() parentArticleId: string;

	/**
	 * Input  of child menu component
	 */
	@Input() courseMaterialId: string;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	childMenu$!: Observable<ChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	totalNumberOfChildMenu$!: Observable<number>;

	/**
	 * Course material$ of child menu component
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
		this.courseMaterial$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data =>
			{
				if (data && data.userId)
				{
					const loggedInUser = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID);
					isMaterialOwner = loggedInUser === data.userId ? true : false
				}
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
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private translateService: TranslateService,
		private cookieService: CookieService
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.childMenu$ = this.courseMaterialMenuStateFacade.childMenuByParentMenuId$(this.parentArticleId);
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
				menuType: MenuTypeEnum.CHILD_MENU
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

	async addNewChild()
	{
		let totalNumberOfChildMenu = 0;
		this.childMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfChildMenu = data.length)

		const childMenuModel: ChildMenuModel = {
			parentArticleId: this.parentArticleId,
			childArticleOrder: totalNumberOfChildMenu + 1,
			courseMaterialId: this.courseMaterialId,
			articleTitle: '',
			articleSummery: '',
			articleCompletionReward: 10,
			articleCompletionTime: 10,
			operationType: OperationsEnum.CREATE
		}

		this.courseMaterialMenuStateFacade.actUponChildMenu(childMenuModel, OperationsEnum.CREATE);

		this.openCrudCourseMaterialType();
	}

	/**
	 * Navigates to course material article
	 * @param childMenuModel 
	 */
	public navigateToCourseMaterialArticle(childMenuModel: ChildMenuModel)
	{
		const menuSelectModel: MenuSelectModel = {
			articleId: childMenuModel.childArticleId,
			articleStatus: childMenuModel.articleStatus,
			courseMaterialId: childMenuModel.courseMaterialId,
			menuType: MenuTypeEnum.CHILD_MENU,
			courseMaterialType: childMenuModel.courseMaterialTypeId
		}
		this.courseMaterialMenuStateFacade.storeSelectedMenu(menuSelectModel);
	}

	/**
	 * Gets menu icon
	 * @param eachMenu 
	 * @returns  
	 */
	public getMenuIcon(eachMenu: ChildMenuModel)
	{
		return ArrayKey.COURSE_MATERIAL_TYPE.filter(eachType => eachType.id === eachMenu.courseMaterialTypeId)[0].icon;
	}

	/**
	 * Edits child menu
	 * @param eachMenu 
	 */
	public editChildMenu(eachMenu: ChildMenuModel)
	{
		const childMenuModel: ChildMenuModel = {
			...eachMenu,
			operationType: OperationsEnum.EDIT
		}

		this.courseMaterialMenuStateFacade.actUponChildMenu(childMenuModel, OperationsEnum.EDIT);

		this.openCrudCourseMaterialType();
	}

	/**
	 * Deletes child menu
	 * @param eachMenu 
	 */
	public deleteChildMenu(eachMenu: ChildMenuModel)
	{
		this.translateService
			.get([
				'actionAlert.delete',
				'actionAlert.delete',
				'option.yes',
				'option.no',
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				const alert = await this.alertController.create({
					header: `${data['actionAlert.delete']}`,
					subHeader: data['actionAlert.delete'],
					cssClass: 'custom-alert',
					mode: 'md',
					buttons: [
						{
							cssClass: 'ok-button ',
							text: data['option.yes'],
							handler: (_) =>
							{
								const childMenuModel: ChildMenuModel = {
									...eachMenu,
									operationType: OperationsEnum.DELETE
								}

								this.courseMaterialMenuStateFacade.actUponChildMenu(childMenuModel, OperationsEnum.DELETE);

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

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:47:28 
 * Last modified  : 2022-09-22 20:20:57
 */
import { Component, OnInit, Input, Output, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { ArticleStatusTypeEnum } from "src/app/shared/enum/article-status-type.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
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
	 * Input  of child menu component
	 */
	@Input() showSummery = false;

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
	public childMenu$!: Observable<ChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	public totalNumberOfChildMenu$!: Observable<number>;

	/**
	 * Course material$ of child menu component
	 */
	public courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Determines whether data has
	 */
	public hasData$!: Observable<boolean>;

	/**
	 * Selected menu article$ of knowledge base article component
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;

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
					// check user type
					this.rootStateFacade.loggedInUserId$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe((loggedInUser) => {
							isMaterialOwner = loggedInUser === data.userId ? true : false
						});
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
		private rootStateFacade: RootStateFacade
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
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;

		// Selects menu if article id available from param
		this.selectMenuOnParamArticle();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Selects menu on param article
	 */
	private selectMenuOnParamArticle()
	{
		const articleId = this.activatedRoute.snapshot.paramMap.get('articleId');
		if (articleId)
		{
			this.courseMaterialMenuStateFacade.childMenuByArticleId$(articleId)
				.pipe(takeUntil(this.unsubscribe))
				.subscribe((childMenuModel: ChildMenuModel) =>
				{
					if (childMenuModel)
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
				});
		}
	}

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
			articleStatus: ArticleStatusTypeEnum.PREVIEW,
			articleCompletionReward: 0,
			articleCompletionTime: 0,
			articleAllowedIteration: -1,
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
	 * Determines whether child menu action on
	 * @param eachMenu 
	 * @param operationsEnum 
	 */
	public onChildMenuAction(eachMenu: ChildMenuModel, operationsEnum: OperationsEnum)
	 {
		const childMenuModel: ChildMenuModel = {
			...eachMenu,
			operationType: operationsEnum
		}

		this.courseMaterialMenuStateFacade.actUponChildMenu(childMenuModel, operationsEnum);

		this.openCrudCourseMaterialType();
	 }
}

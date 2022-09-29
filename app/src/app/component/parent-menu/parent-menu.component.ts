/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent Menu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 20:00:41 
 * Last modified  : 2022-09-22 20:23:26
 */

import { Component, OnInit, Injector, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { ArticleStatusTypeEnum } from "src/app/shared/enum/article-status-type.enum";
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
	 * Course material id of parent menu component
	 */
	 private _courseMaterialId: string;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	public parentMenu$!: Observable<ParentMenuModel[]>;

	/**
	 * Course material owner$ of parent menu component
	 */
	 public courseMaterialOwner$!: Observable<string>;

	/**
	 * Logged in user id$ of parent menu component
	 */
	 public loggedInUserId$: Observable<string>;

	/**
	 * Course material$ of parent menu component
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
	 * Loading indicator status$ of parent menu component
	 */
	public loadingIndicatorStatus$: Observable<boolean>

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of parent menu component
	 */
	@Input() learningPathCourseMaterialId = '';

	/**
	 * Input  of parent menu component
	 */
	@Input() showSummery = false;

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
		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;
		this._courseMaterialId = this.getCourseMaterialId();
		this.getCourseMaterialMenu();
		this.parentMenu$ = this.courseMaterialMenuStateFacade.menuByCourseMaterialId$(this._courseMaterialId);
		this.courseMaterialOwner$ = this.courseMaterialStateFacade.courseMaterialOwner$(this._courseMaterialId);
		this.loggedInUserId$ = this.rootStateFacade.loggedInUserId$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this._courseMaterialId);
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
		if (this.activatedRoute.snapshot.paramMap.get('articleId'))
		{
			const articleId = this.activatedRoute.snapshot.paramMap.get('articleId');
			if (articleId)
			{
				this.courseMaterialMenuStateFacade.parentMenuByArticleId$(articleId)
					.pipe(takeUntil(this.unsubscribe))
					.subscribe((parentMenuModel: ParentMenuModel) =>
					{
						if (parentMenuModel)
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
					});
			}	
		}
	}

	/**
	 * Gets course material material
	 */
	async getCourseMaterialMenu()
	{
		const courseMaterialModel: CourseMaterialModel = {
			courseMaterialId: this._courseMaterialId
		};

		this.rootStateFacade.startLoading('');

		this.courseMaterialMenuStateFacade.requestCourseMaterialMenu(courseMaterialModel);
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
	 * Gets course material id
	 * @returns  
	 */
	private getCourseMaterialId()
	{
		if (this.learningPathCourseMaterialId)
		{
			return this.learningPathCourseMaterialId;
		}

		else
		{
			return this.activatedRoute.snapshot.paramMap.get('courseMaterialId');
		}
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
		this._courseMaterialId = this.getCourseMaterialId();
		this.getCourseMaterialMenu();
		this.parentMenu$ = this.courseMaterialMenuStateFacade.menuByCourseMaterialId$(this._courseMaterialId);
		this.courseMaterialOwner$ = this.courseMaterialStateFacade.courseMaterialOwner$(this._courseMaterialId);
		this.loggedInUserId$ = this.rootStateFacade.loggedInUserId$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this._courseMaterialId);
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;
		
		// Selects menu if article id available from param
		this.selectMenuOnParamArticle();	
	}

	/**
	 * Adds new parent menu
	 */
	public async addNewParentMenu()
	{
		let totalNumberOfMenu = 0;
		this.parentMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfMenu = data.length)

		const parentMenuModel: ParentMenuModel = {
			parentArticleOrder: totalNumberOfMenu + 1,
			courseMaterialId: this.courseMaterialId,
			articleTitle: '',
			articleSummery: '',
			articleStatus: ArticleStatusTypeEnum.PREVIEW,
			articleCompletionReward: 0,
			articleCompletionTime: 0,
			articleAllowedIteration: -1,
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
	public onParentMenuAction(eachMenu: ParentMenuModel, operationsEnum: OperationsEnum)
	{
		const parentMenuModel: ParentMenuModel = {
			...eachMenu,
			operationType: operationsEnum
		}

		this.courseMaterialMenuStateFacade.actUponParentMenu(parentMenuModel, operationsEnum);

		this.openCrudCourseMaterialType();
	}
}

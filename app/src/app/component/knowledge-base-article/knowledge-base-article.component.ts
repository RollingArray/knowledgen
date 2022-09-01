/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Knowledge base article component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-08-04 18:18:50
 */

import { Component, OnInit, Input, ViewChild, ElementRef, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArticleStatusTypeEnum } from "src/app/shared/enum/article-status-type.enum";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { ElementTypeEnum } from "src/app/shared/enum/element-type.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { TitleTypeEnum } from "src/app/shared/enum/title-type.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { ToastService } from "src/app/shared/service/toast.service";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseViewComponent } from "../base/base-view.component";

@Component({
	selector: 'knowledge-base-article',
	templateUrl: './knowledge-base-article.component.html',
	styleUrls: ['./knowledge-base-article.component.scss'],
})
export class KnowledgeBaseArticleComponent extends BaseViewComponent implements OnInit
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');

	/**
	 * @description Title type enum of search skill component
	 */
	readonly titleTypeEnum = TitleTypeEnum;

	/**
	  * @description String key of search skill component
	  */
	readonly stringKey = StringKey;

	/**
	 * @description Element type enum of knowledge base article component
	 */
	readonly elementTypeEnum = ElementTypeEnum;

	/**
	 * Course material type id enum of knowledge base article component
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

	/**
	 * Article status type enum of knowledge base article component
	 */
	readonly articleStatusTypeEnum = ArticleStatusTypeEnum;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Input & Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Description  of knowledge base article component
	 */
	@Input() articleId: string | number = '';


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Public variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of knowledge base article component
	 */
	public courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Selected menu article$ of knowledge base article component
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;

	/**
	 * Course material owner$ of knowledge base article component
	 */
	public courseMaterialOwner$: Observable<string>;

	/**
	 * Logged in user id$ of knowledge base article component
	 */
	public loggedInUserId$: Observable<string>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Private variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * Article model of articles page
	 */
	private _articleModel!: ArticleModel;

	/**
	 * Article menu type of knowledge base article component
	 */
	private _articleMenuType = MenuTypeEnum.PARENT_MENU;

	/**
	 * Article id of knowledge base article component
	 */
	private _articleId = '';

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * ViewChild variable								|
	 * -------------------------------------------------|
	 */
	@ViewChild('article', { read: ElementRef, static: false }) article: ElementRef;

	/**
	 * View child of knowledge base article component
	 */
	@ViewChild('articleTitleView', { read: ElementRef, static: false }) articleTitleView: ElementRef;

	/**
	 * View child of knowledge base article component
	 */
	@ViewChild('assignmentPropertiesView', { read: ElementRef, static: false }) assignmentPropertiesView: ElementRef;
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */
	/**
	 * Gets article model
	 */
	get articleModel()
	{
		return this._articleModel;
	}

	/**
	 * @description Gets article title
	 */
	get articleTitle()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleTitle');
	}

	/**
	 * @description Gets article title
	 */
	get courseMaterialType()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('courseMaterialTypeId');
	}

	/**
	 * Gets visibility info
	 */
	get visibilityInfo()
	{
		const visibility = 'formInfo.visibilityLive';
		const articleStatus = this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleStatus');
		const courseMaterialTypeId = this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('courseMaterialTypeId');
		return this.selectArticleStatus(articleStatus, courseMaterialTypeId, visibility);
	}

	/**
	 * Gets whether is content live
	 */
	get isContentLive()
	{
		let isContentLive = false;
		const articleStatus = this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleStatus');
		if (articleStatus === ArticleStatusTypeEnum.LIVE)
		{
			isContentLive = true;
		}
		return isContentLive;
	}

	/**
	 * Gets article completion time
	 */
	get articleCompletionTime()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleCompletionTime');
	}

	/**
	 * Gets article completion reward
	 */
	get articleCompletionReward()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleCompletionReward');
	}

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
	 * Creates an instance of knowledge base article component.
	 * @param injector 
	 * @param courseMaterialStateFacade 
	 * @param courseMaterialMenuStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 * @param toastService 
	 */
	constructor(
		injector: Injector,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private toastService: ToastService,
		private cookieService: CookieService
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.courseMaterialOwner$ = this.courseMaterialStateFacade.courseMaterialOwner$(this.courseMaterialId);
		this.loggedInUserId$ = this.rootStateFacade.loggedInUserId$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this.courseMaterialId);
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;
		this.checkArticleMenuType();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Selects article status
	 * @param articleStatus 
	 * @param visibility 
	 * @returns  
	 */
	private selectArticleStatus(articleStatus: string, courseMaterialTypeId: string, visibility: string)
	{
		switch (articleStatus)
		{
			case ArticleStatusTypeEnum.LIVE:
				visibility = 'formInfo.visibilityLive';

				break;

			case ArticleStatusTypeEnum.PREVIEW:
				visibility = 'formInfo.visibilityPreview';

				break;

			default:
				break;
		}
		return visibility;
	}

	/**
	 * Checks article menu type
	 */
	private checkArticleMenuType()
	{
		this.selectedMenuArticle$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(menuSelect =>
			{
				switch (menuSelect.menuType)
				{
					case MenuTypeEnum.PARENT_MENU:
						this._articleMenuType = MenuTypeEnum.PARENT_MENU;
						this._articleId = menuSelect.articleId;
						break;

					case MenuTypeEnum.CHILD_MENU:
						this._articleMenuType = MenuTypeEnum.CHILD_MENU;
						this._articleId = menuSelect.articleId;
						break;
					case MenuTypeEnum.SUB_CHILD_MENU:
						this._articleMenuType = MenuTypeEnum.SUB_CHILD_MENU;
						this._articleId = menuSelect.articleId;
						break;

					default:
						break;
				}

			});
	}

	/**
	 * @description Inits loading
	 */
	private initLoading()
	{
		// present loader
		this.translateService
			.get('loading.changeVisibility')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});
	}

	/**
	 * @description Cruds operation completion
	 */
	private launchOperation()
	{
		switch (this._articleMenuType)
		{
			case MenuTypeEnum.PARENT_MENU:

				this.courseMaterialMenuStateFacade
					.parentMenuByArticleId$(this._articleId)
					.pipe(take(1))
					.subscribe((parentMenuModel: ParentMenuModel) =>
					{
						if (parentMenuModel)
						{
							const model: ParentMenuModel = {
								...parentMenuModel,
								articleStatus: parentMenuModel.articleStatus === ArticleStatusTypeEnum.PREVIEW ? ArticleStatusTypeEnum.LIVE : ArticleStatusTypeEnum.PREVIEW,
								operationType: OperationsEnum.EDIT
							};

							this.courseMaterialMenuStateFacade.editParentMenu(
								model
							);
						}
					});

				break;

			case MenuTypeEnum.CHILD_MENU:
				this.courseMaterialMenuStateFacade
					.childMenuByArticleId$(this._articleId)
					.pipe(take(1))
					.subscribe((childMenuModel: ChildMenuModel) =>
					{
						if (childMenuModel)
						{
							const model: ChildMenuModel = {
								...childMenuModel,
								articleStatus: childMenuModel.articleStatus === ArticleStatusTypeEnum.PREVIEW ? ArticleStatusTypeEnum.LIVE : ArticleStatusTypeEnum.PREVIEW,
								operationType: OperationsEnum.EDIT
							};

							this.courseMaterialMenuStateFacade.editChildMenu(
								model
							);
						}
					});
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				this.courseMaterialMenuStateFacade
					.subChildMenuByArticleId$(this._articleId)
					.pipe(take(1))
					.subscribe((subChildMenuModel: SubChildMenuModel) =>
					{
						if (subChildMenuModel)
						{
							const model: SubChildMenuModel = {
								...subChildMenuModel,
								articleStatus: subChildMenuModel.articleStatus === ArticleStatusTypeEnum.PREVIEW ? ArticleStatusTypeEnum.LIVE : ArticleStatusTypeEnum.PREVIEW,
								operationType: OperationsEnum.EDIT
							};

							this.courseMaterialMenuStateFacade.editSubChildMenu(
								model
							);
						}
					});
				break;

			default:
				break;
		}
	}

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		switch (this._articleMenuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				this.courseMaterialMenuStateFacade.parentMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			case MenuTypeEnum.CHILD_MENU:
				this.courseMaterialMenuStateFacade.childMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				this.courseMaterialMenuStateFacade.subChildMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			default:
				break;
		}
	}

	/**
	 * Operations completion status follow up
	 * @param operationsStatus 
	 */
	private operationCompletionStatusFollowUp(operationsStatus: OperationsEnum)
	{
		switch (operationsStatus)
		{
			case OperationsEnum.SUCCESS:

				// show tost
				this.translateService
					.get('response.changeVisibility')
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (data: string) =>
					{
						// success response
						this.toastService.presentToast(data);
					});

				break;

			default:
				break;
		}
	}


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions knowledge base article component
	 * @param courseMaterialTypeId 
	 * @returns  
	 */
	public getMenuIcon(courseMaterialTypeId: CourseMaterialTypeIdEnum)
	{
		return ArrayKey.COURSE_MATERIAL_TYPE.filter(eachType => eachType.id === courseMaterialTypeId)[0].icon;
	}

	/**
	 * Changes visibility
	 */
	public changeVisibility()
	{
		this.translateService
			.get([
				'actionAlert.confirm',
				'actionAlert.changeVisibilityGeneral',
				'option.yes',
				'option.no',
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				const alert = await this.alertController.create({
					header: `${data['actionAlert.confirm']}`,
					subHeader: data['actionAlert.changeVisibilityGeneral'],
					cssClass: 'custom-alert',
					mode: 'md',
					buttons: [
						{
							cssClass: 'ok-button ',
							text: data['option.yes'],
							handler: (_) =>
							{
								this.initLoading();
								this.launchOperation();
								this.crudOperationCompletion();
							}
						},
						{
							cssClass: 'cancel-button',
							text: data['option.no'],
							handler: () => { }
						}
					]
				});
				await alert.present();
			});
	}
}

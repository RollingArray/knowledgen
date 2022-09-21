/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material article page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-09-21 21:09:19
 */

import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ElementRef, Injector, SimpleChanges } from "@angular/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArticleStatusTypeEnum } from "src/app/shared/enum/article-status-type.enum";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { ElementTypeEnum } from "src/app/shared/enum/element-type.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { TitleTypeEnum } from "src/app/shared/enum/title-type.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "course-material-article",
	templateUrl: "./course-material-article.page.html",
	styleUrls: ["./course-material-article.page.scss"]
})
export class CourseMaterialArticlePage extends BaseViewComponent implements OnInit, OnDestroy, OnChanges
{
	/**
	* -------------------------------------------------|
	* @description										|
	* Readonly properties								|
	* -------------------------------------------------|
	*/
	/**
	 * Description  of course material article page
	 */
	readonly courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');

	/**
	 * Article id of course material article page
	 */
	readonly articleId = this.activatedRoute.snapshot.paramMap.get('articleId');

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
	 * Gets article summery
	 */
	get articleSummery()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleSummery');
	}

	/**
	 * @description Gets article title
	 */
	get courseMaterialType()
	{
		return this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('courseMaterialTypeId');
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
					// check user id
					this.rootStateFacade.loggedInUserId$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe((loggedInUserId) =>
						{
							isMaterialOwner = loggedInUserId === data.userId ? true : false
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
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on changes
	 * @param changes 
	 */
	ngOnChanges(changes: SimpleChanges): void
	{
		throw new Error('Method not implemented.');
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
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

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
}


/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Knowledge base article component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-07-06 17:46:26
 */

import { Component, OnInit, Input, ViewChild, ElementRef, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { ElementTypeEnum } from "src/app/shared/enum/element-type.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { TitleTypeEnum } from "src/app/shared/enum/title-type.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
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
	 * -------------------------------------------------|
	 * @description										|
	 * ViewChild variable								|
	 * -------------------------------------------------|
	 */
	@ViewChild('article', { read: ElementRef, static: false }) article: ElementRef;

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
		let articleTitle = 'noData.contentDeleted';
		this.selectedMenuArticle$
			.subscribe(menuSelect =>
			{
				switch (menuSelect.menuType)
				{
					case MenuTypeEnum.PARENT_MENU:

						this.courseMaterialMenuStateFacade.parentMenuByArticleId$(menuSelect.articleId)
							.subscribe((parentMenuModel: ParentMenuModel) =>
							{
								if (parentMenuModel)
								{
									articleTitle = parentMenuModel.articleTitle;
								}
							});

						break;

					case MenuTypeEnum.CHILD_MENU:
						this.courseMaterialMenuStateFacade.childMenuByArticleId$(menuSelect.articleId)
							.subscribe((childMenuModel: ChildMenuModel) =>
							{
								if (childMenuModel)
								{
									articleTitle = childMenuModel.articleTitle;
								}
							});
						break;
					case MenuTypeEnum.SUB_CHILD_MENU:
						this.courseMaterialMenuStateFacade.subChildMenuByArticleId$(menuSelect.articleId)
							.subscribe((subChildMenuModel: SubChildMenuModel) =>
							{
								if (subChildMenuModel)
								{
									articleTitle = subChildMenuModel.articleTitle;
								}
							});
						break;

					default:
						break;
				}
				if (menuSelect.menuType === MenuTypeEnum.PARENT_MENU)
				{


				}
			});

		return articleTitle;
	}

	/**
	 * @description Gets article title
	 */
	get courseMaterialType()
	{
		let courseMaterialType = '';
		this.selectedMenuArticle$
			.subscribe(menuSelect =>
			{
				switch (menuSelect.menuType)
				{
					case MenuTypeEnum.PARENT_MENU:

						this.courseMaterialMenuStateFacade.parentMenuByArticleId$(menuSelect.articleId)
							.subscribe((parentMenuModel: ParentMenuModel) =>
							{
								if (parentMenuModel)
								{
									courseMaterialType = parentMenuModel.courseMaterialTypeId;
								}
							});

						break;

					case MenuTypeEnum.CHILD_MENU:
						this.courseMaterialMenuStateFacade.childMenuByArticleId$(menuSelect.articleId)
							.subscribe((childMenuModel: ChildMenuModel) =>
							{
								if (childMenuModel)
								{
									courseMaterialType = childMenuModel.courseMaterialTypeId;
								}
							});
						break;
					case MenuTypeEnum.SUB_CHILD_MENU:
						this.courseMaterialMenuStateFacade.subChildMenuByArticleId$(menuSelect.articleId)
							.subscribe((subChildMenuModel: SubChildMenuModel) =>
							{
								if (subChildMenuModel)
								{
									courseMaterialType = subChildMenuModel.courseMaterialTypeId;
								}
							});
						break;

					default:
						break;
				}
				if (menuSelect.menuType === MenuTypeEnum.PARENT_MENU)
				{


				}
			});

		return courseMaterialType;
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
	 */
	constructor(
		injector: Injector,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private rootStateFacade: RootStateFacade,
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
	 * @description Gets image path
	 * @param imageName 
	 * @returns  
	 */

	/**
	 * Gets menu icon
	 * @param eachMenu 
	 * @returns  
	 */
	public getMenuIcon(courseMaterialTypeId: CourseMaterialTypeIdEnum)
	{
		return ArrayKey.COURSE_MATERIAL_TYPE.filter(eachType => eachType.id === courseMaterialTypeId)[0].icon;
	}
}

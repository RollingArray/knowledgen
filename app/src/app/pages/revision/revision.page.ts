/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-09-07 12:47:22
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { CourseMaterialMenuModel } from "src/app/shared/model/course-material-menu.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { RevisionStateFacade } from "src/app/state/revision/revision.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "revision",
	templateUrl: "./revision.page.html",
	styleUrls: ["./revision.page.scss"]
})

export class RevisionPage extends BaseViewComponent implements OnInit, OnDestroy
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * Course material type id enum of revision page
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	private _selectedDate: string;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	public articleRevisions$!: Observable<CourseMaterialMenuModel[]>;

	/**
	 * Determines whether data has
	 */
	 public hasData$!: Observable<boolean>;

	/**
	 * Loading indicator status$ of revision page
	 */
	 public loadingIndicatorStatus$: Observable<boolean>

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get selectedDate()
	{
		return this._selectedDate;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of revision page.
	 * @param injector 
	 * @param revisionStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private revisionStateFacade: RevisionStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade
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
		this.translateService
			.get('loading.holdTight')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				this.errorMessage = data;
			});
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
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets selected article menu type from material menus
	 * @param articleId 
	 * @returns  
	 */
	 private getSelectedArticleMenuTypeFromMaterialMenus(articleId: string)
	 {
		 let menuType: MenuTypeEnum;
 
		 this.courseMaterialMenuStateFacade
			 .parentMenuByArticleId$(articleId)
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(menuModel =>
			 {
				 if (menuModel)
				 {
					 menuType = MenuTypeEnum.PARENT_MENU;
				 }
			 });
	 
			 this.courseMaterialMenuStateFacade
			 .childMenuByArticleId$(articleId)
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(menuModel =>
			 {
				 if (menuModel)
				 {
					 menuType = MenuTypeEnum.CHILD_MENU;
				 }
			 });
		 
			 this.courseMaterialMenuStateFacade
			 .subChildMenuByArticleId$(articleId)
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(menuModel =>
			 {
				 if (menuModel)
				 {
					 menuType = MenuTypeEnum.SUB_CHILD_MENU;
				 }
			 });
		 
		 
		 return menuType;
	 }
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions revision page
	 * @param articleRevisionDate 
	 */
	loadRevisionData(articleRevisionDate: string)
	{
		this._selectedDate = articleRevisionDate;
		this.hasData$ = this.revisionStateFacade.revisionHasData$(articleRevisionDate);
		this.articleRevisions$ = this.revisionStateFacade.allRevisionByDate$(articleRevisionDate);

		// if no data available ... make a api request, else work with store data
		this.hasData$
			.pipe(take(1))
			.subscribe(
				hasData =>
				{

					if (!hasData)
					{
						this.translateService
							.get('noData.noRevisionData')
							.pipe(take(1))
							.subscribe(async (data: string) =>
							{
								this.errorMessage = data;
							});

						this.getRevision(this._selectedDate);
					}
				}
			);


	}

	/**
	 * Gets course material material
	 */
	async getRevision(articleRevisionDate: string)
	{
		this.rootStateFacade.startLoading('');

		const myRevisionsModel: CourseMaterialMenuModel = {
			articleRevisionDate: articleRevisionDate
		}
		this.revisionStateFacade.requestRevision(myRevisionsModel);
	}

	/**
	 * Navigates to learning path details
	 * @param courseMaterialId 
	 */
	public navigateToArticle(revision: CourseMaterialMenuModel)
	{
		// save menu as selected
		const menuSelectModel: MenuSelectModel = {
			articleId: revision.articleId,
			articleStatus: revision.articleStatus,
			courseMaterialId: revision.courseMaterialId,
			menuType: this.getSelectedArticleMenuTypeFromMaterialMenus(revision.articleId),
			courseMaterialType: revision.courseMaterialTypeId
		};
		
		this.courseMaterialMenuStateFacade.storeSelectedMenu(menuSelectModel);

		// navigate to page
		this.router.navigate([`/go/course/material/${revision.courseMaterialId}/articles/article/${revision.articleId}`]);
	}
}
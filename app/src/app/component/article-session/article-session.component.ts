/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:10:12 
 * Last modified  : 2022-08-04 20:10:53
 */

import { Component, OnInit, Injector, Input, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleSessionModel } from "src/app/shared/model/article-session.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ArticleSessionStateFacade } from "src/app/state/article-session/article-session.state.facade";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { TranslateService } from "@ngx-translate/core";
import { ArticleSessionAnalysisModel } from "src/app/shared/model/article-session-analysis.model";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";

@Component({
	selector: 'article-session',
	templateUrl: './article-session.component.html',
	styleUrls: ['./article-session.component.scss'],
})
export class ArticleSessionComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud course material component
	 */
	readonly arrayKey = ArrayKey;

	/**
	 * String key of crud course material component
	 */
	readonly stringKey = StringKey;

	/**
	 * Operations enum of crud text document component
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * Course material type id enum of assignment instructions component
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

	/**
	 * Characteristics enum of article session component
	 */
	readonly characteristicsEnum = CharacteristicsEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud assignment quiz component
	 */
	@Input() isContentLive = false;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() isMaterialOwner = false;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() courseMaterialTypeId: CourseMaterialTypeIdEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Selected menu of assignment instructions component
	 */
	private _selectedMenu: MenuSelectModel;

	/**
	 * Chart options of article session component
	 */
	private _chartOptions: (ChartOptions & { annotation: any });

	/**
	 * Chart labels of article session component
	 */
	private _chartLabels = [];

	/**
	 * Chart type of article session component
	 */
	private _chartType: ChartType = 'bar';

	/**
	 * Chart data of article session component
	 */
	private _chartData = [];

	/**
	 * Bar chart of article session component
	 */
	private _barChart: any;

	/**
	 * Article session analysis of article session component
	 */
	private _articleSessionAnalysis: ArticleSessionAnalysisModel;

	/**
	 * Data loading of article session component
	 */
	private _dataLoading = false;


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of article session component
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;

	/**
	 * Determines whether data$ has
	 */
	public hasData$: Observable<boolean>;

	/**
	 * Article session analysis$ of article session component
	 */
	public articleSessionAnalysis$: Observable<ArticleSessionAnalysisModel>;
	

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * View child of performance over review component
	 */
	@ViewChild('chart') chart;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets selected menu
	 */
	get selectedMenu()
	{
		return this._selectedMenu;
	}

	/**
	 * Gets article session analysis
	 */
	get articleSessionAnalysis()
	{
		return this._articleSessionAnalysis;
	}

	/**
	 * Gets data loading
	 */
	get dataLoading()
	 {
		 return this._dataLoading;
	 }



	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of crud course material component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private articleSessionStateFacade: ArticleSessionStateFacade,
		private translateService: TranslateService,
	)
	{
		super(injector);
		Chart.register(...registerables);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		this._dataLoading = true;
		
		setTimeout(() =>
		{
			this.selectedMenuArticle$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(_selectedMenu =>
				{
					this._selectedMenu = _selectedMenu;
					this.hasData$ = this.articleSessionStateFacade.selectArticleSessionHasData$(_selectedMenu.articleId);
					this.articleSessionAnalysis$ = this.articleSessionStateFacade.selectArticleSessionAnalysis$(_selectedMenu.articleId);
					
					this.articleSessionStateFacade
						.selectArticleSessionByArticleId$(_selectedMenu.articleId)
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(async articleSession =>
						{
							// if no data, get data over network
							if (!articleSession)
							{
								this.getArticleSession();
							}

							// else build chart
							else
							{
								this._dataLoading = false;

								this.buildChartData(articleSession);

								this.buildChartLabel(articleSession);

								this.buildChartOptions();

								await this.buildChart();
							}
						})
				}
				);
		}, 0);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Builds chart label
	 * @param articleSession 
	 */
	 private buildChartLabel(articleSession: ArticleSessionModel)
	 {
		 this._chartLabels = [];
		 articleSession.articleSessionsCreatedOn.map((eachDate, index) =>
		 {
			 this._chartLabels = [
				 ...this._chartLabels,
				 index + 1
			 ];
		 });
	 }
 
	 /**
	  * Builds chart data
	  * @param articleSession 
	  */
	 private buildChartData(articleSession: ArticleSessionModel)
	 {
		 this.translateService
			 .get([
				 'formInfo.sessionProgress',
			 ]).pipe(takeUntil(this.unsubscribe))
			 .subscribe(async data =>
			 {
 
				 this._chartData = [
					 {
						 data: articleSession.articleSessions,
						 borderColor: '#fff',
						 backgroundColor: "#003566",
						 label: `${data['formInfo.sessionProgress']}`,
						 tension: 0.5
 
					 },
				 ];
 
			 });
	 }
	
	/**
	 * Submits answers
	 */
	private buildChartOptions()
	{
		this.translateService
			.get([
				'formInfo.sessionTime',
				'formInfo.sessionIterations',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				this._chartOptions = {
					plugins: {
						legend: {
							display: false,
						}
					},
					responsive: true,
					scales: {
						x: {
							display: true,
							title: {
								display: true,
								text: `${data['formInfo.sessionIterations']}`,
								color: '#fff'
							},
							ticks: {
								color: '#fff'
							},
							grid: {
								display: false
							}
						},
						y: {
							display: true,
							title: {
								display: true,
								text: `${data['formInfo.sessionTime']}`,
								color: '#fff'
							},
							ticks: {
								color: '#fff'
							},
							grid: {
								display: false
							}
						}
					},
					annotation: {
					}
				};

			});
	}

	/**
	 * Builds chart
	 */
	private async buildChart()
	{
		if (this._barChart)
		{
			this._barChart.data.datasets = this._chartData;
			this._barChart.data.labels = this._chartLabels;
			this._barChart.update();
		}
		else
		{
			this._barChart = new Chart(this.chart.nativeElement, {
				type: this._chartType,
				data: {
					labels: this._chartLabels,
					datasets: this._chartData,
				},
				options: this._chartOptions
			})	
		}
	}

	/**
	 * Descriptions crud text document component
	 */
	private async getArticleSession()
	{
		const model: ArticleSessionModel = {
			articleId: this._selectedMenu.articleId
		};

		this.articleSessionStateFacade.requestCourseMaterial(model);
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
}

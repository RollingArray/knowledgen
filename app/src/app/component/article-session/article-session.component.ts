/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:10:12 
 * Last modified  : 2022-10-10 20:33:02
 */

import { Component, OnInit, Injector, Input, ViewChild, Inject, EventEmitter, Output } from "@angular/core";
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
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

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
	 * Chart data color of article session component
	 */
	readonly chartDataColor = '#003566';

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud assignment quiz component
	 */
	@Input() articleId = '';
	
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
	 * Output  of article session component
	 */
	@Output() sessionAvailableEmitter = new EventEmitter<boolean>();

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
	 * Article allowed iteration of article session component
	 */
	private _articleAllowedIteration: number = 0;

	/**
	 * Number of sessions taken of article session component
	 */
	private _numberOfSessionsTaken: number = 0;


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
	 * Gets article allowed iteration
	 */
	get articleAllowedIteration()
	{
		return this._articleAllowedIteration;
	}

	/**
	 * Gets number of sessions taken
	 */
	get numberOfSessionsTaken()
	{
		return this._numberOfSessionsTaken;
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
		@Inject(DOCUMENT) document: Document,
		private activatedRoute: ActivatedRoute
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
		this._dataLoading = true;
		this.hasData$ = this.articleSessionStateFacade.selectArticleSessionHasData$(this.articleId);
		this.articleSessionAnalysis$ = this.articleSessionStateFacade.selectArticleSessionAnalysis$(this.articleId);

		this.articleSessionStateFacade
			.selectArticleSessionByArticleId$(this.articleId)
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

					this.findArticleSessionAvailability(articleSession);

				}
			})
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{

	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Finds article session availability
	 * @param articleSession 
	 */
	private findArticleSessionAvailability(articleSession: ArticleSessionModel)
	{
		this._articleAllowedIteration = articleSession.articleAllowedIteration;
		this._numberOfSessionsTaken = articleSession.articleSessions.length;
		if (this._articleAllowedIteration !== this._numberOfSessionsTaken)
		{
			this.sessionAvailableEmitter.emit(true);
		}

		else
		{
			this.sessionAvailableEmitter.emit(false);
		}
	}



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
						borderColor: this.chartDataColor,
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
								color: this.chartDataColor
							},
							ticks: {
								color: this.chartDataColor
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
								color: this.chartDataColor
							},
							ticks: {
								color: this.chartDataColor
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
			const canvas = <HTMLCanvasElement>document.getElementById('chart');
			const ctx = canvas.getContext('2d');
			this._barChart = new Chart(ctx, {
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
			articleId: this.articleId
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

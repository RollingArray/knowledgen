/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignments score analysis component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-08-12 10:15:39
 */

import { Component, OnInit, Input, ViewChild, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ChartOptions, ChartType, Chart, registerables } from "chart.js";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { DashboardStateFacade } from "src/app/state/dashboard/dashboard.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'assignments-score-analysis',
	templateUrl: './assignments-score-analysis.component.html',
	styleUrls: ['./assignments-score-analysis.component.scss'],
})
export class AssignmentsScoreAnalysisComponent extends BaseFormComponent implements OnInit
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
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Chart labels of article session component
	 */
	private _chartLabels = [];

	/**
	 * Chart type of article session component
	 */
	private _chartType: ChartType = 'polarArea';

	/**
	 * Chart data of article session component
	 */
	private _chartData = [];

	/**
	 * Bar chart of article session component
	 */
	private _chart: any;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of assignments score analysis component
	 */
	dashboardStudent$!: Observable<DashboardStudentModel>;

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
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of assignments score analysis component.
	 * @param injector 
	 * @param translateService 
	 * @param dashboardStateFacade 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
		private dashboardStateFacade: DashboardStateFacade,
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
		this.dashboardStudent$ = this.dashboardStateFacade.dashboardStudent$;
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		setTimeout(() =>
		{
			this.dashboardStudent$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async dashboardStudentModel =>
				{
					this.buildChartData(dashboardStudentModel);

					this.buildChartLabel();

					await this.buildChart();
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
	private buildChartLabel()
	{
		this.translateService
			.get([
				'option.good',
				'option.average',
				'option.poor',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{
				this._chartLabels = [
					data['option.good'],
					data['option.average'],
					data['option.poor'],
				];
			});
	}

	/**
	 * Builds chart data
	 * @param articleSession 
	 */
	private buildChartData(dashboardStudentModel: DashboardStudentModel)
	{
		this._chartData = [
			{
				data: [
					dashboardStudentModel.assignmentsScoreAnalysis.totalGoodScore,
					dashboardStudentModel.assignmentsScoreAnalysis.totalAverageScore,
					dashboardStudentModel.assignmentsScoreAnalysis.totalPoorScore
				],
				backgroundColor: [
					'#6c9b00',
					'#fad865',
					'#da3e3e',
				]
			},
		];


	}

	/**
	 * Builds chart
	 */
	private async buildChart()
	{
		if (this._chart)
		{
			this._chart.data.datasets = this._chartData;
			this._chart.data.labels = this._chartLabels;
			this._chart.update();
		}
		else
		{

			this._chart = new Chart(this.chart.nativeElement, {
				type: this._chartType,
				data: {
					labels: this._chartLabels,
					datasets: this._chartData,
				},
			})
		}
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

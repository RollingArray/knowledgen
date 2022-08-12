/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course content time coverage component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-08-12 07:52:31
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
	selector: 'course-content-time-coverage',
	templateUrl: './course-content-time-coverage.component.html',
	styleUrls: ['./course-content-time-coverage.component.scss'],
})
export class CourseContentTimeCoverageComponent extends BaseFormComponent implements OnInit
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
	private _chartType: ChartType = 'line';

	/**
	 * Chart data of article session component
	 */
	private _chartData = [];

	/**
	 * Bar chart of article session component
	 */
	private _barChart: any;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course content time coverage component
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
	 * Creates an instance of course content time coverage component.
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

					this.buildChartLabel(dashboardStudentModel);

					this.buildChartOptions();

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
	private buildChartLabel(dashboardStudentModel: DashboardStudentModel)
	{
		this._chartLabels = [];
		dashboardStudentModel.courseContentTimeCoverageOverTime.map((eachDate, index) =>
		{
			this._chartLabels = [
				eachDate.month,
				...this._chartLabels,
			];
		});
	}

	/**
	 * Builds chart data
	 * @param articleSession 
	 */
	private buildChartData(dashboardStudentModel: DashboardStudentModel)
	{
		this.translateService
			.get([
				'formInfo.sessionProgress',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				let chartData = [];
				dashboardStudentModel.courseContentTimeCoverageOverTime.map((eachDate, index) =>
				{
					chartData = [
						eachDate.contentTimeCoverage,
						...chartData,
					];
				});

				this._chartData = [
					{
						data: chartData,
						borderColor: '#003566',
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
				'formInfo.courseMinutesCovered',
				'formInfo.last12',
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
								text: `${data['formInfo.last12']}`,
								color: '#003566'
							},
							ticks: {
								color: '#003566'
							},
							grid: {
								display: false
							}
						},
						y: {
							display: true,
							title: {
								display: true,
								text: `${data['formInfo.courseMinutesCovered']}`,
								color: '#003566'
							},
							ticks: {
								color: '#003566'
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

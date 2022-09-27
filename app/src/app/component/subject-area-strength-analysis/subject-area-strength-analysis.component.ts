/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Subject area strength analysis component 
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:39:22 
 * Last modified  : 2022-09-27 21:40:34
 */
import { Component, OnInit, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { DashboardStateFacade } from "src/app/state/dashboard/dashboard.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'subject-area-strength-analysis',
	templateUrl: './subject-area-strength-analysis.component.html',
	styleUrls: ['./subject-area-strength-analysis.component.scss'],
})
export class SubjectAreaStrengthAnalysisComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of subject area strength analysis component
	 */
	readonly stringKey = StringKey;

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
	 * Description  of subject area strength analysis component
	 */
	private _coreSubjectAreaAnalysis: CoreSubjectAreaModel[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of subject area strength analysis component
	 */
	dashboardStudent$!: Observable<DashboardStudentModel>;

	/**
	 * Core subject areas$ of subject area strength analysis component
	 */
	coreSubjectAreas$!: Observable<string[]>;

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
	 * Gets description
	 */
	get coreSubjectAreaAnalysis()
	{
		return this._coreSubjectAreaAnalysis;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of subject area strength analysis component.
	 * @param injector 
	 * @param dashboardStateFacade 
	 */
	constructor(
		injector: Injector,
		private dashboardStateFacade: DashboardStateFacade,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{

		this.coreSubjectAreas$ = this.dashboardStateFacade.coreSubjectAreas$;
		this.coreSubjectAreas$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(coreSubjectAreas =>
			{
				coreSubjectAreas.map(eachSubject =>
				{
					this.dashboardStateFacade.allAnalyzedTagsBySubjectAreaName$(eachSubject)
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(coreSubjectAreaTags =>
						{
							let coreSubjectAreaAnalysis: CoreSubjectAreaModel = {
								subjectAreaName: eachSubject,
								subjectAreasTags: coreSubjectAreaTags,
							};

							this._coreSubjectAreaAnalysis = [
								...this._coreSubjectAreaAnalysis,
								coreSubjectAreaAnalysis
							]
						});


				})


			});
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		//
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
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-09-19 19:43:23
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { StudyPointGuardModel } from "src/app/shared/model/study-point-guard.model";
import { DASHBOARD_ACTIONS } from "./dashboard.state.actions";
import { DashboardStudentStateModel } from "./student/dashboard-student.state.model";
import { DASHBOARD_STUDENT_QUERY_SELECTOR } from "./student/dashboard-student.state.selectors";

/**
 * @description Injectable
 */
@Injectable()

export class DashboardStateFacade
{

	/**
	 * Creates an instance of dashboard state facade.
	 * @param dashboardStudentStore 
	 */
	constructor(
		private dashboardStudentStore: Store<DashboardStudentStateModel>,
	) { }

	/**
	 * Dashboard student$ of dashboard state facade
	 */
	public dashboardStudent$ = this.dashboardStudentStore.select(DASHBOARD_STUDENT_QUERY_SELECTOR.selectDashboardStudent);
	
	/**
	 * Determines whether student data$ has
	 */
	public hasStudentData$ = this.dashboardStudentStore.select(DASHBOARD_STUDENT_QUERY_SELECTOR.hasStudentData);

	/**
	 * Core subject areas$ of dashboard state facade
	 */
	public coreSubjectAreas$ = this.dashboardStudentStore.select(DASHBOARD_STUDENT_QUERY_SELECTOR.selectCoreSubjectAreas);
	
	/**
	 * All analyzed tags by subject area name$ of dashboard state facade
	 */
	public allAnalyzedTagsBySubjectAreaName$ = (coreSubjectAreaName: string) => this.dashboardStudentStore.select(DASHBOARD_STUDENT_QUERY_SELECTOR.selectAllAnalyzedTagsBySubjectAreaName(coreSubjectAreaName));
	
	
	/**
	 * Requests dashboard student
	 */
	public requestDashboardStudent() {
		this.dashboardStudentStore.dispatch(DASHBOARD_ACTIONS.API_REQUEST_DASHBOARD_STUDENT());
	}
	
	/**
	 * Gets point level image for study point
	 * @param studyPoints 
	 * @returns  
	 */
	public getPointLevelImageForStudyPoint(studyPoints: number)
	 {
		const studyPointGuard: StudyPointGuardModel = ArrayKey.STUDY_POINT_GUARD_RAILS.filter(eachGuar => studyPoints >= eachGuar.minValue && studyPoints <= eachGuar.maxValue)[0];
		 return  StringKey.IMAGE_BASE_PATH + `points-l${studyPointGuard.level}.svg`;
	 }
}

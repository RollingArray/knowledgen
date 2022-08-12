/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-08-12 20:15:59
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
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
	 * Requests dashboard student
	 */
	public requestDashboardStudent() {
		this.dashboardStudentStore.dispatch(DASHBOARD_ACTIONS.API_REQUEST_DASHBOARD_STUDENT());
	 }
}

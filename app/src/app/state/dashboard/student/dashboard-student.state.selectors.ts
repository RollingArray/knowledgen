/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard student state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-08-12 20:14:34
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { DashboardStudentStateModel } from "./dashboard-student.state.model";
import { DASHBOARD_STUDENT_FEATURE_KEY } from "./dashboard-student.state.reducer";

/**
 * @description  Selectors - Dashboard student state
 */
const selectDashboardStudentState: MemoizedSelector<DashboardStudentStateModel, DashboardStudentStateModel> = createFeatureSelector<DashboardStudentStateModel>(DASHBOARD_STUDENT_FEATURE_KEY);

/**
 * @description  Selectors - Dashboard student
 */
export const selectDashboardStudent: MemoizedSelector<DashboardStudentStateModel, DashboardStudentModel> = createSelector(
	selectDashboardStudentState,
	(dashboardStudentStateModel: DashboardStudentStateModel): DashboardStudentModel => dashboardStudentStateModel
);

/**
 * @description Selector - has student data
 */
export const hasStudentData: MemoizedSelector<DashboardStudentStateModel, boolean> = createSelector(
	selectDashboardStudentState,
	(dashboardStudentStateModel: DashboardStudentStateModel): boolean => dashboardStudentStateModel.courseContentTimeCoverageOverTime.length !== 0 ? true : false
);

/**
 * @description export all selectors
 */
export const DASHBOARD_STUDENT_QUERY_SELECTOR = {
	selectDashboardStudent,
	hasStudentData
};

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard student state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-09-15 18:12:48
 */

import { createReducer, on, Action } from "@ngrx/store";
import { DASHBOARD_ACTIONS } from "../dashboard.state.actions";
import { DashboardStudentStateModel, INITIAL_DASHBOARD_STUDENT_STATE } from "./dashboard-student.state.model";

/**
 * @description feature key
 */
export const DASHBOARD_STUDENT_FEATURE_KEY = 'dashboardStudentState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	INITIAL_DASHBOARD_STUDENT_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(DASHBOARD_ACTIONS.API_REQUEST_DASHBOARD_STUDENT, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(DASHBOARD_ACTIONS.LOADED_REQUEST_DASHBOARD_STUDENT, (state, action) => ({
		...state,
		studyPoints: action.payload.studyPoints,
		sessionAssignments: action.payload.sessionAssignments,
		studySessions: action.payload.studySessions,
		assignmentsScoreAnalysis: action.payload.assignmentsScoreAnalysis,
		courseContentCoverageOverTime: action.payload.courseContentCoverageOverTime,
		courseContentTimeCoverageOverTime: action.payload.courseContentTimeCoverageOverTime,
		coreSubjectAreaTagAnalysis: action.payload.coreSubjectAreaTagAnalysis,
	})),
);

/**
 * Dashboards student state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function dashboardStudentStateReducer(state: DashboardStudentStateModel | undefined, action: Action) {
	return reducer(state, action);
}
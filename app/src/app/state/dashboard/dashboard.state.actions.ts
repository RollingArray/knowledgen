/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard state action
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-08-12 20:15:03
 */

import { createAction, props } from '@ngrx/store';
import { DashboardStudentModel } from 'src/app/shared/model/dashboard-student.model';
import { DashboardOperationsEnum } from './dashboard-operations.enum';

/**
 * @description Dashboard Action - Api Request Dashboard
 */
export const API_REQUEST_DASHBOARD_STUDENT = createAction(
	DashboardOperationsEnum.API_REQUEST_DASHBOARD_STUDENT
);

/**
 * @description Dashboard Action - Loaded Student Dashboard
 */
export const LOADED_REQUEST_DASHBOARD_STUDENT = createAction(
	DashboardOperationsEnum.LOADED_REQUEST_DASHBOARD_STUDENT,
	props<{ payload: DashboardStudentModel }>()
);

/**
 * @description Dashboard Action - No Operation
 */
export const NOOP = createAction(
	DashboardOperationsEnum.NOOP,
);

/**
 * @description Export all Dashboard
 */
export const DASHBOARD_ACTIONS = {
	API_REQUEST_DASHBOARD_STUDENT,
	LOADED_REQUEST_DASHBOARD_STUDENT,
	NOOP,
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:25:15 
 * Last modified  : 2022-07-26 16:47:12
 */

import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { COURSE_MATERIAL_ASSIGNMENT_ACTIONS } from '../course-material-assignment.state.actions';
import { CourseMaterialAssignmentCrudStateModel, COURSE_MATERIAL_ASSIGNMENT_CRUD_INITIAL_STATE } from './course-material-assignment-crud.state.model';

/**
 * @description Course material assignment crud feature key
 */
export const COURSE_MATERIAL_ASSIGNMENT_CRUD_FEATURE_KEY = 'courseMaterialAssignmentCrudState';

/**
 * @description create Course material assignment reducer
 */
const reducer = createReducer(

	/**
	 * @description Course material assignment reducer initial state
	 */
	 COURSE_MATERIAL_ASSIGNMENT_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon course material assignment
	 */
	on(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.ACT_UPON_COURSE_MATERIAL_ASSIGNMENT_RESULT, (state, action) => ({
		...state,
		operationCourseMaterialAssignmentResult: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new course material assignment
	 */
	on(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - course material assignment added success
	 */
	on(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material assignment crud success
	 */
	on(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material assignment crud fail
	 */
	on(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);

/**
 * Courses material assignment crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function courseMaterialAssignmentCrudStateReducer(state: CourseMaterialAssignmentCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
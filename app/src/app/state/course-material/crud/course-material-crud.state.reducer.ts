/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-07-05 13:23:41
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { COURSE_MATERIAL_ACTIONS } from '../course-material.state.actions';
import { CourseMaterialCrudStateModel, COURSE_MATERIAL_CRUD_INITIAL_STATE } from './course-material-crud.state.model';

/**
 * @description Object crud feature key
 */
export const COURSE_MATERIAL_CRUD_FEATURE_KEY = 'courseMaterialCrudState';

/**
 * @description Object crud reducer
 */
const reducer = createReducer(

	/**
	 * @description Object crud reducer initial state
	 */
	COURSE_MATERIAL_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(COURSE_MATERIAL_ACTIONS.ACT_UPON_COURSE_MATERIAL, (state, action) => ({
		...state,
		operationCourseMaterial: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new object
	 */
	on(COURSE_MATERIAL_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit object
	 */
	on(COURSE_MATERIAL_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete object
	 */
	on(COURSE_MATERIAL_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Object added success
	 */
	on(COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object update success
	 */
	on(COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object delete success
	 */
	on(COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud success
	 */
	on(COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud fail
	 */
	on(COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * Courses material crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function courseMaterialCrudStateReducer(state: CourseMaterialCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
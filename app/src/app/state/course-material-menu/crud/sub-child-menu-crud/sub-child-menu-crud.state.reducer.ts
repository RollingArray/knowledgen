/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:21:21 
 * Last modified  : 2022-07-05 16:22:22
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../../course-material-menu.state.actions';
import { SubChildMenuCrudStateModel, SUB_CHILD_MENU_CRUD_INITIAL_STATE } from './sub-child-menu-crud.state.model';

/**
 * @description feature key
 */
export const SUB_CHILD_MENU_CRUD_FEATURE_KEY = 'subChildMenuCrudState';

/**
 * @description crud reducer
 */
const reducer = createReducer(

	/**
	 * @description initial state
	 */
	SUB_CHILD_MENU_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationSubChildMenu: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Api request new object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Api request edit object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Api request delete object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Object dded success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object update success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object delete success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud fail
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_SUB_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);

/**
 * Subs child menu crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function subChildMenuCrudStateReducer(state: SubChildMenuCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
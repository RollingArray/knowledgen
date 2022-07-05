/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:58:18 
 * Last modified  : 2022-07-05 15:02:05
 */

import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../../course-material-menu.state.actions';
import { ParentMenuCrudStateModel, PARENT_MENU_CRUD_INITIAL_STATE } from './parent-menu-crud.state.model';

/**
 * @description Parent menu crud feature key
 */
export const PARENT_MENU_CRUD_FEATURE_KEY = 'parentMenuCrudState';

/**
 * @description Parent menu crud reducer
 */
const reducer = createReducer(

	/**
	 * @description Parent menu crud reducer initial state
	 */
	PARENT_MENU_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon ParentMenu
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_PARENT_MENU, (state, action) => ({
		...state,
		operationParentMenu: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new parent menu
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_PARENT_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit parent menu
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_PARENT_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete parent menu
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_PARENT_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Parent menuadded success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Parent menuupdate success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Parent menudelete success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Parent menu crud success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_PARENT_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Parent menu crud fail
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_PARENT_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);

/**
 * Parents menu crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function parentMenuCrudStateReducer(state: ParentMenuCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
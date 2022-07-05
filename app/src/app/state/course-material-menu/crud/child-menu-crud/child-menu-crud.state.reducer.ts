/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:56:29 
 * Last modified  : 2022-07-05 14:57:06
 */

import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../../course-material-menu.state.actions';
import { ChildMenuCrudStateModel, CHILD_MENU_CRUD_INITIAL_STATE } from './child-menu-crud.state.model';

/**
 * @description Sub child menu crud feature key
 */
export const CHILD_MENU_CRUD_FEATURE_KEY = 'childMenuCrudState';

/**
 * @description Sub child menu crud reducer
 */
const reducer = createReducer(

	/**
	 * @description Sub child menu crud reducer initial state
	 */
	CHILD_MENU_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_CHILD_MENU, (state, action) => ({
		...state,
		operationChildMenu: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Api request new object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Api request edit object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Api request delete object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Object added success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object update success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object delete success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - crud success
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - crud fail
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_CHILD_MENU, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * @description Categories crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function childMenuCrudStateReducer(state: ChildMenuCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
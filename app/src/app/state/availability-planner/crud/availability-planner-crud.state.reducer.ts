/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:51:12 
 * Last modified  : 2022-07-05 11:51:12 
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { AVAILABILITY_PLANNER_ACTIONS } from '../availability-planner.state.actions';
import { AvailabilityPlannerCrudStateModel, AVAILABILITY_PLANNER_CRUD_INITIAL_STATE } from './availability-planner-crud.state.model';

/**
 * @description feature key
 */
export const AVAILABILITY_PLANNER_CRUD_FEATURE_KEY = 'availabilityPlannerCrudState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	AVAILABILITY_PLANNER_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.ACT_UPON_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationAvailabilityPlanner: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new object
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit object
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_EDIT_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete object
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_DELETE_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - object added success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - object update success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - object delete success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - object crud success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - object crud fail
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * Availabilitys planner crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function availabilityPlannerCrudStateReducer(state: AvailabilityPlannerCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
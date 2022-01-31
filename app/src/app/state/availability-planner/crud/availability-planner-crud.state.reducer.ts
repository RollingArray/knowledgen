/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-01-21 20:56:27
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { AVAILABILITY_PLANNER_ACTIONS } from '../availability-planner.state.actions';
import { AvailabilityPlannerCrudStateModel, AVAILABILITY_PLANNER_CRUD_INITIAL_STATE } from './availability-planner-crud.state.model';

/**
 * @description AvailabilityPlanner crud feature key
 */
export const SKILL_CRUD_FEATURE_KEY = 'availabilityPlannerCrudState';

/**
 * @description AvailabilityPlanner crud reducer
 */
const reducer = createReducer(

	/**
	 * @description AvailabilityPlanner crud reducer initial state
	 */
	AVAILABILITY_PLANNER_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon AvailabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.ACT_UPON_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationAvailabilityPlanner: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new availabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit availabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_EDIT_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete availabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_DELETE_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - AvailabilityPlanner added success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - AvailabilityPlanner update success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - AvailabilityPlanner delete success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - AvailabilityPlanner crud success
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - AvailabilityPlanner crud fail
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_FAIL, (state, action) => ({
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
export function availabilityPlannerCrudStateReducer(state: AvailabilityPlannerCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
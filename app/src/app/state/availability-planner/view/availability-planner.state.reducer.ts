/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-21 20:59:35
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { AVAILABILITY_PLANNER_ACTIONS } from '../availability-planner.state.actions';
import { INITIAL_AVAILABILITY_PLANNER_STATE, availabilityPlannerAdapter, AvailabilityPlannerStateModel } from './availability-planner.state.model';


/**
 * @description Global skill categories feature key
 */
export const AVAILABILITY_PLANNER_FEATURE_KEY = 'availabilityPlannerState';

/**
 * @description Global skill availabilityPlanner reducer
 */
const reducer = createReducer(

	/**
	 * @description User skill availabilityPlanner reducer initial state
	 */
	 INITIAL_AVAILABILITY_PLANNER_STATE,

	/**
	 * @description Reducer for action - Api Request Global Skill AvailabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_AVAILABILITY_PLANNER, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded user skill availabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.LOADED_REQUEST_AVAILABILITY_PLANNER, (state, action) => (

		availabilityPlannerAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added AvailabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.STORE_NEWLY_ADDED_AVAILABILITY_PLANNER, (state, action) => (
		availabilityPlannerAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Updated AvailabilityPlanner
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.STORE_UPDATED_AVAILABILITY_PLANNER, (state, action) => (
		availabilityPlannerAdapter.updateOne({
			id: action.payload.plannerId ? action.payload.plannerId : '',
			changes: {
				availabilityFrom: action.payload.availabilityFrom,
				availabilityTo: action.payload.availabilityTo,
				availabilityContext: action.payload.availabilityContext,
				onlineMeetingUrl: action.payload.onlineMeetingUrl,
				onlineMeetingType: action.payload.onlineMeetingType,
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove AvailabilityPlanner From Store
	 */
	on(AVAILABILITY_PLANNER_ACTIONS.REMOVE_AVAILABILITY_PLANNER_FROM_STORE, (state, action) => (
		availabilityPlannerAdapter.removeOne(
			action.payload.plannerId ? action.payload.plannerId : '', 
			state
		)
	)),

);


/**
 * @description Globals skill categories state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function availabilityPlannerStateReducer(state: AvailabilityPlannerStateModel | undefined, action: Action) {
	return reducer(state, action);
}
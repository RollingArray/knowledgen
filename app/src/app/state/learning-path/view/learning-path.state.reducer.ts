/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-08-08 09:12:52
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { LEARNING_PATH_ACTIONS } from '../learning-path.state.actions';
import { INITIAL_LEARNING_PATH_STATE, learningPathAdapter, LearningPathStateModel } from './learning-path.state.model';


/**
 * @description feature key
 */
export const LEARNING_PATH_FEATURE_KEY = 'learningPathState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	 INITIAL_LEARNING_PATH_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(LEARNING_PATH_ACTIONS.API_REQUEST_LEARNING_PATH, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(LEARNING_PATH_ACTIONS.LOADED_REQUEST_LEARNING_PATH, (state, action) => (

		learningPathAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added object
	 */
	on(LEARNING_PATH_ACTIONS.STORE_NEWLY_ADDED_LEARNING_PATH, (state, action) => (
		learningPathAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Remove object From Store
	 */
	on(LEARNING_PATH_ACTIONS.REMOVE_LEARNING_PATH_FROM_STORE, (state, action) => (
		learningPathAdapter.removeOne(
			action.payload.courseMaterialId ? action.payload.courseMaterialId : '', 
			state
		)
	)),

);

/**
 * Courses material state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function learningPathStateReducer(state: LearningPathStateModel | undefined, action: Action) {
	return reducer(state, action);
}
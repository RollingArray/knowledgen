/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:23:54 
 * Last modified  : 2022-09-26 14:26:39
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { CORE_SUBJECT_AREA_ACTIONS } from '../core-subject-area.state.actions';
import { INITIAL_CORE_SUBJECT_AREA_STATE, coreSubjectAreaAdapter, CoreSubjectAreaStateModel } from './core-subject-area.state.model';


/**
 * @description feature key
 */
export const CORE_SUBJECT_AREA_FEATURE_KEY = 'coreSubjectAreaState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	 INITIAL_CORE_SUBJECT_AREA_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(CORE_SUBJECT_AREA_ACTIONS.API_REQUEST_CORE_SUBJECT_AREA, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(CORE_SUBJECT_AREA_ACTIONS.LOADED_REQUEST_CORE_SUBJECT_AREA, (state, action) => (

		coreSubjectAreaAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added object
	 */
	on(CORE_SUBJECT_AREA_ACTIONS.STORE_NEWLY_ADDED_CORE_SUBJECT_AREA, (state, action) => (
		coreSubjectAreaAdapter.setOne(action.payload, state)
	)),
);

/**
 * Courses material state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function coreSubjectAreaStateReducer(state: CoreSubjectAreaStateModel | undefined, action: Action) {
	return reducer(state, action);
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-05 13:09:56
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_ACTIONS } from '../course-material.state.actions';
import { INITIAL_COURSE_MATERIAL_STATE, courseMaterialAdapter, CourseMaterialStateModel } from './course-material.state.model';


/**
 * @description feature key
 */
export const COURSE_MATERIAL_FEATURE_KEY = 'courseMaterialState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	 INITIAL_COURSE_MATERIAL_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(COURSE_MATERIAL_ACTIONS.API_REQUEST_COURSE_MATERIAL, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(COURSE_MATERIAL_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL, (state, action) => (

		courseMaterialAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added object
	 */
	on(COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL, (state, action) => (
		courseMaterialAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Updated object
	 */
	on(COURSE_MATERIAL_ACTIONS.STORE_UPDATED_COURSE_MATERIAL, (state, action) => (
		courseMaterialAdapter.updateOne({
			id: action.payload.courseMaterialId ? action.payload.courseMaterialId : '',
			changes: {
				courseMaterialName: action.payload.courseMaterialName,
				courseMaterialDescription: action.payload.courseMaterialDescription,
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove object From Store
	 */
	on(COURSE_MATERIAL_ACTIONS.REMOVE_COURSE_MATERIAL_FROM_STORE, (state, action) => (
		courseMaterialAdapter.removeOne(
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
export function courseMaterialStateReducer(state: CourseMaterialStateModel | undefined, action: Action) {
	return reducer(state, action);
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-19 23:22:18
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_ACTIONS } from '../course-material.state.actions';
import { INITIAL_COURSE_MATERIAL_STATE, courseMaterialAdapter, CourseMaterialStateModel } from './course-material.state.model';


/**
 * @description Global skill categories feature key
 */
export const COURSE_MATERIAL_FEATURE_KEY = 'courseMaterialState';

/**
 * @description Global skill courseMaterial reducer
 */
const reducer = createReducer(

	/**
	 * @description User skill courseMaterial reducer initial state
	 */
	 INITIAL_COURSE_MATERIAL_STATE,

	/**
	 * @description Reducer for action - Api Request Global Skill CourseMaterial
	 */
	on(COURSE_MATERIAL_ACTIONS.API_REQUEST_COURSE_MATERIAL, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded user skill courseMaterial
	 */
	on(COURSE_MATERIAL_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL, (state, action) => (

		courseMaterialAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added CourseMaterial
	 */
	on(COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL, (state, action) => (
		courseMaterialAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Updated CourseMaterial
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
	 * @description Reducer for action - Remove CourseMaterial From Store
	 */
	on(COURSE_MATERIAL_ACTIONS.REMOVE_COURSE_MATERIAL_FROM_STORE, (state, action) => (
		courseMaterialAdapter.removeOne(
			action.payload.courseMaterialId ? action.payload.courseMaterialId : '', 
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
export function courseMaterialStateReducer(state: CourseMaterialStateModel | undefined, action: Action) {
	return reducer(state, action);
}
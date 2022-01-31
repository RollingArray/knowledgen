/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-19 21:16:27
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_ACTIONS } from '../../course-material/course-material.state.actions';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { INITIAL_PARENT_MENU_STATE, parentMenuAdapter, ParentMenuStateModel } from './parent-menu.state.model';


/**
 * @description Global skill categories feature key
 */
export const PARENT_MENU_FEATURE_KEY = 'parentMenuState';

/**
 * @description Global skill courseMaterial reducer
 */
const reducer = createReducer(

	/**
	 * @description User skill courseMaterial reducer initial state
	 */
	INITIAL_PARENT_MENU_STATE,

	/**
	 * @description Reducer for action - Api Request Global Skill CourseMaterial
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_MENU, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded user skill courseMaterial
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_PARENT_MENU, (state, action) => (

		parentMenuAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Loaded user skill courseMaterial
	 */
	 on(COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_MENU, (state, action) => (

		parentMenuAdapter.setOne(action.payload, state)
	)),
);


/**
 * @description Globals skill categories state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function parentMenuStateReducer(state: ParentMenuStateModel | undefined, action: Action) {
	return reducer(state, action);
}
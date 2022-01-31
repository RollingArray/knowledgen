/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-19 20:25:16
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { INITIAL_SUB_CHILD_MENU_STATE, subChildMenuAdapter, SubChildMenuStateModel } from './sub-child-menu.state.model';


/**
 * @description Global skill categories feature key
 */
export const SUB_CHILD_MENU_FEATURE_KEY = 'subChildMenuState';

/**
 * @description Global skill courseMaterial reducer
 */
const reducer = createReducer(

	/**
	 * @description User skill courseMaterial reducer initial state
	 */
	INITIAL_SUB_CHILD_MENU_STATE,

	/**
	 * @description Reducer for action - Loaded user skill courseMaterial
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_SUB_CHILD_MENU, (state, action) => (
		subChildMenuAdapter.setAll(action.payload, state)
	)),

	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_SUB_CHILD_MENU, (state, action) => (
		subChildMenuAdapter.setOne(action.payload, state)
	)),

	
);


/**
 * @description Globals skill categories state reducer
 * @param state 
 * @param action 
 * @returns  
 */
 export function subChildMenuStateReducer(state: SubChildMenuStateModel | undefined, action: Action) {
	return reducer(state, action);
}

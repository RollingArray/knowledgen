/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:26:27 
 * Last modified  : 2022-07-05 16:29:19
 */

import { createReducer, Action, on } from '@ngrx/store';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { INITIAL_PARENT_MENU_STATE, parentMenuAdapter, ParentMenuStateModel } from './parent-menu.state.model';


/**
 * @description state feature key
 */
export const PARENT_MENU_FEATURE_KEY = 'parentMenuState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description Reducer initial state
	 */
	INITIAL_PARENT_MENU_STATE,

	/**
	 * @description Reducer for action - Api Request object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_MENU, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded objects
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_PARENT_MENU, (state, action) => (

		parentMenuAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store new object
	 */
	 on(COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_PARENT_MENU, (state, action) => (

		parentMenuAdapter.setOne(action.payload, state)
	 )),
	 
	/**
	 * @description Reducer for action - Store updated object
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_PARENT_MENU, (state, action) => (
		parentMenuAdapter.updateOne({
			id: action.payload.parentArticleId ? action.payload.parentArticleId : '',
			changes: {
				articleTitle: action.payload.articleTitle,
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove object From Store
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.REMOVE_PARENT_MENU_FROM_STORE, (state, action) => (
		parentMenuAdapter.removeOne(
			action.payload.parentArticleId ? action.payload.parentArticleId : '', 
			state
		)
	)),
);

/**
 * Parents menu state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function parentMenuStateReducer(state: ParentMenuStateModel | undefined, action: Action) {
	return reducer(state, action);
}
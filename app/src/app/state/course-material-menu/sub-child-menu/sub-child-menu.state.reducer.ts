/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:49:38 
 * Last modified  : 2022-07-18 20:40:47
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { INITIAL_SUB_CHILD_MENU_STATE, subChildMenuAdapter, SubChildMenuStateModel } from './sub-child-menu.state.model';


/**
 * @description Sub child menu state feature key
 */
export const SUB_CHILD_MENU_FEATURE_KEY = 'subChildMenuState';

/**
 * @description Sub child menu state reducer
 */
const reducer = createReducer(

	/**
	 * @description Sub child menu reducer initial state
	 */
	INITIAL_SUB_CHILD_MENU_STATE,

	/**
	 * @description Reducer for action - Store all values
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_SUB_CHILD_MENU, (state, action) => (
		subChildMenuAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store new value
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_SUB_CHILD_MENU, (state, action) => (
		subChildMenuAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store updated value
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_SUB_CHILD_MENU, (state, action) => (
		subChildMenuAdapter.updateOne({
			id: action.payload.subChildArticleId ? action.payload.subChildArticleId : '',
			changes: {
				articleTitle: action.payload.articleTitle,
				articleStatus: action.payload.articleStatus,
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove value From Store
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.REMOVE_SUB_CHILD_MENU_FROM_STORE, (state, action) => (
		subChildMenuAdapter.removeOne(
			action.payload.subChildArticleId ? action.payload.subChildArticleId : '',
			state
		)
	)),
);

/**
 * Subs child menu state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function subChildMenuStateReducer(state: SubChildMenuStateModel | undefined, action: Action)
{
	return reducer(state, action);
}

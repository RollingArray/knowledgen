/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:53:26 
 * Last modified  : 2022-08-05 15:10:28
 */



import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { childMenuAdapter, ChildMenuStateModel, INITIAL_CHILD_MENU_STATE } from './child-menu.state.model';


/**
 * @description Child menu feature key
 */
export const CHILD_MENU_FEATURE_KEY = 'childMenuState';

/**
 * @description Child menu reducer
 */
const reducer = createReducer(

	/**
	 * @description Child menu reducer initial state
	 */
	INITIAL_CHILD_MENU_STATE,

	/**
	 * @description Reducer for action - Store all values
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_CHILD_MENU, (state, action) => (

		childMenuAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store new value
	 */
	 on(COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_CHILD_MENU, (state, action) => (

		childMenuAdapter.setOne(action.payload, state)
	 )),
	 
	 /**
	 * @description Reducer for action - Store updated value
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_CHILD_MENU, (state, action) => (
		childMenuAdapter.updateOne({
			id: action.payload.childArticleId ? action.payload.childArticleId : '',
			changes: {
				articleTitle: action.payload.articleTitle,
				articleSummery: action.payload.articleSummery,
				articleStatus: action.payload.articleStatus,
				articleCompletionReward: action.payload.articleCompletionReward,
				articleCompletionTime: action.payload.articleCompletionTime,
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove value From Store
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.REMOVE_CHILD_MENU_FROM_STORE, (state, action) => (
		childMenuAdapter.removeOne(
			action.payload.childArticleId ? action.payload.childArticleId : '', 
			state
		)
	)),
);

/**
 * Childs menu state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function childMenuStateReducer(state: ChildMenuStateModel | undefined, action: Action) {
	return reducer(state, action);
}
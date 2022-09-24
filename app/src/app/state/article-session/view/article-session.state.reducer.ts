/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:38:04 
 * Last modified  : 2022-08-03 19:29:44
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { ARTICLE_SESSION_ACTIONS } from '../article-session.state.actions';
import { INITIAL_ARTICLE_SESSION_STATE, articleSessionAdapter, ArticleSessionStateModel } from './article-session.state.model';

/**
 * @description feature key
 */
export const ARTICLE_SESSION_FEATURE_KEY = 'articleSessionState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	 INITIAL_ARTICLE_SESSION_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(ARTICLE_SESSION_ACTIONS.API_REQUEST_ARTICLE_SESSIONS, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(ARTICLE_SESSION_ACTIONS.LOADED_REQUEST_ARTICLE_SESSIONS, (state, action) => (
		articleSessionAdapter.setOne(action.payload.data, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added object
	 */
	on(ARTICLE_SESSION_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_SESSION, (state, action) => (
		articleSessionAdapter.updateOne({
			id: action.payload.articleId ? action.payload.articleId : '',
			changes: {
				articleSessions: action.payload.articleSessions,
				articleAllowedIteration: action.payload.articleAllowedIteration,
				articleSessionsCreatedOn: action.payload.articleSessionsCreatedOn,
			}
		}, state)
	)),
);

/**
 * Courses material state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function articleSessionStateReducer(state: ArticleSessionStateModel | undefined, action: Action) {
	return reducer(state, action);
}
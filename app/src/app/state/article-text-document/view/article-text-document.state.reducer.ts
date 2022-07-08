/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-08 12:35:40
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { ARTICLE_TEXT_DOCUMENT_ACTIONS } from '../article-text-document.state.actions';
import { INITIAL_ARTICLE_TEXT_DOCUMENT_STATE, articleTextDocumentAdapter, ArticleTextDocumentStateModel } from './article-text-document.state.model';

/**
 * @description Article text document feature key
 */
export const ARTICLE_TEXT_DOCUMENT_FEATURE_KEY = 'articleTextDocumentState';

/**
 * @description Article text document reducer
 */
const reducer = createReducer(

	/**
	 * @description article text document reducer initial state
	 */
	 INITIAL_ARTICLE_TEXT_DOCUMENT_STATE,

	/**
	 * @description Reducer for action - Api Request article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ARTICLE_TEXT_DOCUMENT, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT, (state, action) => (

		articleTextDocumentAdapter.setOne(action.payload[0], state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT, (state, action) => (
		articleTextDocumentAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Updated article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_UPDATED_ARTICLE_TEXT_DOCUMENT, (state, action) => (
		articleTextDocumentAdapter.updateOne({
			id: action.payload.articleId ? action.payload.articleId : '',
			changes: {
				articleTextDocumentContent: action.payload.articleTextDocumentContent
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove article text document From Store
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE, (state, action) => (
		articleTextDocumentAdapter.removeOne(
			action.payload.articleId ? action.payload.articleId : '', 
			state
		)
	)),

);

/**
 * Articles text document state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function articleTextDocumentStateReducer(state: ArticleTextDocumentStateModel | undefined, action: Action) {
	return reducer(state, action);
}
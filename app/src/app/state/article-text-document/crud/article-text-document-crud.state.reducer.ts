/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:51:12 
 * Last modified  : 2022-07-08 12:34:26
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { ARTICLE_TEXT_DOCUMENT_ACTIONS } from '../article-text-document.state.actions';
import { ArticleTextDocumentCrudStateModel, ARTICLE_TEXT_DOCUMENT_CRUD_INITIAL_STATE } from './article-text-document-crud.state.model';

/**
 * @description Article text document feature key
 */
export const ARTICLE_TEXT_DOCUMENT_CRUD_FEATURE_KEY = 'articleTextDocumentCrudState';

/**
 * @description Article text document create reducer
 */
const reducer = createReducer(

	/**
	 * @description Article text document reducer initial state
	 */
	ARTICLE_TEXT_DOCUMENT_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ACT_UPON_ARTICLE_TEXT_DOCUMENT, (state, action) => ({
		...state,
		operationArticleTextDocument: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit article text document
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - article text document added success
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - article text document update success
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - article text document delete success
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - article text document crud success
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - article text document crud fail
	 */
	on(ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * Article text document crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function articleTextDocumentCrudStateReducer(state: ArticleTextDocumentCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
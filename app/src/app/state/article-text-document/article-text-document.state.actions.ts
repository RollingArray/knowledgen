/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:53:19 
 * Last modified  : 2022-07-06 20:27:07
 */



import { createAction, props } from '@ngrx/store';
import { ArticleTextDocumentModel } from 'src/app/shared/model/article-text-document.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { ArticleTextDocumentOperationsEnum } from './article-text-document-operations.enum';


/**
 * @description Article Text Document actions - Api Request Article Text Document
 */
export const API_REQUEST_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.API_REQUEST_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Loaded Article Text Document
 */
export const LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel[] }>()
);

/**
 * @description Article Text Document actions - Act Upon Article Text Document
 */
export const ACT_UPON_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.ACT_UPON_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel, operation: OperationsEnum }>()
);

/**
 * @description Article Text Document actions - Send Api Request To Add New Article Text Document
 */
export const API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Send Api Request To Edit Article Text Document
 */
export const API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Store Newly Added Article Text Document
 */
export const STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Store Updated Article Text Document
 */
export const STORE_UPDATED_ARTICLE_TEXT_DOCUMENT = createAction(
	ArticleTextDocumentOperationsEnum.STORE_UPDATED_ARTICLE_TEXT_DOCUMENT,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Remove Article Text Document From Store
 */
export const REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE = createAction(
	ArticleTextDocumentOperationsEnum.REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE,
	props<{ payload: ArticleTextDocumentModel }>()
);

/**
 * @description Article Text Document actions - Article Text Document CRUD Successfully
 */
export const ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS = createAction(
	ArticleTextDocumentOperationsEnum.ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS
);

/**
 * @description Article Text Document actions - Article Text Document CRUD Fail
 */
export const ARTICLE_TEXT_DOCUMENT_CRUD_FAIL = createAction(
	ArticleTextDocumentOperationsEnum.ARTICLE_TEXT_DOCUMENT_CRUD_FAIL
);

/**
 * @description Article Text Document actions - Article Text Document Updated Successfully
 */
export const ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS = createAction(
	ArticleTextDocumentOperationsEnum.ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS
);

/**
 * @description Article Text Document actions - Article Text Document Deleted Successfully
 */
export const ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS = createAction(
	ArticleTextDocumentOperationsEnum.ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS
);

/**
 * @description Article Text Document actions - Article Text Document Added Successfully
 */
export const ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS = createAction(
	ArticleTextDocumentOperationsEnum.ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS
);

/**
 * @description Article Text Document actions - No Operation
 */
export const NOOP = createAction(
	ArticleTextDocumentOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const ARTICLE_TEXT_DOCUMENT_ACTIONS = {
	API_REQUEST_ARTICLE_TEXT_DOCUMENT,
	LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT,
	ACT_UPON_ARTICLE_TEXT_DOCUMENT,
	API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT,
	API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT,
	STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT,
	STORE_UPDATED_ARTICLE_TEXT_DOCUMENT,
	REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE,
	ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS,
	ARTICLE_TEXT_DOCUMENT_CRUD_FAIL,
	ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS,
	ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS,
	ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS,
	NOOP,
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:50:57 
 * Last modified  : 2022-07-08 12:34:42
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { ArticleTextDocumentModel } from 'src/app/shared/model/article-text-document.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { ArticleTextDocumentCrudStateModel } from './article-text-document-crud.state.model';
import { ARTICLE_TEXT_DOCUMENT_CRUD_FEATURE_KEY } from './article-text-document-crud.state.reducer';

/**
 * @description Get operation status
 */
const getOperationStatus = (articleTextDocumentCrudStateModel: ArticleTextDocumentCrudStateModel): OperationsEnum => articleTextDocumentCrudStateModel.operationStatus;

/**
 * @description Get operation article text document
 */
const getOperationArticleTextDocument = (articleTextDocumentCrudStateModel: ArticleTextDocumentCrudStateModel): ArticleTextDocumentModel => articleTextDocumentCrudStateModel.operationArticleTextDocument;

/**
 * @description Selector - Article text document crud state
 */
export const selectArticleTextDocumentCrudState: MemoizedSelector<ArticleTextDocumentCrudStateModel, ArticleTextDocumentCrudStateModel>  = createFeatureSelector<ArticleTextDocumentCrudStateModel>(ARTICLE_TEXT_DOCUMENT_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<ArticleTextDocumentCrudStateModel, OperationsEnum> = createSelector(
	selectArticleTextDocumentCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation Article Text Document
 */
export const selectOperationArticleTextDocument: MemoizedSelector<ArticleTextDocumentCrudStateModel, ArticleTextDocumentModel> = createSelector(
	selectArticleTextDocumentCrudState,
	getOperationArticleTextDocument
);

/**
 * @description export article text document crud query to access all selectors
 */
export const ARTICLE_TEXT_DOCUMENT_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationArticleTextDocument
};
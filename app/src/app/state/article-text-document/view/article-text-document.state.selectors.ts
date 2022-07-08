/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document state selectors
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-08 12:35:53
 */

import
{
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { articleTextDocumentAdapter, ArticleTextDocumentStateModel } from './article-text-document.state.model';
import { ARTICLE_TEXT_DOCUMENT_FEATURE_KEY } from './article-text-document.state.reducer';


/**
 * @description Selectors - Article Text Document adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = articleTextDocumentAdapter.getSelectors();

/**
 * @description  Selectors - Article Text Document State
 */
export const selectArticleTextDocumentState: MemoizedSelector<ArticleTextDocumentStateModel, ArticleTextDocumentStateModel> = createFeatureSelector<ArticleTextDocumentStateModel>(ARTICLE_TEXT_DOCUMENT_FEATURE_KEY);

/**
 * @description Selectors - All Article Text Document
 */
export const selectAllArticleTextDocument = createSelector(
	selectArticleTextDocumentState,
	selectAll,
);

/**
 * @description Selectors - All Article Text Document Ids
 */
export const selectAllArticleTextDocumentIds = createSelector(
	selectArticleTextDocumentState,
	selectIds,
);

/**
 * @description Selectors - Article Text Document total number
 */
export const selectArticleTextDocumentTotalNumber = createSelector(
	selectArticleTextDocumentState,
	selectTotal,
);

/**
 * @description Selectors - Article text document by article id
 */
const selectArticleTextDocumentByArticleId = (articleId: string) => 
createSelector(selectArticleTextDocumentState, (state) => state.entities[articleId]);

/**
 * @description export article text document query to access all selectors
 */
export const ARTICLE_TEXT_DOCUMENT_QUERY_SELECTOR = {
	selectAllArticleTextDocument,
	selectAllArticleTextDocumentIds,
	selectArticleTextDocumentTotalNumber,
	selectArticleTextDocumentByArticleId
};

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-08 12:34:49
 */


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleTextDocumentModel } from 'src/app/shared/model/article-text-document.model';

/**
 * Selects article text document id
 * @param articleTextDocumentModel 
 * @returns article text document id 
 */
export function selectArticleTextDocumentId(articleTextDocumentModel: ArticleTextDocumentModel): string
{
	return articleTextDocumentModel.articleId ? articleTextDocumentModel.articleId : '';
}

/**
 * Article text document state model
 */
export interface ArticleTextDocumentStateModel extends EntityState<ArticleTextDocumentModel> { }

/**
 * @description Article text document adapter
 */
export const articleTextDocumentAdapter: EntityAdapter<ArticleTextDocumentModel> = createEntityAdapter<ArticleTextDocumentModel>({
	selectId: selectArticleTextDocumentId
});

/**
 * @description Initial Article text document initial state
 */
export const INITIAL_ARTICLE_TEXT_DOCUMENT_STATE: ArticleTextDocumentStateModel = articleTextDocumentAdapter.getInitialState();
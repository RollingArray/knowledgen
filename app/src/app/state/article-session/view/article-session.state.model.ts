/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:29:50 
 * Last modified  : 2022-08-03 16:45:59
 */


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleSessionModel } from 'src/app/shared/model/article-session.model';

/**
 * Selects session article id
 * @param articleSessionModel 
 * @returns session article id 
 */
export function selectSessionArticleId(articleSessionModel: ArticleSessionModel): string
{
	return articleSessionModel.articleId ? articleSessionModel.articleId : '';
}

/**
 * Article session state model
 */
export interface ArticleSessionStateModel extends EntityState<ArticleSessionModel> { }

/**
 * @description Article session adapter
 */
export const articleSessionAdapter: EntityAdapter<ArticleSessionModel> = createEntityAdapter<ArticleSessionModel>({
	selectId: selectSessionArticleId
});

/**
 * @description Initial article session initial state
 */
export const INITIAL_ARTICLE_SESSION_STATE: ArticleSessionStateModel = articleSessionAdapter.getInitialState();
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-21 20:57:21
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleRevisionModel } from 'src/app/shared/model/article-revision.model';

/**
 * Selects revision id
 * @param articleRevisionModel 
 * @returns revision id
 */
export function selectArticleRevisionDate(articleRevisionModel: ArticleRevisionModel): string
{
	return articleRevisionModel.articleRevisionDate ? articleRevisionModel.articleRevisionDate : '';
}

/**
 * @description Revision model
 */
export interface RevisionStateModel extends EntityState<ArticleRevisionModel> { }

/**
 * @description Revision adapter
 */
export const revisionAdapter: EntityAdapter<ArticleRevisionModel> = createEntityAdapter<ArticleRevisionModel>({
	selectId: selectArticleRevisionDate
});

/**
 * @description Initial revision initial state
 */
export const INITIAL_REVISION_STATE: RevisionStateModel = revisionAdapter.getInitialState();
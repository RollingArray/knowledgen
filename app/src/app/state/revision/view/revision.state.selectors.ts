/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state selectors
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-19 18:41:28
 */

import
{
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { ArticleModel } from 'src/app/shared/model/article.model';
import { CourseMaterialMenuModel } from 'src/app/shared/model/course-material-menu.model';
import { revisionAdapter, RevisionStateModel } from './revision.state.model';
import { REVISION_FEATURE_KEY } from './revision.state.reducer';


/**
 * @description Selectors - Revision adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = revisionAdapter.getSelectors();

/**
 * @description  Selectors - Revision State
 */
export const selectRevisionState: MemoizedSelector<RevisionStateModel, RevisionStateModel> = createFeatureSelector<RevisionStateModel>(REVISION_FEATURE_KEY);

/**
 * @description Selectors - All Revision
 */
export const selectAllRevision = createSelector(
	selectRevisionState,
	selectAll,
);

/**
 * @description Selectors - All Revision Ids
 */
export const selectAllRevisionIds = createSelector(
	selectRevisionState,
	selectIds,
);

/**
 * @description Selectors - Revision total number
 */
export const selectRevisionTotalNumber = createSelector(
	selectRevisionState,
	selectTotal,
);

/**
 * @description Selectors - Revision has revision
 */
export const selectRevisionHasData = (articleRevisionDate: string) => createSelector(
	selectRevisionState,
	//selectEntities,
	(entity) =>
	{
		let hasData = false;
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.articleRevisionDate === articleRevisionDate)
			{
				hasData = true
			}
		})
		
		return hasData;
	}
);

/**
 * @description Selectors - All Revision by date
 */
export const selectAllRevisionByDate = (articleRevisionDate: string) => createSelector(
	selectRevisionState,
	//selectEntities,
	(entity) =>
	{
		let revisions: CourseMaterialMenuModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.articleRevisionDate === articleRevisionDate)
			{
				eachEntity.articles.map(eachArticle =>
				{
					revisions = [
						...revisions,
						eachArticle
					]
				})
				
			}
		})
		return revisions;
	}
);

/**
 * @description export User skill categories query to access all selectors
 */
export const REVISION_QUERY_SELECTOR = {
	selectAllRevision,
	selectAllRevisionIds,
	selectRevisionTotalNumber,
	selectRevisionHasData,
	selectAllRevisionByDate,
};

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:23:54 
 * Last modified  : 2022-09-26 14:26:43
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { coreSubjectAreaTagAdapter, CoreSubjectAreaTagStateModel } from "./core-subject-area-tag.state.model";
import { CORE_SUBJECT_AREA_TAG_FEATURE_KEY } from "./core-subject-area-tag.state.reducer";

/**
 * @description Selectors - Core subject area tag adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = coreSubjectAreaTagAdapter.getSelectors();

/**
 * @description  Selectors - Core subject area tag State
 */
const selectCoreSubjectAreaTagState: MemoizedSelector<CoreSubjectAreaTagStateModel, CoreSubjectAreaTagStateModel> = createFeatureSelector<CoreSubjectAreaTagStateModel>(CORE_SUBJECT_AREA_TAG_FEATURE_KEY);


/**
 * @description Selectors - All Core subject area tag
 */
const selectAllCoreSubjectAreaTag = createSelector(
	selectCoreSubjectAreaTagState,
	selectAll,
);

/**
 * @description Selectors - All Core subject area tag Ids
 */
const selectAllCoreSubjectAreaTagIds = createSelector(
	selectCoreSubjectAreaTagState,
	selectIds,
);

/**
 * @description Selectors - Core subject area tag total number
 */
const selectCoreSubjectAreaTagTotalNumber = createSelector(
	selectCoreSubjectAreaTagState,
	selectTotal,
);

/**
 * @description Selectors - Core subject area tag has coreSubjectAreaTag
 */
const selectCoreSubjectAreaTagHasData = createSelector(
	selectEntities,
	selectCoreSubjectAreaTagTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Core subject area tag by coreSubjectAreaTag id
 */
const selectCoreSubjectAreaTagsByCoreSubjectAreaTagId = (subjectAreaTagId: string) =>
	createSelector(selectCoreSubjectAreaTagState, (state) =>
	{
		return state.entities[subjectAreaTagId];
	});

/**
 * @description Selectors - If core subject area exist by core subject area id
 */
const selectIfCoreSubjectAreaTagExistByCoreSubjectAreaTagId = (subjectAreaTagId: string) =>
	createSelector(selectCoreSubjectAreaTagState, (state) =>
	{

		return state.entities[subjectAreaTagId] !== undefined ? true : false;
	});

/**
 * @description Selectors - Core subject area tags by search key
 */
const selectCoreSubjectAreaTagsBySearchKey = (searchKey: string) => createSelector(
	selectCoreSubjectAreaTagState,
	//selectEntities,
	(entity) =>
	{
		let searchedCoreSubjectAreaTags: CoreSubjectAreaTagModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			const regex = new RegExp(searchKey, 'gi'); // match all, not case sensitive
			if (eachEntity.subjectAreaTagName.match(regex) !== null)
			{
				searchedCoreSubjectAreaTags = [
					...searchedCoreSubjectAreaTags,
					eachEntity
				]
			}
		})
		return searchedCoreSubjectAreaTags;
	}
);

/**
 * @description export User skill categories query to access all selectors
 */
export const CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR = {
	selectAllCoreSubjectAreaTag,
	selectAllCoreSubjectAreaTagIds,
	selectCoreSubjectAreaTagTotalNumber,
	selectCoreSubjectAreaTagHasData,
	selectCoreSubjectAreaTagsByCoreSubjectAreaTagId,
	selectCoreSubjectAreaTagsBySearchKey,
	selectIfCoreSubjectAreaTagExistByCoreSubjectAreaTagId
};

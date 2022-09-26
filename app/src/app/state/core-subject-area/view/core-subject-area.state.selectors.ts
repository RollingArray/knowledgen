/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:23:54 
 * Last modified  : 2022-09-26 14:26:43
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { coreSubjectAreaAdapter, CoreSubjectAreaStateModel } from "./core-subject-area.state.model";
import { CORE_SUBJECT_AREA_FEATURE_KEY } from "./core-subject-area.state.reducer";

/**
 * @description Selectors - Core subject area adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = coreSubjectAreaAdapter.getSelectors();

/**
 * @description  Selectors - Core subject area State
 */
const selectCoreSubjectAreaState: MemoizedSelector<CoreSubjectAreaStateModel, CoreSubjectAreaStateModel> = createFeatureSelector<CoreSubjectAreaStateModel>(CORE_SUBJECT_AREA_FEATURE_KEY);


/**
 * @description Selectors - All Core subject area
 */
const selectAllCoreSubjectArea = createSelector(
	selectCoreSubjectAreaState,
	selectAll,
);

/**
 * @description Selectors - All Core subject area Ids
 */
const selectAllCoreSubjectAreaIds = createSelector(
	selectCoreSubjectAreaState,
	selectIds,
);

/**
 * @description Selectors - Core subject area total number
 */
const selectCoreSubjectAreaTotalNumber = createSelector(
	selectCoreSubjectAreaState,
	selectTotal,
);

/**
 * @description Selectors - Core subject area has coreSubjectArea
 */
const selectCoreSubjectAreaHasData = createSelector(
	selectEntities,
	selectCoreSubjectAreaTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Core subject area by coreSubjectArea id
 */
const selectCoreSubjectAreasByCoreSubjectAreaId = (subjectAreaIdId: string) =>
	createSelector(selectCoreSubjectAreaState, (state) =>
	{
		console.log(subjectAreaIdId, state.entities[subjectAreaIdId]);
		return state.entities[subjectAreaIdId];
	});

/**
 * @description Selectors - If core subject area exist by core subject area id
 */
 const selectIfCoreSubjectAreaExistByCoreSubjectAreaId = (subjectAreaIdId: string) =>
 createSelector(selectCoreSubjectAreaState, (state) =>
 {
	 
	 return state.entities[subjectAreaIdId] !== undefined ? true : false ;
 });

/**
 * @description Selectors - Core subject areas by search key
 */
const selectCoreSubjectAreasBySearchKey = (searchKey: string) => createSelector(
	selectCoreSubjectAreaState,
	//selectEntities,
	(entity) =>
	{
		let searchedCoreSubjectAreas: CoreSubjectAreaModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			const regex = new RegExp(searchKey, 'gi'); // match all, not case sensitive
			if (eachEntity.subjectAreaName.match(regex) !== null)
			{
				searchedCoreSubjectAreas = [
					...searchedCoreSubjectAreas,
					eachEntity
				]
			}
		})
		return searchedCoreSubjectAreas;
	}
);

/**
 * @description export User skill categories query to access all selectors
 */
export const CORE_SUBJECT_AREA_QUERY_SELECTOR = {
	selectAllCoreSubjectArea,
	selectAllCoreSubjectAreaIds,
	selectCoreSubjectAreaTotalNumber,
	selectCoreSubjectAreaHasData,
	selectCoreSubjectAreasByCoreSubjectAreaId,
	selectCoreSubjectAreasBySearchKey,
	selectIfCoreSubjectAreaExistByCoreSubjectAreaId
};

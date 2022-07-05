/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-07-05 13:11:58
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { courseMaterialAdapter, CourseMaterialStateModel } from "./course-material.state.model";
import { COURSE_MATERIAL_FEATURE_KEY } from "./course-material.state.reducer";

/**
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = courseMaterialAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
const selectCourseMaterialState: MemoizedSelector<CourseMaterialStateModel, CourseMaterialStateModel> = createFeatureSelector<CourseMaterialStateModel>(COURSE_MATERIAL_FEATURE_KEY);


/**
 * @description Selectors - All Course material
 */
const selectAllCourseMaterial = createSelector(
	selectCourseMaterialState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
const selectAllCourseMaterialIds = createSelector(
	selectCourseMaterialState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
const selectCourseMaterialTotalNumber = createSelector(
	selectCourseMaterialState,
	selectTotal,
);

/**
 * @description Selectors - Course material has courseMaterial
 */
const selectCourseMaterialHasData = createSelector(
	selectEntities,
	selectCourseMaterialTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material by courseMaterial id
 */
 const selectCourseMaterialByCourseMaterialId = (courseMaterialIdId: string) =>
	createSelector(selectCourseMaterialState, (state) => state.entities[courseMaterialIdId]);

/**
 * @description Selectors - Course material Owner
 */
const selectCourseMaterialOwner = (courseMaterialIdId: string) =>
	createSelector(selectCourseMaterialState, (state) =>
	{
		if (state.entities[courseMaterialIdId])
		{
			return state.entities[courseMaterialIdId].userId;
		}
		else
		{
			return '';
		}
		
	});


/**
 * @description export User skill categories query to access all selectors
 */
export const COURSE_MATERIAL_QUERY_SELECTOR = {
	selectAllCourseMaterial,
	selectAllCourseMaterialIds,
	selectCourseMaterialTotalNumber,
	selectCourseMaterialHasData,
	selectCourseMaterialOwner,
	selectCourseMaterialByCourseMaterialId
};

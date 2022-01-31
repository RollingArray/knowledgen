/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-26 14:55:02
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { courseMaterialAdapter, CourseMaterialStateModel } from './course-material.state.model';
import { COURSE_MATERIAL_FEATURE_KEY } from './course-material.state.reducer';


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
export const selectCourseMaterialState: MemoizedSelector<CourseMaterialStateModel, CourseMaterialStateModel> = createFeatureSelector<CourseMaterialStateModel>(COURSE_MATERIAL_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
export const selectAllCourseMaterial = createSelector(
	selectCourseMaterialState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
export const selectAllCourseMaterialIds = createSelector(
	selectCourseMaterialState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
export const selectCourseMaterialTotalNumber = createSelector(
	selectCourseMaterialState,
	selectTotal,
);

/**
 * @description Selectors - Course material has courseMaterial
 */
export const selectCourseMaterialHasData = createSelector(
	selectEntities,
	selectCourseMaterialTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material by courseMaterial id
 */
const selectCourseMaterialByCourseMaterialId = (courseMaterialIdId: string) => 
	createSelector(selectCourseMaterialState, (state) => state.entities[courseMaterialIdId]);

const selectCourseMaterialOwner = (courseMaterialIdId: string) => 
	createSelector(selectCourseMaterialState, (state) =>
	{
		console.log(state.entities[courseMaterialIdId]);
		return '61e05785ad070'; //state.entities[courseMaterialIdId].userId;
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

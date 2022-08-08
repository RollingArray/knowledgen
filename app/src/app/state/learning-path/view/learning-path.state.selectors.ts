/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-08-08 17:58:43
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { learningPathAdapter, LearningPathStateModel } from "./learning-path.state.model";
import { LEARNING_PATH_FEATURE_KEY } from "./learning-path.state.reducer";

/**
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = learningPathAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
const selectLearningPathState: MemoizedSelector<LearningPathStateModel, LearningPathStateModel> = createFeatureSelector<LearningPathStateModel>(LEARNING_PATH_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
const selectAllLearningPath = createSelector(
	selectLearningPathState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
const selectAllLearningPathIds = createSelector(
	selectLearningPathState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
const selectLearningPathTotalNumber = createSelector(
	selectLearningPathState,
	selectTotal,
);

/**
 * @description Selectors - Course material has learningPath
 */
const selectLearningPathHasData = createSelector(
	selectEntities,
	selectLearningPathTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material by learningPath id
 */
const selectLearningPathByLearningPathId = (courseMaterialIdId: string) =>
	createSelector(selectLearningPathState, (state) => state.entities[courseMaterialIdId]);

/**
 * @description Selectors - Course material Owner
 */
const selectLearningPathOwner = (courseMaterialIdId: string) =>
	createSelector(selectLearningPathState, (state) =>
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
 * @description Selectors - Learning path total progress percentage
 */
export const selectLearningPathTotalProgressPercentage = createSelector(
	selectLearningPathState,
	selectLearningPathTotalNumber,
	(entity, totalNumber) =>
	{
		let hasData = false;
		const entityIds = entity.ids;
		const maxPathProgress = 100 * totalNumber; // 100% as max progress
		let learningPathProgress = 0;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			learningPathProgress += eachEntity.courseMaterialProgress;
		})

		return [
			((learningPathProgress / maxPathProgress) * 100).toFixed(2),
			((learningPathProgress / maxPathProgress)).toFixed(2)
		];
	}
);

/**
 * @description export User skill categories query to access all selectors
 */
export const LEARNING_PATH_QUERY_SELECTOR = {
	selectAllLearningPath,
	selectAllLearningPathIds,
	selectLearningPathTotalNumber,
	selectLearningPathHasData,
	selectLearningPathOwner,
	selectLearningPathByLearningPathId,
	selectLearningPathTotalProgressPercentage
};

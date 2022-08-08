/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-08-08 09:11:39
 */



import { LearningPathModel } from "src/app/shared/model/learning-path.model";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Selects course material id
 * @param learningPathModel 
 * @returns course material id 
 */
export function selectLearningPathId(learningPathModel: LearningPathModel): string
{
	return learningPathModel.courseMaterialId ? learningPathModel.courseMaterialId : '';
}

/**
 * @description Course material model
 */
export interface LearningPathStateModel extends EntityState<LearningPathModel> { }

/**
 * @description Course material adapter
 */
export const learningPathAdapter: EntityAdapter<LearningPathModel> = createEntityAdapter<LearningPathModel>({
	selectId: selectLearningPathId
});

/**
 * @description Initial course material initial state
 */
export const INITIAL_LEARNING_PATH_STATE: LearningPathStateModel = learningPathAdapter.getInitialState();
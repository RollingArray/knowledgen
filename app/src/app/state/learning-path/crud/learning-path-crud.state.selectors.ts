/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-08-08 09:11:19
 */
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { LearningPathModel } from 'src/app/shared/model/learning-path.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { LearningPathCrudStateModel } from './learning-path-crud.state.model';
import { LEARNING_PATH_CRUD_FEATURE_KEY } from './learning-path-crud.state.reducer';

/**
 * @description get operation status
 */
const getOperationStatus = (learningPathCrudStateModel: LearningPathCrudStateModel): OperationsEnum => learningPathCrudStateModel.operationStatus;

/**
 * @description get operation learningPath
 */
const getOperationLearningPath = (learningPathCrudStateModel: LearningPathCrudStateModel): LearningPathModel => learningPathCrudStateModel.operationLearningPath;

/**
 * @description Selector - Course Material crud state
 */
export const selectLearningPathCrudState: MemoizedSelector<LearningPathCrudStateModel, LearningPathCrudStateModel>  = createFeatureSelector<LearningPathCrudStateModel>(LEARNING_PATH_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<LearningPathCrudStateModel, OperationsEnum> = createSelector(
	selectLearningPathCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation Course Material
 */
export const selectOperationLearningPath: MemoizedSelector<LearningPathCrudStateModel, LearningPathModel> = createSelector(
	selectLearningPathCrudState,
	getOperationLearningPath
);

/**
 * @description export learningPath crud query to access all selectors
 */
export const LEARNING_PATH_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationLearningPath
};
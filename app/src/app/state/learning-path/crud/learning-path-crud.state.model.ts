/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-08-08 09:08:54
 */



import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { LearningPathModel } from "src/app/shared/model/learning-path.model";

/**
 * @description LearningPath crud state model
 */
export interface LearningPathCrudStateModel {
	operationStatus: OperationsEnum;
	operationLearningPath: LearningPathModel;
}

/**
 * @description LearningPath crud initial state
 */
export const LEARNING_PATH_CRUD_INITIAL_STATE: LearningPathCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationLearningPath: {}
};
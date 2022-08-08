/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course Material State Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:16:13 
 * Last modified  : 2022-08-08 09:14:15
 */

import { createAction, props } from '@ngrx/store';
import { LearningPathModel } from 'src/app/shared/model/learning-path.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { LearningPathOperationsEnum } from './learning-path-operations.enum';


/**
 * @description Course Material Action - Api Request Course Material
 */
export const API_REQUEST_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.API_REQUEST_LEARNING_PATH
);

/**
 * @description Course Material Action - Loaded Course Material
 */
export const LOADED_REQUEST_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.LOADED_REQUEST_LEARNING_PATH,
	props<{ payload: LearningPathModel[] }>()
);

/**
 * @description Course Material Action - Act Upon Course Material
 */
export const ACT_UPON_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.ACT_UPON_LEARNING_PATH,
	props<{ payload: LearningPathModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Action - Send Api Request To Add New Course Material
 */
export const API_REQUEST_ADD_NEW_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.API_REQUEST_ADD_NEW_LEARNING_PATH,
	props<{ payload: LearningPathModel }>()
);

/**
 * @description Course Material Action - Send Api Request To Delete Course Material
 */
export const API_REQUEST_DELETE_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.API_REQUEST_DELETE_LEARNING_PATH,
	props<{ payload: LearningPathModel }>()
);

/**
 * @description Course Material Action - Store Newly Added Course Material
 */
export const STORE_NEWLY_ADDED_LEARNING_PATH = createAction(
	LearningPathOperationsEnum.STORE_NEWLY_ADDED_LEARNING_PATH,
	props<{ payload: LearningPathModel }>()
);

/**
 * @description Course Material Action - Remove Course Material From Store
 */
export const REMOVE_LEARNING_PATH_FROM_STORE = createAction(
	LearningPathOperationsEnum.REMOVE_LEARNING_PATH_FROM_STORE,
	props<{ payload: LearningPathModel }>()
);

/**
 * @description Course Material Action - Course Material CRUD Successfully
 */
export const LEARNING_PATH_CRUD_SUCCESS = createAction(
	LearningPathOperationsEnum.LEARNING_PATH_CRUD_SUCCESS
);

/**
 * @description Course Material Action - Course Material CRUD Fail
 */
export const LEARNING_PATH_CRUD_FAIL = createAction(
	LearningPathOperationsEnum.LEARNING_PATH_CRUD_FAIL
);

/**
 * @description Course Material Action - Course Material Deleted Successfully
 */
export const LEARNING_PATH_DELETED_SUCCESS = createAction(
	LearningPathOperationsEnum.LEARNING_PATH_DELETED_SUCCESS
);

/**
 * @description Course Material Action - Course Material Added Successfully
 */
export const LEARNING_PATH_ADDED_SUCCESS = createAction(
	LearningPathOperationsEnum.LEARNING_PATH_ADDED_SUCCESS
);

/**
 * @description Course Material Action - No Operation
 */
export const NOOP = createAction(
	LearningPathOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const LEARNING_PATH_ACTIONS = {
	API_REQUEST_LEARNING_PATH,
	LOADED_REQUEST_LEARNING_PATH,
	ACT_UPON_LEARNING_PATH,
	API_REQUEST_ADD_NEW_LEARNING_PATH,
	API_REQUEST_DELETE_LEARNING_PATH,
	STORE_NEWLY_ADDED_LEARNING_PATH,
	REMOVE_LEARNING_PATH_FROM_STORE,
	LEARNING_PATH_CRUD_SUCCESS,
	LEARNING_PATH_CRUD_FAIL,
	LEARNING_PATH_ADDED_SUCCESS,
	LEARNING_PATH_DELETED_SUCCESS,
	NOOP,
};
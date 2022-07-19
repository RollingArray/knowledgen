/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state action
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-19 18:43:49
 */

import { createAction, props } from '@ngrx/store';
import { CourseMaterialQuizModel } from 'src/app/shared/model/course-material-quiz.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialQuizOperationsEnum } from './course-material-quiz-operations.enum';


/**
 * @description Course material quiz actions - Api Request Course Material Quiz
 */
export const API_REQUEST_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.API_REQUEST_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Loaded Course Material Quiz
 */
export const LOADED_REQUEST_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.LOADED_REQUEST_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel[] }>()
);

/**
 * @description Course material quiz actions - Act Upon Course Material Quiz
 */
export const ACT_UPON_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.ACT_UPON_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel, operation: OperationsEnum }>()
);

/**
 * @description Course material quiz actions - Send Api Request To Add New Course Material Quiz
 */
export const API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Send Api Request To Edit Course Material Quiz
 */
export const API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Send Api Request To Delete Course Material Quiz
 */
export const API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Store Newly Added Course Material Quiz
 */
export const STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Store Updated Course Material Quiz
 */
export const STORE_UPDATED_COURSE_MATERIAL_QUIZ = createAction(
	CourseMaterialQuizOperationsEnum.STORE_UPDATED_COURSE_MATERIAL_QUIZ,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Remove Course Material Quiz From Store
 */
export const REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE = createAction(
	CourseMaterialQuizOperationsEnum.REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE,
	props<{ payload: CourseMaterialQuizModel }>()
);

/**
 * @description Course material quiz actions - Course Material Quiz CRUD Successfully
 */
export const COURSE_MATERIAL_QUIZ_CRUD_SUCCESS = createAction(
	CourseMaterialQuizOperationsEnum.COURSE_MATERIAL_QUIZ_CRUD_SUCCESS
);

/**
 * @description Course material quiz actions - Course Material Quiz CRUD Fail
 */
export const COURSE_MATERIAL_QUIZ_CRUD_FAIL = createAction(
	CourseMaterialQuizOperationsEnum.COURSE_MATERIAL_QUIZ_CRUD_FAIL
);

/**
 * @description Course material quiz actions - Course Material Quiz Updated Successfully
 */
export const COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS = createAction(
	CourseMaterialQuizOperationsEnum.COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS
);

/**
 * @description Course material quiz actions - Course Material Quiz Deleted Successfully
 */
export const COURSE_MATERIAL_QUIZ_DELETED_SUCCESS = createAction(
	CourseMaterialQuizOperationsEnum.COURSE_MATERIAL_QUIZ_DELETED_SUCCESS
);

/**
 * @description Course material quiz actions - Course Material Quiz Added Successfully
 */
export const COURSE_MATERIAL_QUIZ_ADDED_SUCCESS = createAction(
	CourseMaterialQuizOperationsEnum.COURSE_MATERIAL_QUIZ_ADDED_SUCCESS
);

/**
 * @description Course material quiz actions - No Operation
 */
export const NOOP = createAction(
	CourseMaterialQuizOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const COURSE_MATERIAL_QUIZ_ACTIONS = {
	API_REQUEST_COURSE_MATERIAL_QUIZ,
	LOADED_REQUEST_COURSE_MATERIAL_QUIZ,
	ACT_UPON_COURSE_MATERIAL_QUIZ,
	API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ,
	API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ,
	API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ,
	STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ,
	STORE_UPDATED_COURSE_MATERIAL_QUIZ,
	REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE,
	COURSE_MATERIAL_QUIZ_CRUD_SUCCESS,
	COURSE_MATERIAL_QUIZ_CRUD_FAIL,
	COURSE_MATERIAL_QUIZ_ADDED_SUCCESS,
	COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS,
	COURSE_MATERIAL_QUIZ_DELETED_SUCCESS,
	NOOP,
};
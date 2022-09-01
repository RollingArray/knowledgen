/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state action
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:08
 */

import { createAction, props } from '@ngrx/store';
import { CourseMaterialFlashCardModel } from 'src/app/shared/model/course-material-flash-card.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialFlashCardOperationsEnum } from './course-material-flash-card-operations.enum';


/**
 * @description Course material flash card actions - Api Request Course Material Quiz
 */
export const API_REQUEST_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.API_REQUEST_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Loaded Course Material Quiz
 */
export const LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel[] }>()
);

/**
 * @description Course material flash card actions - Act Upon Course Material Quiz
 */
export const ACT_UPON_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.ACT_UPON_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel, operation: OperationsEnum }>()
);

/**
 * @description Course material flash card actions - Send Api Request To Add New Course Material Quiz
 */
export const API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Send Api Request To Edit Course Material Quiz
 */
export const API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Send Api Request To Delete Course Material Quiz
 */
export const API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Store Newly Added Course Material Quiz
 */
export const STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Store Updated Course Material Quiz
 */
export const STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD = createAction(
	CourseMaterialFlashCardOperationsEnum.STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Remove Course Material Quiz From Store
 */
export const REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE = createAction(
	CourseMaterialFlashCardOperationsEnum.REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE,
	props<{ payload: CourseMaterialFlashCardModel }>()
);

/**
 * @description Course material flash card actions - Course Material Quiz CRUD Successfully
 */
export const COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS = createAction(
	CourseMaterialFlashCardOperationsEnum.COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS
);

/**
 * @description Course material flash card actions - Course Material Quiz CRUD Fail
 */
export const COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL = createAction(
	CourseMaterialFlashCardOperationsEnum.COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL
);

/**
 * @description Course material flash card actions - Course Material Quiz Updated Successfully
 */
export const COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS = createAction(
	CourseMaterialFlashCardOperationsEnum.COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS
);

/**
 * @description Course material flash card actions - Course Material Quiz Deleted Successfully
 */
export const COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS = createAction(
	CourseMaterialFlashCardOperationsEnum.COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS
);

/**
 * @description Course material flash card actions - Course Material Quiz Added Successfully
 */
export const COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS = createAction(
	CourseMaterialFlashCardOperationsEnum.COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS
);

/**
 * @description Course material flash card actions - No Operation
 */
export const NOOP = createAction(
	CourseMaterialFlashCardOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const COURSE_MATERIAL_FLASH_CARD_ACTIONS = {
	API_REQUEST_COURSE_MATERIAL_FLASH_CARD,
	LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD,
	ACT_UPON_COURSE_MATERIAL_FLASH_CARD,
	API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD,
	API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD,
	API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD,
	STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD,
	STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD,
	REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE,
	COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS,
	COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL,
	COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS,
	COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS,
	COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS,
	NOOP,
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course Material Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:16:13 
 * Last modified  : 2022-01-26 18:08:34
 */

import { createAction, props } from '@ngrx/store';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialOperationsEnum } from './course-material-operations.enum';


/**
 * @description Course Material Action - Api Request Course Material
 */
export const API_REQUEST_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.API_REQUEST_COURSE_MATERIAL
);

export const API_REQUEST_RECOMMENDED_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.API_REQUEST_RECOMMENDED_COURSE_MATERIAL
);

/**
 * @description Course Material Action - Loaded Course Material
 */
export const LOADED_REQUEST_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.LOADED_REQUEST_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel[] }>()
);

/**
 * @description Course Material Action - Act Upon Category
 */
export const ACT_UPON_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.ACT_UPON_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Action - Send Api Request To Add New Category
 */
export const API_REQUEST_ADD_NEW_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.API_REQUEST_ADD_NEW_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Send Api Request To Edit Category
 */
export const API_REQUEST_EDIT_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.API_REQUEST_EDIT_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Send Api Request To Delete Category
 */
export const API_REQUEST_DELETE_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.API_REQUEST_DELETE_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Store Newly Added Category
 */
export const STORE_NEWLY_ADDED_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.STORE_NEWLY_ADDED_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Store Updated Category
 */
export const STORE_UPDATED_COURSE_MATERIAL = createAction(
	CourseMaterialOperationsEnum.STORE_UPDATED_COURSE_MATERIAL,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Store Deleted Category
 */
export const REMOVE_COURSE_MATERIAL_FROM_STORE = createAction(
	CourseMaterialOperationsEnum.REMOVE_COURSE_MATERIAL_FROM_STORE,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Action - Category Crud Successfully
 */
export const COURSE_MATERIAL_CRUD_SUCCESS = createAction(
	CourseMaterialOperationsEnum.COURSE_MATERIAL_CRUD_SUCCESS
);

/**
 * @description Course Material Action - Category crud fail
 */
export const COURSE_MATERIAL_CRUD_FAIL = createAction(
	CourseMaterialOperationsEnum.COURSE_MATERIAL_CRUD_FAIL
);

/**
 * @description Course Material Action - Category Updated Successfully
 */
export const COURSE_MATERIAL_UPDATED_SUCCESS = createAction(
	CourseMaterialOperationsEnum.COURSE_MATERIAL_UPDATED_SUCCESS
);

/**
 * @description Course Material Action - Category Deleted Successfully
 */
export const COURSE_MATERIAL_DELETED_SUCCESS = createAction(
	CourseMaterialOperationsEnum.COURSE_MATERIAL_DELETED_SUCCESS
);

/**
 * @description Course Material Action - Skill Added Successfully
 */
export const COURSE_MATERIAL_ADDED_SUCCESS = createAction(
	CourseMaterialOperationsEnum.COURSE_MATERIAL_ADDED_SUCCESS
);

/**
 * @description Course Material Action - No Operation
 */
export const NOOP = createAction(
	CourseMaterialOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const COURSE_MATERIAL_ACTIONS = {
	API_REQUEST_COURSE_MATERIAL,
	API_REQUEST_RECOMMENDED_COURSE_MATERIAL,
	LOADED_REQUEST_COURSE_MATERIAL,
	ACT_UPON_COURSE_MATERIAL,
	API_REQUEST_ADD_NEW_COURSE_MATERIAL,
	API_REQUEST_EDIT_COURSE_MATERIAL,
	API_REQUEST_DELETE_COURSE_MATERIAL,
	STORE_NEWLY_ADDED_COURSE_MATERIAL,
	STORE_UPDATED_COURSE_MATERIAL,
	REMOVE_COURSE_MATERIAL_FROM_STORE,
	COURSE_MATERIAL_CRUD_SUCCESS,
	COURSE_MATERIAL_CRUD_FAIL,
	COURSE_MATERIAL_ADDED_SUCCESS,
	COURSE_MATERIAL_UPDATED_SUCCESS,
	COURSE_MATERIAL_DELETED_SUCCESS,
	NOOP,
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:01:51 
 * Last modified  : 2022-07-26 10:12:35
 */



import { createAction, props } from '@ngrx/store';
import { CourseMaterialAssignmentResultModel } from 'src/app/shared/model/course-material-assignment-result.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialAssignmentOperationsEnum } from './course-material-assignment-operations.enum';

/**
 * @description Course material assignment actions - Act Upon Course material assignment result
 */
export const ACT_UPON_COURSE_MATERIAL_ASSIGNMENT_RESULT = createAction(
	CourseMaterialAssignmentOperationsEnum.ACT_UPON_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	props<{ payload: CourseMaterialAssignmentResultModel, operation: OperationsEnum }>()
);

/**
 * @description Course material assignment actions - Send Api Request To Add New Course material assignment result
 */
export const API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT = createAction(
	CourseMaterialAssignmentOperationsEnum.API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	props<{ payload: CourseMaterialAssignmentResultModel }>()
);

/**
 * @description Course material assignment actions - Store Newly Added Course Material assignment result
 */
 export const STORE_NEWLY_ADDED_COURSE_MATERIAL_ASSIGNMENT_RESULT = createAction(
	CourseMaterialAssignmentOperationsEnum.STORE_NEWLY_ADDED_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	props<{ payload: CourseMaterialAssignmentResultModel }>()
 );

/**
 * @description Course material assignment actions - Course material assignment result CRUD Successfully
 */
export const COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_SUCCESS = createAction(
	CourseMaterialAssignmentOperationsEnum.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_SUCCESS
);

/**
 * @description Course material assignment actions - Course material assignment result CRUD Fail
 */
export const COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_FAIL = createAction(
	CourseMaterialAssignmentOperationsEnum.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_FAIL
);

/**
 * @description Course material assignment Action - Course Material Assignment Result Added Successfully
 */
 export const COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS = createAction(
	CourseMaterialAssignmentOperationsEnum.COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS
);

/**
 * @description Course material assignment actions - No Operation
 */
export const NOOP = createAction(
	CourseMaterialAssignmentOperationsEnum.NOOP,
);

/**
 * @description Export all actions
 */
export const COURSE_MATERIAL_ASSIGNMENT_ACTIONS = {
	ACT_UPON_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	STORE_NEWLY_ADDED_COURSE_MATERIAL_ASSIGNMENT_RESULT,
	COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_SUCCESS,
	COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS,
	COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_FAIL,
	NOOP,
};
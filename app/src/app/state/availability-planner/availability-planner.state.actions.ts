/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course Material Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:16:13 
 * Last modified  : 2022-01-21 21:35:18
 */

import { createAction, props } from '@ngrx/store';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { AvailabilityPlannerOperationsEnum } from './availability-planner-operations.enum';


/**
 * @description Course Material Action - Api Request Course Material
 */
export const API_REQUEST_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Loaded Course Material
 */
export const LOADED_REQUEST_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.LOADED_REQUEST_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel[] }>()
);

/**
 * @description Course Material Action - Act Upon Category
 */
export const ACT_UPON_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.ACT_UPON_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Action - Send Api Request To Add New Category
 */
export const API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Send Api Request To Edit Category
 */
export const API_REQUEST_EDIT_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_EDIT_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Send Api Request To Delete Category
 */
export const API_REQUEST_DELETE_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_DELETE_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Store Newly Added Category
 */
export const STORE_NEWLY_ADDED_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.STORE_NEWLY_ADDED_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Store Updated Category
 */
export const STORE_UPDATED_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.STORE_UPDATED_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Store Deleted Category
 */
export const REMOVE_AVAILABILITY_PLANNER_FROM_STORE = createAction(
	AvailabilityPlannerOperationsEnum.REMOVE_AVAILABILITY_PLANNER_FROM_STORE,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Course Material Action - Category Crud Successfully
 */
export const AVAILABILITY_PLANNER_CRUD_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_CRUD_SUCCESS
);

/**
 * @description Course Material Action - Category crud fail
 */
export const AVAILABILITY_PLANNER_CRUD_FAIL = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_CRUD_FAIL
);

/**
 * @description Course Material Action - Category Updated Successfully
 */
export const AVAILABILITY_PLANNER_UPDATED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_UPDATED_SUCCESS
);

/**
 * @description Course Material Action - Category Deleted Successfully
 */
export const AVAILABILITY_PLANNER_DELETED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_DELETED_SUCCESS
);

/**
 * @description Course Material Action - Skill Added Successfully
 */
export const AVAILABILITY_PLANNER_ADDED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_ADDED_SUCCESS
);

/**
 * @description Course Material Action - No Operation
 */
export const NOOP = createAction(
	AvailabilityPlannerOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const AVAILABILITY_PLANNER_ACTIONS = {
	API_REQUEST_AVAILABILITY_PLANNER,
	LOADED_REQUEST_AVAILABILITY_PLANNER,
	ACT_UPON_AVAILABILITY_PLANNER,
	API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER,
	API_REQUEST_EDIT_AVAILABILITY_PLANNER,
	API_REQUEST_DELETE_AVAILABILITY_PLANNER,
	STORE_NEWLY_ADDED_AVAILABILITY_PLANNER,
	STORE_UPDATED_AVAILABILITY_PLANNER,
	REMOVE_AVAILABILITY_PLANNER_FROM_STORE,
	AVAILABILITY_PLANNER_CRUD_SUCCESS,
	AVAILABILITY_PLANNER_CRUD_FAIL,
	AVAILABILITY_PLANNER_ADDED_SUCCESS,
	AVAILABILITY_PLANNER_UPDATED_SUCCESS,
	AVAILABILITY_PLANNER_DELETED_SUCCESS,
	NOOP,
};
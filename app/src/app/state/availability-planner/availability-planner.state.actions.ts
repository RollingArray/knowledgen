/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:53:19 
 * Last modified  : 2022-07-05 11:56:01
 */



import { createAction, props } from '@ngrx/store';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { AvailabilityPlannerOperationsEnum } from './availability-planner-operations.enum';


/**
 * @description Availability planner actions - Api Request Availability Planner
 */
export const API_REQUEST_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Loaded Availability Planner
 */
export const LOADED_REQUEST_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.LOADED_REQUEST_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel[] }>()
);

/**
 * @description Availability planner actions - Act Upon Availability Planner
 */
export const ACT_UPON_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.ACT_UPON_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel, operation: OperationsEnum }>()
);

/**
 * @description Availability planner actions - Send Api Request To Add New Availability Planner
 */
export const API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Send Api Request To Edit Availability Planner
 */
export const API_REQUEST_EDIT_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_EDIT_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Send Api Request To Delete Availability Planner
 */
export const API_REQUEST_DELETE_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.API_REQUEST_DELETE_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Store Newly Added Availability Planner
 */
export const STORE_NEWLY_ADDED_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.STORE_NEWLY_ADDED_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Store Updated Availability Planner
 */
export const STORE_UPDATED_AVAILABILITY_PLANNER = createAction(
	AvailabilityPlannerOperationsEnum.STORE_UPDATED_AVAILABILITY_PLANNER,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Remove Availability Planner From Store
 */
export const REMOVE_AVAILABILITY_PLANNER_FROM_STORE = createAction(
	AvailabilityPlannerOperationsEnum.REMOVE_AVAILABILITY_PLANNER_FROM_STORE,
	props<{ payload: AvailabilityPlannerModel }>()
);

/**
 * @description Availability planner actions - Availability Planner CRUD Successfully
 */
export const AVAILABILITY_PLANNER_CRUD_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_CRUD_SUCCESS
);

/**
 * @description Availability planner actions - Availability Planner CRUD Fail
 */
export const AVAILABILITY_PLANNER_CRUD_FAIL = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_CRUD_FAIL
);

/**
 * @description Availability planner actions - Availability Planner Updated Successfully
 */
export const AVAILABILITY_PLANNER_UPDATED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_UPDATED_SUCCESS
);

/**
 * @description Availability planner actions - Availability Planner Deleted Successfully
 */
export const AVAILABILITY_PLANNER_DELETED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_DELETED_SUCCESS
);

/**
 * @description Availability planner actions - Availability Planner Added Successfully
 */
export const AVAILABILITY_PLANNER_ADDED_SUCCESS = createAction(
	AvailabilityPlannerOperationsEnum.AVAILABILITY_PLANNER_ADDED_SUCCESS
);

/**
 * @description Availability planner actions - No Operation
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
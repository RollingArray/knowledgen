/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:51:28 
 * Last modified  : 2022-07-05 11:51:28 
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { AvailabilityPlannerModel } from "src/app/shared/model/availability-planner.model";

/**
 * Availability planner crud state model
 */
export interface AvailabilityPlannerCrudStateModel {
	operationStatus: OperationsEnum;
	operationAvailabilityPlanner: AvailabilityPlannerModel;
}

/**
 * @description Availability planner crud initial state
 */
export const AVAILABILITY_PLANNER_CRUD_INITIAL_STATE: AvailabilityPlannerCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationAvailabilityPlanner: {}
};
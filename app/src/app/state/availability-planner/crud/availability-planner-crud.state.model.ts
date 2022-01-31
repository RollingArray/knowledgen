/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-01-21 20:56:53
 */



import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { AvailabilityPlannerModel } from "src/app/shared/model/availability-planner.model";

/**
 * @description AvailabilityPlanner crud state model
 */
export interface AvailabilityPlannerCrudStateModel {
	operationStatus: OperationsEnum;
	operationAvailabilityPlanner: AvailabilityPlannerModel;
}

/**
 * @description AvailabilityPlanner crud initial state
 */
export const AVAILABILITY_PLANNER_CRUD_INITIAL_STATE: AvailabilityPlannerCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationAvailabilityPlanner: {}
};
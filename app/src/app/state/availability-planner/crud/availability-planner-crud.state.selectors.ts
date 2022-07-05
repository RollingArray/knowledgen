/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:50:57 
 * Last modified  : 2022-07-05 11:50:57 
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { AvailabilityPlannerCrudStateModel } from './availability-planner-crud.state.model';
import { AVAILABILITY_PLANNER_CRUD_FEATURE_KEY } from './availability-planner-crud.state.reducer';

/**
 * @description get operation status
 */
const getOperationStatus = (availabilityPlannerCrudStateModel: AvailabilityPlannerCrudStateModel): OperationsEnum => availabilityPlannerCrudStateModel.operationStatus;

/**
 * @description get operation availabilityPlanner
 */
const getOperationAvailabilityPlanner = (availabilityPlannerCrudStateModel: AvailabilityPlannerCrudStateModel): AvailabilityPlannerModel => availabilityPlannerCrudStateModel.operationAvailabilityPlanner;

/**
 * @description Selector - AvailabilityPlanner crud state
 */
export const selectAvailabilityPlannerCrudState: MemoizedSelector<AvailabilityPlannerCrudStateModel, AvailabilityPlannerCrudStateModel>  = createFeatureSelector<AvailabilityPlannerCrudStateModel>(AVAILABILITY_PLANNER_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<AvailabilityPlannerCrudStateModel, OperationsEnum> = createSelector(
	selectAvailabilityPlannerCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation AvailabilityPlanner
 */
export const selectOperationAvailabilityPlanner: MemoizedSelector<AvailabilityPlannerCrudStateModel, AvailabilityPlannerModel> = createSelector(
	selectAvailabilityPlannerCrudState,
	getOperationAvailabilityPlanner
);

/**
 * @description export availabilityPlanner crud query to access all selectors
 */
export const AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationAvailabilityPlanner
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-21 20:57:21
 */


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';

/**
 * Selects course material id
 * @param availabilityPlannerModel 
 * @returns course material id 
 */
export function selectAvailabilityPlannerId(availabilityPlannerModel: AvailabilityPlannerModel): string
{
	return availabilityPlannerModel.plannerId ? availabilityPlannerModel.plannerId : '';
}

/**
 * @description Course material model
 */
export interface AvailabilityPlannerStateModel extends EntityState<AvailabilityPlannerModel> { }

/**
 * @description Course material adapter
 */
export const availabilityPlannerAdapter: EntityAdapter<AvailabilityPlannerModel> = createEntityAdapter<AvailabilityPlannerModel>({
	selectId: selectAvailabilityPlannerId
});

/**
 * @description Initial course material initial state
 */
export const INITIAL_AVAILABILITY_PLANNER_STATE: AvailabilityPlannerStateModel = availabilityPlannerAdapter.getInitialState();
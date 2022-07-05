/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-05 13:02:23
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AVAILABILITY_PLANNER_CRUD_INITIAL_STATE } from './crud/availability-planner-crud.state.model';
import { availabilityPlannerCrudStateReducer, AVAILABILITY_PLANNER_CRUD_FEATURE_KEY } from './crud/availability-planner-crud.state.reducer';
import { AvailabilityPlannerStateEffects } from './availability-planner.state.effects';
import { INITIAL_AVAILABILITY_PLANNER_STATE } from './view/availability-planner.state.model';
import { AVAILABILITY_PLANNER_FEATURE_KEY, availabilityPlannerStateReducer } from './view/availability-planner.state.reducer';
import { AvailabilityPlannerStateFacade } from './availability-planner.state.facade';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(AVAILABILITY_PLANNER_FEATURE_KEY, availabilityPlannerStateReducer, {
			initialState: INITIAL_AVAILABILITY_PLANNER_STATE
		}),

		StoreModule.forFeature(AVAILABILITY_PLANNER_CRUD_FEATURE_KEY, availabilityPlannerCrudStateReducer, {
			initialState: AVAILABILITY_PLANNER_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([AvailabilityPlannerStateEffects]),
	],
	providers: [
		AvailabilityPlannerStateFacade,
		AvailabilityPlannerStateEffects,
	]
})
export class AvailabilityPlannerStateModule { }

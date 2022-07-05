/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-05 13:01:17
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { AvailabilityPlannerModel } from "src/app/shared/model/availability-planner.model";
import { AVAILABILITY_PLANNER_ACTIONS } from "./availability-planner.state.actions";
import { AvailabilityPlannerStateModel } from "./view/availability-planner.state.model";
import { AVAILABILITY_PLANNER_QUERY_SELECTOR } from "./view/availability-planner.state.selectors";
import { AvailabilityPlannerCrudStateModel } from "./crud/availability-planner-crud.state.model";
import { AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR } from "./crud/availability-planner-crud.state.selectors";
import { Injectable } from "@angular/core";

/**
 * @description Injectable
 */
@Injectable()

export class AvailabilityPlannerStateFacade {

	/**
	 * Creates an instance of availability planner state facade.
	 * @param availabilityPlannerStore 
	 * @param availabilityPlannerCrudStore 
	 */
	constructor(
		private availabilityPlannerStore: Store<AvailabilityPlannerStateModel>,
		private availabilityPlannerCrudStore: Store<AvailabilityPlannerCrudStateModel>
	) { }

	/**
	 * All availability planner by date$ of availability planner state facade
	 */
	public allAvailabilityPlannerByDate$ = (availabilityDate: string) =>  this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAllAvailabilityPlannerByDate(availabilityDate));

	/**
	 * Availability planner has data$ of availability planner state facade
	 */
	public availabilityPlannerHasData$ = (availabilityDate: string) =>  this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityPlannerHasData(availabilityDate));

	/**
	 * Availability planner by availability planner id$ of availability planner state facade
	 */
	public availabilityPlannerByAvailabilityPlannerId$ = (plannerId: string) => this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityPlannerByAvailabilityPlannerId(plannerId));

	/**
	 * Availability match by availability planner id$ of availability planner state facade
	 */
	public availabilityMatchByAvailabilityPlannerId$ = (plannerId: string) => this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityMatchByAvailabilityPlannerId(plannerId));

	/**
	 * Availability planner curd operation status$ of availability planner state facade
	 */
	public availabilityPlannerCurdOperationStatus$ = this.availabilityPlannerCrudStore.select(AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation availability planner$ of availability planner state facade
	 */
	public operationAvailabilityPlanner$ = this.availabilityPlannerCrudStore.select(AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR.selectOperationAvailabilityPlanner);

	/**
	 * Requests availability planner
	 * @param availabilityPlanner 
	 */
	public requestAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	 }

	/**
	 * Adds new availability planner
	 * @param availabilityPlanner 
	 */
	public addNewAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Edits availability planner
	 * @param availabilityPlanner 
	 */
	public editAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_EDIT_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Deletes availability planner
	 * @param availabilityPlanner 
	 */
	public deleteAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_DELETE_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Acts upon availability planner
	 * @param availabilityPlanner 
	 * @param operation 
	 */
	public actUponAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel, operation: OperationsEnum) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.ACT_UPON_AVAILABILITY_PLANNER({payload: availabilityPlanner, operation: operation}));
	}	
}

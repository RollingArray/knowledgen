/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-01-25 17:39:17
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
	 * Creates an instance of user skill state facade.
	 * @param availabilityPlannerStore 
	 * @param availabilityPlannerStore 
	 * @param availabilityPlannerCrudStore 
	 */
	 constructor(
		private availabilityPlannerStore: Store<AvailabilityPlannerStateModel>,
		private availabilityPlannerCrudStore: Store<AvailabilityPlannerCrudStateModel>
	) { }

	/**
	 * All course material model$ of course material model state facade
	 */
	public allAvailabilityPlannerByDate$ = (availabilityDate: string) =>  this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAllAvailabilityPlannerByDate(availabilityDate));

	/**
	 * Course material has data$ of course material model state facade
	 */
	public availabilityPlannerHasData$ = (availabilityDate: string) =>  this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityPlannerHasData(availabilityDate));

	/**
	 * Course material by course material id$ of course material model state facade
	 */
	 public availabilityPlannerByAvailabilityPlannerId$ = (plannerId: string) => this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityPlannerByAvailabilityPlannerId(plannerId));

	 public availabilityMatchByAvailabilityPlannerId$ = (plannerId: string) => this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityMatchByAvailabilityPlannerId(plannerId));

	 //public availabilityMatchPlanner$ = (plannerId: string, matchAvailabilityPlannerIdId: string) => this.availabilityPlannerStore.select(AVAILABILITY_PLANNER_QUERY_SELECTOR.selectAvailabilityMatchPlanner(plannerId, matchAvailabilityPlannerIdId));

	 
	 
	/**
	 * Course material curd operation status$ of course material model state facade
	 */
	public availabilityPlannerCurdOperationStatus$ = this.availabilityPlannerCrudStore.select(AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material$ of course material model state facade
	 */
	public operationAvailabilityPlanner$ = this.availabilityPlannerCrudStore.select(AVAILABILITY_PLANNER_CRUD_QUERY_SELECTOR.selectOperationAvailabilityPlanner);

	/**
	 * Requests course material
	 */
	public requestAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	 }

	/**
	 * Adds new global skill course material
	 * @param availabilityPlanner 
	 */
	public addNewAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Edits global skill course material
	 * @param availabilityPlanner 
	 */
	public editAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_EDIT_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Deletes global skill course material
	 * @param availabilityPlanner 
	 */
	public deleteAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_DELETE_AVAILABILITY_PLANNER({payload: availabilityPlanner}));
	}

	/**
	 * Acts upon course material
	 * @param availabilityPlanner 
	 * @param operation 
	 */
	public actUponAvailabilityPlanner(availabilityPlanner: AvailabilityPlannerModel, operation: OperationsEnum) {
		this.availabilityPlannerStore.dispatch(AVAILABILITY_PLANNER_ACTIONS.ACT_UPON_AVAILABILITY_PLANNER({payload: availabilityPlanner, operation: operation}));
	}	
}

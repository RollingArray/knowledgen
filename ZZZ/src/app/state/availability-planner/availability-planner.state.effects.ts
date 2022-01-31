/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-01-25 17:58:14
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { AvailabilityPlannerService } from "src/app/shared/service/availability-planner.service";
import { AVAILABILITY_PLANNER_ACTIONS } from "./availability-planner.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";


@Injectable()
export class AvailabilityPlannerStateEffects {
	categoriesService: any;
	//rootStateFacade: any;
	categoryService: any;

	/**
	 * Creates an instance of policy state effects.
	 * @param actions$ 
	 * @param localStorageService 
	 * @param privacyPolicyService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private availabilityPlannerService: AvailabilityPlannerService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * @description Api request global skill categories$ of global skill category state effects
	 */
	apiRequestAvailabilityPlanner$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_AVAILABILITY_PLANNER
				),
				mergeMap(action =>

					this.availabilityPlannerService.getAvailabilityPlanner(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success) {
								// store retrieved categories
								return AVAILABILITY_PLANNER_ACTIONS.LOADED_REQUEST_AVAILABILITY_PLANNER({ payload: data.data.data });
							}

							// response fail
							else {
								return AVAILABILITY_PLANNER_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Add new category$ of global skill category state effects
	 */
	addNewAvailabilityPlanner$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER
				),
				mergeMap(action =>
					this.availabilityPlannerService.crudTeacherAvailabilityPlanner(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store newly added skill
								return AVAILABILITY_PLANNER_ACTIONS.STORE_NEWLY_ADDED_AVAILABILITY_PLANNER({ payload: data.resource });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Edit category$ of global skill category state effects
	 */
	editAvailabilityPlanner$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_EDIT_AVAILABILITY_PLANNER
				),
				mergeMap(action =>
					this.availabilityPlannerService.crudTeacherAvailabilityPlanner(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store updated category
								return AVAILABILITY_PLANNER_ACTIONS.STORE_UPDATED_AVAILABILITY_PLANNER({ payload: action.payload });
								//return AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_SUCCESS();
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}
								return AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Delete skill$ of user skill state effects
	 */
	deleteSkill$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.API_REQUEST_DELETE_AVAILABILITY_PLANNER
				),
				mergeMap(action =>
					this.availabilityPlannerService.crudTeacherAvailabilityPlanner(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// remove deleted category from store 
								return AVAILABILITY_PLANNER_ACTIONS.REMOVE_AVAILABILITY_PLANNER_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Complete category add operation$ of global skill category state effects
	 */
	completeAvailabilityPlannerAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.STORE_NEWLY_ADDED_AVAILABILITY_PLANNER
				),
				map(action => AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_ADDED_SUCCESS()),
			),
	);

	/**
	 * @description Complete category update operation$ of global skill category state effects
	 */
	completeAvailabilityPlannerUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.STORE_UPDATED_AVAILABILITY_PLANNER
				),
				map(action => AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_UPDATED_SUCCESS()),
			),
	);

	/**
	 * @description Complete category delete operation$ of global skill category state effects
	 */
	completeAvailabilityPlannerDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.REMOVE_AVAILABILITY_PLANNER_FROM_STORE
				),
				map(action => AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_DELETED_SUCCESS())
			),
	);

	/**
	 * @description Complete new skill curd operation$ of global skill category state effects
	 */
	completeNewSkillCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_ADDED_SUCCESS,
					AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_UPDATED_SUCCESS,
					AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_DELETED_SUCCESS
				),
				map(action => AVAILABILITY_PLANNER_ACTIONS.AVAILABILITY_PLANNER_CRUD_SUCCESS()),
			),
	);
}

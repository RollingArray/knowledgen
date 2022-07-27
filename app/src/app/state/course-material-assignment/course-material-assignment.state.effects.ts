/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:14:32 
 * Last modified  : 2022-07-26 12:02:24
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { COURSE_MATERIAL_ASSIGNMENT_ACTIONS } from "./course-material-assignment.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CourseMaterialAssignmentService } from "src/app/shared/service/course-material-assignment.service";


@Injectable()
export class CourseMaterialAssignmentStateEffects {
	
	/**
	 * Creates an instance of course material assignment state effects.
	 * @param actions$ 
	 * @param courseMaterialAssignmentService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private courseMaterialAssignmentService: CourseMaterialAssignmentService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Add new course material assignment result$ of course material assignment state effects
	 */
	addNewCourseMaterialAssignmentResult$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ASSIGNMENT_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT
				),
				mergeMap(action =>
					this.courseMaterialAssignmentService.assignmentResult(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store newly added object
								return COURSE_MATERIAL_ASSIGNMENT_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_ASSIGNMENT_RESULT({ payload: data.resource });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete course material assignment result add operation$ of course material assignment state effects
	 */
	completeCourseMaterialAssignmentResultAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ASSIGNMENT_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_ASSIGNMENT_RESULT
				),
				map(action => COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete course material assignment result crud success$ of course material assignment state effects
	 */
	completeCourseMaterialAssignmentResultCrudSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_ADDED_SUCCESS,
				),
				map(action => COURSE_MATERIAL_ASSIGNMENT_ACTIONS.COURSE_MATERIAL_ASSIGNMENT_RESULT_CRUD_SUCCESS()),
			),
	);
}

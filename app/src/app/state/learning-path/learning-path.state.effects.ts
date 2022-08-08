/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-08-08 21:04:45
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { LearningPathService } from "src/app/shared/service/learning-path.service";
import { LEARNING_PATH_ACTIONS } from "./learning-path.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";


@Injectable()
export class LearningPathStateEffects {
	/**
	 * Categories service of course material state effects
	 */
	categoriesService: any;
	
	/**
	 * Category service of course material state effects
	 */
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
		private learningPathService: LearningPathService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * Api request course material$ of course material state effects
	 */
	apiRequestLearningPath$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.API_REQUEST_LEARNING_PATH
				),
				mergeMap(action =>

					this.learningPathService.getLearningPath().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success)
							{
								// store retrieved categories
								return LEARNING_PATH_ACTIONS.LOADED_REQUEST_LEARNING_PATH({ payload: data.data.data });
							}

							// response fail
							else {
								return LEARNING_PATH_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new course material$ of course material state effects
	 */
	addNewLearningPath$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.API_REQUEST_ADD_NEW_LEARNING_PATH
				),
				mergeMap(action =>
					this.learningPathService.crudLearningPath(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// build new skill object
								const courseMaterialId = data.resource.courseMaterialId;
								const newLearningPath = {
									...action.payload,
									courseMaterialId
								};

								// store newly added skill
								return LEARNING_PATH_ACTIONS.LEARNING_PATH_ADDED_SUCCESS();
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return LEARNING_PATH_ACTIONS.LEARNING_PATH_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete skill$ of course material state effects
	 */
	deleteSkill$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.API_REQUEST_DELETE_LEARNING_PATH
				),
				mergeMap(action =>
					this.learningPathService.crudLearningPath(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// remove deleted category from store 
								return LEARNING_PATH_ACTIONS.REMOVE_LEARNING_PATH_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return LEARNING_PATH_ACTIONS.LEARNING_PATH_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete course material add operation$ of course material state effects
	 */
	completeLearningPathAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.STORE_NEWLY_ADDED_LEARNING_PATH
				),
				map(action => LEARNING_PATH_ACTIONS.LEARNING_PATH_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete course material delete operation$ of course material state effects
	 */
	completeLearningPathDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.REMOVE_LEARNING_PATH_FROM_STORE
				),
				map(action => LEARNING_PATH_ACTIONS.LEARNING_PATH_DELETED_SUCCESS())
			),
	);

	/**
	 * Complete course martial curd operation$ of course material state effects
	 */
	completeLearningPathCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					LEARNING_PATH_ACTIONS.LEARNING_PATH_ADDED_SUCCESS,
					LEARNING_PATH_ACTIONS.LEARNING_PATH_DELETED_SUCCESS
				),
				map(action => LEARNING_PATH_ACTIONS.LEARNING_PATH_CRUD_SUCCESS()),
			),
	);
}

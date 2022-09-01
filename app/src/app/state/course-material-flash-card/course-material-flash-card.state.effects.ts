/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state effect
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 18:15:04
 */



import { Injectable } from "@angular/core";
import { EMPTY, pipe } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { COURSE_MATERIAL_FLASH_CARD_ACTIONS } from "./course-material-flash-card.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CourseMaterialFlashCardService } from "src/app/shared/service/course-material-flash-card.service";


@Injectable()
export class CourseMaterialFlashCardStateEffects {
	
	/**
	 * Creates an instance of course material flash card state effects.
	 * @param actions$ 
	 * @param courseMaterialFlashCardService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private courseMaterialFlashCardService: CourseMaterialFlashCardService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Api request course material flash card$ of course material flash card state effects
	 */
	apiRequestCourseMaterialFlashCard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_COURSE_MATERIAL_FLASH_CARD
				),
				mergeMap(action =>

					this.courseMaterialFlashCardService.getCourseMaterialFlashCard(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {
								// store retrieved categories
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD({ payload: data.data });
							}

							// response fail
							else {
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new course material flash card$ of course material flash card state effects
	 */
	addNewCourseMaterialFlashCard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD
				),
				mergeMap(action =>
					this.courseMaterialFlashCardService.crudCourseMaterialFlashCard(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store newly added skill
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD({ payload: data.resource });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Edit course material flash card$ of course material flash card state effects
	 */
	editCourseMaterialFlashCard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD
				),
				mergeMap(action =>
					this.courseMaterialFlashCardService.crudCourseMaterialFlashCard(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store updated category
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete course material flash card$ of course material flash card state effects
	 */
	deleteCourseMaterialFlashCard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD
				),
				mergeMap(action =>
					this.courseMaterialFlashCardService.crudCourseMaterialFlashCard(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// remove deleted category from store 
								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete course material flash card add operation$ of course material flash card state effects
	 */
	completeCourseMaterialFlashCardAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD
				),
				map(action => COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete course material flash card update operation$ of course material flash card state effects
	 */
	completeCourseMaterialFlashCardUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD
				),
				map(action => COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete course material flash card delete operation$ of course material flash card state effects
	 */
	completeCourseMaterialFlashCardDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE
				),
				map(action => COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS())
			),
	);

	/**
	 * Complete new skill curd operation$ of course material flash card state effects
	 */
	completeNewSkillCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS,
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS,
					COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS()),
			),
	);
}

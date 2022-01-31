/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-01-26 18:35:53
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { CourseMaterialService } from "src/app/shared/service/course-material.service";
import { COURSE_MATERIAL_ACTIONS } from "./course-material.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";


@Injectable()
export class CourseMaterialStateEffects {
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
		private courseMaterialService: CourseMaterialService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * @description Api request global skill categories$ of global skill category state effects
	 */
	apiRequestCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_COURSE_MATERIAL
				),
				mergeMap(action =>

					this.courseMaterialService.getCourseMaterial().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {
								// store retrieved categories
								return COURSE_MATERIAL_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL({ payload: data.data });
							}


							// response fail
							else {
								return COURSE_MATERIAL_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	apiRequestRecommendedCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_RECOMMENDED_COURSE_MATERIAL
				),
				mergeMap(action =>

					this.courseMaterialService.getRecommendedCourseMaterial().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success) {
								// store retrieved categories
								return COURSE_MATERIAL_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL({ payload: data.data.data });
							}


							// response fail
							else {
								return COURSE_MATERIAL_ACTIONS.NOOP();
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
	addNewCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// build new skill object
								const courseMaterialId = data.resource.courseMaterialId;
								const newCourseMaterial = {
									...action.payload,
									courseMaterialId
								};

								// store newly added skill
								return COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL({ payload: newCourseMaterial });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_FAIL();
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
	editCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store updated category
								return COURSE_MATERIAL_ACTIONS.STORE_UPDATED_COURSE_MATERIAL({ payload: action.payload });
								//return COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_SUCCESS();
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}
								return COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_FAIL();
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
					COURSE_MATERIAL_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// remove deleted category from store 
								return COURSE_MATERIAL_ACTIONS.REMOVE_COURSE_MATERIAL_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_FAIL();
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
	completeCourseMaterialAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL
				),
				map(action => COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_ADDED_SUCCESS()),
			),
	);

	/**
	 * @description Complete category update operation$ of global skill category state effects
	 */
	completeCourseMaterialUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.STORE_UPDATED_COURSE_MATERIAL
				),
				map(action => COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_UPDATED_SUCCESS()),
			),
	);

	/**
	 * @description Complete category delete operation$ of global skill category state effects
	 */
	completeCourseMaterialDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.REMOVE_COURSE_MATERIAL_FROM_STORE
				),
				map(action => COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_DELETED_SUCCESS())
			),
	);

	/**
	 * @description Complete new skill curd operation$ of global skill category state effects
	 */
	completeNewSkillCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_ADDED_SUCCESS,
					COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_UPDATED_SUCCESS,
					COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_ACTIONS.COURSE_MATERIAL_CRUD_SUCCESS()),
			),
	);
}

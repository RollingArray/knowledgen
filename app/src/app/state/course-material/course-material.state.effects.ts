/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-09-20 15:10:04
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { CourseMaterialService } from "src/app/shared/service/course-material.service";
import { COURSE_MATERIAL_ACTIONS } from "./course-material.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CoreSubjectAreaStateFacade } from "../core-subject-area/core-subject-area.state.facade";
import { CORE_SUBJECT_AREA_ACTIONS } from "../core-subject-area/core-subject-area.state.actions";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";


@Injectable()
export class CourseMaterialStateEffects {
	/**
	 * Categories service of course material state effects
	 */
	categoriesService: any;
	
	/**
	 * Category service of course material state effects
	 */
	categoryService: any;

	/**
	 * Creates an instance of course material state effects.
	 * @param actions$ 
	 * @param courseMaterialService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private courseMaterialService: CourseMaterialService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade,
		private coreSubjectAreaStateFacade: CoreSubjectAreaStateFacade
	) { }


	/**
	 * Api request course material$ of course material state effects
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
							if (data.success)
							{
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

	/**
	 * Api request recommended course material$ of course material state effects
	 */
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
	 * Add new course material$ of course material state effects
	 */
	addNewCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success) {
								
								// find and add the subject area if it does not exist
								this.findAndAddNewSubjectArea(data.resource);

								// store newly added skill
								return COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL({ payload: data.resource });
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
	 * Edit course material$ of course material state effects
	 */
	editCourseMaterial$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success) {

								// find and add the subject area if it does not exist
								this.findAndAddNewSubjectArea(data.resource);
								
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
	 * Delete skill$ of course material state effects
	 */
	deleteSkill$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL
				),
				mergeMap(action =>
					this.courseMaterialService.crudCourseMaterial(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopModalLoading();

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
	 * Complete course material add operation$ of course material state effects
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
	 * Complete course material update operation$ of course material state effects
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
	 * Complete course material delete operation$ of course material state effects
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
	 * Complete course martial curd operation$ of course material state effects
	 */
	completeCourseMartialCurdOperation$ = createEffect(
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

	/**
	 * Finds and add new subject area
	 * @param data 
	 */
	private findAndAddNewSubjectArea(data: CourseMaterialModel)
	{
		const ifExist$ = this.coreSubjectAreaStateFacade.ifCoreSubjectAreaExistByCoreSubjectAreaId$(data.subjectAreaId);
		
		ifExist$.subscribe(hasData =>
		{
			
			if (!hasData)
			{
				const newCoreSubjectArea: CoreSubjectAreaModel = {
					subjectAreaId: data.subjectAreaId,
					subjectAreaName: data.subjectAreaName
				};
				this.coreSubjectAreaStateFacade.addNewCoreSubjectArea(newCoreSubjectArea);
			}
		});
	}
}

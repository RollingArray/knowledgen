/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state effect
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 22:10:57
 */



import { Injectable } from "@angular/core";
import { EMPTY, pipe } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { COURSE_MATERIAL_QUIZ_ACTIONS } from "./course-material-quiz.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CourseMaterialQuizService } from "src/app/shared/service/course-material-quiz.service";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { CoreSubjectAreaTagStateFacade } from "../core-subject-area-tag/core-subject-area-tag.state.facade";
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";


@Injectable()
export class CourseMaterialQuizStateEffects {
	
	/**
	 * Creates an instance of course material quiz state effects.
	 * @param actions$ 
	 * @param courseMaterialQuizService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private courseMaterialQuizService: CourseMaterialQuizService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade,
		private coreSubjectAreaTagStateFacade: CoreSubjectAreaTagStateFacade
	) { }

	/**
	 * Api request course material quiz$ of course material quiz state effects
	 */
	apiRequestCourseMaterialQuiz$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_COURSE_MATERIAL_QUIZ
				),
				mergeMap(action =>

					this.courseMaterialQuizService.getCourseMaterialQuiz(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success) {
								// store retrieved categories
								return COURSE_MATERIAL_QUIZ_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL_QUIZ({ payload: data.data.data });
							}

							// response fail
							else {
								return COURSE_MATERIAL_QUIZ_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new course material quiz$ of course material quiz state effects
	 */
	addNewCourseMaterialQuiz$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ
				),
				mergeMap(action =>
					this.courseMaterialQuizService.crudCourseMaterialQuiz(action.payload).pipe(
						map((data) => {
							// if success response
							if (data.success) {

								// find and add the subject area tqg if it does not exist
								this.findAndAddNewSubjectAreaTag(data.resource);
								
								// store newly added skill
								return COURSE_MATERIAL_QUIZ_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ({ payload: data.resource });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Edit course material quiz$ of course material quiz state effects
	 */
	editCourseMaterialQuiz$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ
				),
				mergeMap(action =>
					this.courseMaterialQuizService.crudCourseMaterialQuiz(action.payload).pipe(
						map((data) => {
							// if success response
							if (data.success) {

								// find and add the subject area tqg if it does not exist
								this.findAndAddNewSubjectAreaTag(data.resource);
								
								// store updated category
								return COURSE_MATERIAL_QUIZ_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_QUIZ({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}
								return COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete course material quiz$ of course material quiz state effects
	 */
	deleteCourseMaterialQuiz$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ
				),
				mergeMap(action =>
					this.courseMaterialQuizService.crudCourseMaterialQuiz(action.payload).pipe(
						map((data) => {
							// if success response
							if (data.success) {

								// remove deleted category from store 
								return COURSE_MATERIAL_QUIZ_ACTIONS.REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete course material quiz add operation$ of course material quiz state effects
	 */
	completeCourseMaterialQuizAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ
				),
				map(action => COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete course material quiz update operation$ of course material quiz state effects
	 */
	completeCourseMaterialQuizUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_QUIZ
				),
				map(action => COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete course material quiz delete operation$ of course material quiz state effects
	 */
	completeCourseMaterialQuizDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE
				),
				map(action => COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_DELETED_SUCCESS())
			),
	);

	/**
	 * Complete new skill curd operation$ of course material quiz state effects
	 */
	completeNewSkillCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_ADDED_SUCCESS,
					COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS,
					COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_SUCCESS()),
			),
	);

	/**
	 * Finds and add new subject area tag
	 * @param data 
	 */
	private findAndAddNewSubjectAreaTag(data: CourseMaterialQuizModel)
	 {
		 const ifExist$ = this.coreSubjectAreaTagStateFacade.ifCoreSubjectAreaTagExistByCoreSubjectAreaTagId$(data.subjectAreaTagId);
		 
		 ifExist$.subscribe(hasData =>
		 {
			 
			 if (!hasData)
			 {
				 const model: CoreSubjectAreaTagModel = {
					 subjectAreaId: data.subjectAreaId,
					 subjectAreaTagId: data.subjectAreaTagId,
					 subjectAreaTagName: data.subjectAreaTagName
				 };
				 this.coreSubjectAreaTagStateFacade.addNewCoreSubjectAreaTag(model);
			 }
		 });
	 }
}

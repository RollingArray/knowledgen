/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-09-22 13:35:23
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";
import { COURSE_MATERIAL_QUIZ_ACTIONS } from "./course-material-quiz.state.actions";
import { CourseMaterialQuizStateModel } from "./view/course-material-quiz.state.model";
import { COURSE_MATERIAL_QUIZ_QUERY_SELECTOR } from "./view/course-material-quiz.state.selectors";
import { CourseMaterialQuizCrudStateModel } from "./crud/course-material-quiz-crud.state.model";
import { COURSE_MATERIAL_QUIZ_CRUD_QUERY_SELECTOR } from "./crud/course-material-quiz-crud.state.selectors";
import { Injectable } from "@angular/core";

/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialQuizStateFacade {

	/**
	 * Creates an instance of availability planner state facade.
	 * @param courseMaterialQuizStore 
	 * @param courseMaterialQuizCrudStore 
	 */
	constructor(
		private courseMaterialQuizStore: Store<CourseMaterialQuizStateModel>,
		private courseMaterialQuizCrudStore: Store<CourseMaterialQuizCrudStateModel>
	) { }

	/**
	 * All course material quiz by article id$ of course material quiz state facade
	 */
	public allCourseMaterialQuizByArticleId$ = (articleId: string, ifRandomizeQuizQuestion: boolean) =>  this.courseMaterialQuizStore.select(COURSE_MATERIAL_QUIZ_QUERY_SELECTOR.selectAllCourseMaterialQuizByArticleId(articleId, ifRandomizeQuizQuestion));

	/**
	 * Course material article has quiz data$ of course material quiz state facade
	 */
	public courseMaterialArticleHasQuizData$ = (articleId: string) =>  this.courseMaterialQuizStore.select(COURSE_MATERIAL_QUIZ_QUERY_SELECTOR.selectCourseMaterialArticleHasQuiz(articleId));

	/**
	 * Course material quiz by question id$ of course material quiz state facade
	 */
	public courseMaterialQuizByQuestionId$ = (questionId: string) => this.courseMaterialQuizStore.select(COURSE_MATERIAL_QUIZ_QUERY_SELECTOR.selectCourseMaterialQuizByQuestionId(questionId));

	/**
	 * Course material quiz curd operation status$ of course material quiz state facade
	 */
	public courseMaterialQuizCurdOperationStatus$ = this.courseMaterialQuizCrudStore.select(COURSE_MATERIAL_QUIZ_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material quiz$ of course material quiz state facade
	 */
	public operationCourseMaterialQuiz$ = this.courseMaterialQuizCrudStore.select(COURSE_MATERIAL_QUIZ_CRUD_QUERY_SELECTOR.selectOperationCourseMaterialQuiz);

	/**
	 * Requests course material quiz
	 * @param courseMaterialQuiz 
	 */
	public requestCourseMaterialQuiz(courseMaterialQuiz: CourseMaterialQuizModel) {
		this.courseMaterialQuizStore.dispatch(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_COURSE_MATERIAL_QUIZ({payload: courseMaterialQuiz}));
	 }

	/**
	 * Adds new course material quiz
	 * @param courseMaterialQuiz 
	 */
	public addNewCourseMaterialQuiz(courseMaterialQuiz: CourseMaterialQuizModel) {
		this.courseMaterialQuizStore.dispatch(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ({payload: courseMaterialQuiz}));
	}

	/**
	 * Edits course material quiz
	 * @param courseMaterialQuiz 
	 */
	public editCourseMaterialQuiz(courseMaterialQuiz: CourseMaterialQuizModel) {
		this.courseMaterialQuizStore.dispatch(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ({payload: courseMaterialQuiz}));
	}

	/**
	 * Deletes course material quiz
	 * @param courseMaterialQuiz 
	 */
	public deleteCourseMaterialQuiz(courseMaterialQuiz: CourseMaterialQuizModel) {
		this.courseMaterialQuizStore.dispatch(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ({payload: courseMaterialQuiz}));
	}

	/**
	 * Acts upon course material quiz
	 * @param courseMaterialQuiz 
	 * @param operation 
	 */
	public actUponCourseMaterialQuiz(courseMaterialQuiz: CourseMaterialQuizModel, operation: OperationsEnum) {
		this.courseMaterialQuizStore.dispatch(COURSE_MATERIAL_QUIZ_ACTIONS.ACT_UPON_COURSE_MATERIAL_QUIZ({payload: courseMaterialQuiz, operation: operation}));
	}	
}

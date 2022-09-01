/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:53
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { CourseMaterialFlashCardModel } from "src/app/shared/model/course-material-flash-card.model";
import { COURSE_MATERIAL_FLASH_CARD_ACTIONS } from "./course-material-flash-card.state.actions";
import { CourseMaterialFlashCardStateModel } from "./view/course-material-flash-card.state.model";
import { COURSE_MATERIAL_FLASH_CARD_QUERY_SELECTOR } from "./view/course-material-flash-card.state.selectors";
import { CourseMaterialFlashCardCrudStateModel } from "./crud/course-material-flash-card-crud.state.model";
import { COURSE_MATERIAL_FLASH_CARD_CRUD_QUERY_SELECTOR } from "./crud/course-material-flash-card-crud.state.selectors";
import { Injectable } from "@angular/core";

/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialFlashCardStateFacade {

	/**
	 * Creates an instance of availability planner state facade.
	 * @param courseMaterialFlashCardStore 
	 * @param courseMaterialFlashCardCrudStore 
	 */
	constructor(
		private courseMaterialFlashCardStore: Store<CourseMaterialFlashCardStateModel>,
		private courseMaterialFlashCardCrudStore: Store<CourseMaterialFlashCardCrudStateModel>
	) { }

	/**
	 * All course material flash card by article id$ of course material flash card state facade
	 */
	public allCourseMaterialFlashCardByArticleId$ = (articleId: string) =>  this.courseMaterialFlashCardStore.select(COURSE_MATERIAL_FLASH_CARD_QUERY_SELECTOR.selectAllCourseMaterialFlashCardByArticleId(articleId));

	/**
	 * Course material article has quiz data$ of course material flash card state facade
	 */
	public courseMaterialArticleHasQuizData$ = (articleId: string) =>  this.courseMaterialFlashCardStore.select(COURSE_MATERIAL_FLASH_CARD_QUERY_SELECTOR.selectCourseMaterialArticleHasQuiz(articleId));

	/**
	 * Course material flash card by question id$ of course material flash card state facade
	 */
	public courseMaterialFlashCardByQuestionId$ = (questionId: string) => this.courseMaterialFlashCardStore.select(COURSE_MATERIAL_FLASH_CARD_QUERY_SELECTOR.selectCourseMaterialFlashCardByQuestionId(questionId));

	/**
	 * Course material flash card curd operation status$ of course material flash card state facade
	 */
	public courseMaterialFlashCardCurdOperationStatus$ = this.courseMaterialFlashCardCrudStore.select(COURSE_MATERIAL_FLASH_CARD_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material flash card$ of course material flash card state facade
	 */
	public operationCourseMaterialFlashCard$ = this.courseMaterialFlashCardCrudStore.select(COURSE_MATERIAL_FLASH_CARD_CRUD_QUERY_SELECTOR.selectOperationCourseMaterialFlashCard);

	/**
	 * Requests course material flash card
	 * @param courseMaterialFlashCard 
	 */
	public requestCourseMaterialFlashCard(courseMaterialFlashCard: CourseMaterialFlashCardModel) {
		this.courseMaterialFlashCardStore.dispatch(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_COURSE_MATERIAL_FLASH_CARD({payload: courseMaterialFlashCard}));
	 }

	/**
	 * Adds new course material flash card
	 * @param courseMaterialFlashCard 
	 */
	public addNewCourseMaterialFlashCard(courseMaterialFlashCard: CourseMaterialFlashCardModel) {
		this.courseMaterialFlashCardStore.dispatch(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD({payload: courseMaterialFlashCard}));
	}

	/**
	 * Edits course material flash card
	 * @param courseMaterialFlashCard 
	 */
	public editCourseMaterialFlashCard(courseMaterialFlashCard: CourseMaterialFlashCardModel) {
		this.courseMaterialFlashCardStore.dispatch(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD({payload: courseMaterialFlashCard}));
	}

	/**
	 * Deletes course material flash card
	 * @param courseMaterialFlashCard 
	 */
	public deleteCourseMaterialFlashCard(courseMaterialFlashCard: CourseMaterialFlashCardModel) {
		this.courseMaterialFlashCardStore.dispatch(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD({payload: courseMaterialFlashCard}));
	}

	/**
	 * Acts upon course material flash card
	 * @param courseMaterialFlashCard 
	 * @param operation 
	 */
	public actUponCourseMaterialFlashCard(courseMaterialFlashCard: CourseMaterialFlashCardModel, operation: OperationsEnum) {
		this.courseMaterialFlashCardStore.dispatch(COURSE_MATERIAL_FLASH_CARD_ACTIONS.ACT_UPON_COURSE_MATERIAL_FLASH_CARD({payload: courseMaterialFlashCard, operation: operation}));
	}	
}

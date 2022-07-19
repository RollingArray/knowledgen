/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:08:38
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { COURSE_MATERIAL_QUIZ_ACTIONS } from '../course-material-quiz.state.actions';
import { CourseMaterialQuizCrudStateModel, COURSE_MATERIAL_QUIZ_CRUD_INITIAL_STATE } from './course-material-quiz-crud.state.model';

/**
 * @description Course material quiz feature key
 */
export const COURSE_MATERIAL_QUIZ_CRUD_FEATURE_KEY = 'courseMaterialQuizCrudState';

/**
 * @description create Course material quiz reducer
 */
const reducer = createReducer(

	/**
	 * @description Course material quiz reducer initial state
	 */
	COURSE_MATERIAL_QUIZ_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.ACT_UPON_COURSE_MATERIAL_QUIZ, (state, action) => ({
		...state,
		operationCourseMaterialQuiz: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - course material quiz added success
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material quiz update success
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material quiz delete success
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material quiz crud success
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material quiz crud fail
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.COURSE_MATERIAL_QUIZ_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);

/**
 * Courses material quiz crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function courseMaterialQuizCrudStateReducer(state: CourseMaterialQuizCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
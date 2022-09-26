/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 21:58:22
 */


import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_QUIZ_ACTIONS } from '../course-material-quiz.state.actions';
import { INITIAL_COURSE_MATERIAL_QUIZ_STATE, courseMaterialQuizAdapter, CourseMaterialQuizStateModel } from './course-material-quiz.state.model';

/**
 * @description Course material quiz feature key
 */
export const COURSE_MATERIAL_QUIZ_FEATURE_KEY = 'courseMaterialQuizState';

/**
 * @description Course material quiz reducer
 */
const reducer = createReducer(

	/**
	 * @description Course material quiz reducer initial state
	 */
	 INITIAL_COURSE_MATERIAL_QUIZ_STATE,

	/**
	 * @description Reducer for action - Api Request Course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.API_REQUEST_COURSE_MATERIAL_QUIZ, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL_QUIZ, (state, action) => (

		courseMaterialQuizAdapter.setMany(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store newly added course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ, (state, action) => (
		courseMaterialQuizAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store updated course material quiz
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_QUIZ, (state, action) => (
		courseMaterialQuizAdapter.updateOne({
			id: action.payload.questionId ? action.payload.questionId : '',
			changes: {
				subjectAreaId: action.payload.subjectAreaId,
				subjectAreaTagId: action.payload.subjectAreaTagId,
				subjectAreaTagName: action.payload.subjectAreaTagName,
				question: action.payload.question,
				options: action.payload.options
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove course material quiz from store
	 */
	on(COURSE_MATERIAL_QUIZ_ACTIONS.REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE, (state, action) => (
		courseMaterialQuizAdapter.removeOne(
			action.payload.questionId ? action.payload.questionId : '', 
			state
		)
	)),

);


/**
 * Courses material quiz state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function courseMaterialQuizStateReducer(state: CourseMaterialQuizStateModel | undefined, action: Action) {
	return reducer(state, action);
}
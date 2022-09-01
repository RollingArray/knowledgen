/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:28
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { COURSE_MATERIAL_FLASH_CARD_ACTIONS } from '../course-material-flash-card.state.actions';
import { CourseMaterialFlashCardCrudStateModel, COURSE_MATERIAL_FLASH_CARD_CRUD_INITIAL_STATE } from './course-material-flash-card-crud.state.model';

/**
 * @description Course material flash card feature key
 */
export const COURSE_MATERIAL_FLASH_CARD_CRUD_FEATURE_KEY = 'courseMaterialFlashCardCrudState';

/**
 * @description create Course material flash card reducer
 */
const reducer = createReducer(

	/**
	 * @description Course material flash card reducer initial state
	 */
	COURSE_MATERIAL_FLASH_CARD_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.ACT_UPON_COURSE_MATERIAL_FLASH_CARD, (state, action) => ({
		...state,
		operationCourseMaterialFlashCard: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request edit course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - course material flash card added success
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material flash card update success
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material flash card delete success
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material flash card crud success
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - course material flash card crud fail
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL, (state, action) => ({
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
export function courseMaterialFlashCardCrudStateReducer(state: CourseMaterialFlashCardCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
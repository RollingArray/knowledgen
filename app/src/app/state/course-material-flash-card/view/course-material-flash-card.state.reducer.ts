/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-26 09:47:01
 */


import { createReducer, Action, on, State } from '@ngrx/store';
import { COURSE_MATERIAL_FLASH_CARD_ACTIONS } from '../course-material-flash-card.state.actions';
import { INITIAL_COURSE_MATERIAL_FLASH_CARD_STATE, courseMaterialFlashCardAdapter, CourseMaterialFlashCardStateModel } from './course-material-flash-card.state.model';

/**
 * @description Course material flash card feature key
 */
export const COURSE_MATERIAL_FLASH_CARD_FEATURE_KEY = 'courseMaterialFlashCardState';

/**
 * @description Course material flash card reducer
 */
const reducer = createReducer(

	/**
	 * @description Course material flash card reducer initial state
	 */
	 INITIAL_COURSE_MATERIAL_FLASH_CARD_STATE,

	/**
	 * @description Reducer for action - Api Request Course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.API_REQUEST_COURSE_MATERIAL_FLASH_CARD, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD, (state, action) => (

		courseMaterialFlashCardAdapter.setMany(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store newly added course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD, (state, action) => (
		courseMaterialFlashCardAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store updated course material flash card
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD, (state, action) => (
		courseMaterialFlashCardAdapter.updateOne({
			id: action.payload.cardId ? action.payload.cardId : '',
			changes: {
				frontMediaType: action.payload.frontMediaType,
				frontMedia: action.payload.frontMedia,
				frontContent: action.payload.frontContent,
				backMediaType: action.payload.backMediaType,
				backMedia: action.payload.backMedia,
				backContent: action.payload.backContent,
				backContentMore: action.payload.backContentMore
			}
		}, state)
	)),

	/**
	 * @description Reducer for action - Remove course material flash card from store
	 */
	on(COURSE_MATERIAL_FLASH_CARD_ACTIONS.REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE, (state, action) => (
		courseMaterialFlashCardAdapter.removeOne(
			action.payload.cardId ? action.payload.cardId : '', 
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
export function courseMaterialFlashCardStateReducer(state: CourseMaterialFlashCardStateModel | undefined, action: Action) {
	return reducer(state, action);
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Menu select state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:13 
 * Last modified  : 2022-07-18 22:18:12
 */



import { createReducer, Action, on } from '@ngrx/store';
import { INITIAL_MENU_SELECT_STATE, MenuSelectStateModel } from './menu-select.state.model';
import { COURSE_MATERIAL_MENU_ACTIONS } from '../course-material-menu.state.actions';
import { CourseMaterialTypeIdEnum } from 'src/app/shared/enum/course-material-type-id.enum';
import { MenuTypeEnum } from 'src/app/shared/enum/menu-type.enum';

/**
 * @description Menu Select state feature key
 */
export const MENU_SELECT_FEATURE_KEY = 'menuSelectState';

/**
 * @description Menu Select state Reducer
 */
const reducer = createReducer(

	/**
	 * @description Menu Select state initial state
	 */
	INITIAL_MENU_SELECT_STATE,

	/**
	 * Reducer for action - Store selected menu article
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.STORE_SELECTED_MENU, (state, action) => ({
		...state,
		articleId: action.payload.articleId,
		courseMaterialId: action.payload.courseMaterialId,
		menuType: action.payload.menuType,
		courseMaterialType: action.payload.courseMaterialType
	})),

	/**
	 * @description Reducer for action - Remove value From Store
	 */
	on(COURSE_MATERIAL_MENU_ACTIONS.REMOVE_SELECTED_MENU, (state, action) => ({
		...state,
		articleId: '',
		courseMaterialId: '',
		menuType: MenuTypeEnum.PARENT_MENU,
		courseMaterialType: CourseMaterialTypeIdEnum.TD
	})),
);

/**
 * Menus select state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function menuSelectStateReducer(state: MenuSelectStateModel | undefined, action: Action) {
	return reducer(state, action);
}
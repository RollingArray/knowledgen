/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary MenuSelect state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:39 
 * Last modified  : 2022-07-05 19:40:11
 */



import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuSelectModel } from 'src/app/shared/model/menu-select.model';
import { MenuSelectStateModel } from './menu-select.state.model';
import { MENU_SELECT_FEATURE_KEY } from './menu-select.state.reducer';

/**
 * @description Selector - Menu Select state
 */
const selectMenuSelectState: MemoizedSelector<MenuSelectStateModel, MenuSelectStateModel> = createFeatureSelector<MenuSelectStateModel>(MENU_SELECT_FEATURE_KEY);

/**
 * @description Selector - Select Menu Article
 */
const selectMenuArticle: MemoizedSelector<MenuSelectStateModel, MenuSelectModel> = createSelector(
	selectMenuSelectState,
	(menuSelectStateModel: MenuSelectStateModel): MenuSelectModel =>
	{
		return menuSelectStateModel
	}
);

/**
 * export Menu select state query to access all selectors
 */
export const MENU_SELECT_QUERY_SELECTOR = {
	selectMenuArticle
};
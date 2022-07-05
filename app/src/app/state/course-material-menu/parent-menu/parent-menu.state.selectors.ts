/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:26:27 
 * Last modified  : 2022-07-05 16:31:40
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { parentMenuAdapter, ParentMenuStateModel } from './parent-menu.state.model';
import { PARENT_MENU_FEATURE_KEY } from './parent-menu.state.reducer';


/**
 * @description Selectors - Parent menu adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = parentMenuAdapter.getSelectors();

/**
 * @description  Selectors - Parent menu State
 */
export const selectParentMenuState: MemoizedSelector<ParentMenuStateModel, ParentMenuStateModel> = createFeatureSelector<ParentMenuStateModel>(PARENT_MENU_FEATURE_KEY);

/**
 * @description Selectors - All Parent menus
 */
export const selectAllParentMenu = createSelector(
	selectParentMenuState,
	selectAll,
);

/**
 * @description Selectors - All Parent menu Ids
 */
export const selectAllParentMenuIds = createSelector(
	selectParentMenuState,
	selectIds,
);

/**
 * @description Selectors - Parent menu total number
 */
export const selectParentMenuTotalNumber = createSelector(
	selectParentMenuState,
	selectTotal,
);

/**
 * @description Selectors - Parent menu has parentMenu
 */
export const selectParentMenuHasData = createSelector(
	selectEntities,
	selectParentMenuTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Parent menu by parent menu id
 */
const selectParentMenuByArticleId = (parentArticleId: string) => 
  createSelector(selectParentMenuState, (state) => state[parentArticleId]);

export const selectParentMenuByMaterialId = (courseMaterialIdId: string) => createSelector(
	selectParentMenuState,
	(entity) =>
	{
		let parentMenus: ParentMenuModel[] = [];
		const parentMenuIds = entity.ids;
		parentMenuIds.map(eachId =>
		{
			const eachParentMenu = entity.entities[eachId];
			if (eachParentMenu.courseMaterialId === courseMaterialIdId)
			{
				parentMenus = [
					...parentMenus,
					eachParentMenu
				]
			}
		})
		return parentMenus;
	}
);

/**
 * @description Selectors - Select first parent menu id
 */
export const selectFirstParentMenuId = createSelector(
	selectParentMenuState,
	(entity) =>
	{
		return entity.ids[0];
	}
);

/**
 * @description export parent menu query to access all selectors
 */
export const PARENT_MENU_QUERY_SELECTOR = {
	selectAllParentMenu,
	selectAllParentMenuIds,
	selectParentMenuTotalNumber,
	selectParentMenuHasData,
	selectParentMenuByArticleId,
	selectParentMenuByMaterialId,
	selectFirstParentMenuId
};

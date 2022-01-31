/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-25 18:15:55
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
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = parentMenuAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
export const selectParentMenuState: MemoizedSelector<ParentMenuStateModel, ParentMenuStateModel> = createFeatureSelector<ParentMenuStateModel>(PARENT_MENU_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
export const selectAllParentMenu = createSelector(
	selectParentMenuState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
export const selectAllParentMenuIds = createSelector(
	selectParentMenuState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
export const selectParentMenuTotalNumber = createSelector(
	selectParentMenuState,
	selectTotal,
);

/**
 * @description Selectors - Course material has parentMenu
 */
export const selectParentMenuHasData = createSelector(
	selectEntities,
	selectParentMenuTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material by parentMenu id
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

export const selectFirstParentMenuId = createSelector(
	selectParentMenuState,
	(entity) =>
	{
		return entity.ids[0];
	}
);



/**
 * @description export User skill categories query to access all selectors
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

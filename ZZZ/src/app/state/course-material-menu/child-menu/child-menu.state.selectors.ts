/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-25 18:13:39
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { childMenuAdapter, ChildMenuStateModel } from './child-menu.state.model';
import { CHILD_MENU_FEATURE_KEY } from './child-menu.state.reducer';


/**
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = childMenuAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
export const selectChildMenuState: MemoizedSelector<ChildMenuStateModel, ChildMenuStateModel> = createFeatureSelector<ChildMenuStateModel>(CHILD_MENU_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
export const selectAllChildMenu = createSelector(
	selectChildMenuState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
export const selectAllChildMenuIds = createSelector(
	selectChildMenuState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
export const selectChildMenuTotalNumber = createSelector(
	selectChildMenuState,
	selectTotal,
);

/**
 * @description Selectors - Course material has childMenu
 */
export const selectChildMenuHasData = createSelector(
	selectEntities,
	selectChildMenuTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material by childMenu id
 */
const selectChildMenuById = (parentArticleId: string) => 
	createSelector(selectChildMenuState, (state) => state[parentArticleId]);
  
	

export const selectChildMenuByParentId = (parentArticleId: string) => createSelector(
	selectChildMenuState,
	//selectEntities,
	(entity) =>
	{
		let childMenus: ChildMenuModel[] = [];
		const childMenuIds = entity.ids;
		childMenuIds.map(eachId =>
		{
			const eachChildMenu = entity.entities[eachId];
			if (eachChildMenu.parentArticleId === parentArticleId)
			{
				childMenus = [
					...childMenus,
					eachChildMenu
				]
			}
		})
		return childMenus;
	}
);



/**
 * @description export User skill categories query to access all selectors
 */
export const CHILD_MENU_QUERY_SELECTOR = {
	selectAllChildMenu,
	selectAllChildMenuIds,
	selectChildMenuTotalNumber,
	selectChildMenuHasData,
	selectChildMenuById,
	selectChildMenuByParentId
};

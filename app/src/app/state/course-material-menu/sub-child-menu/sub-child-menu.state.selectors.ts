/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:49:38 
 * Last modified  : 2022-07-05 20:34:03
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { SubChildMenuModel } from 'src/app/shared/model/sub-child-menu.model';
import { subChildMenuAdapter, SubChildMenuStateModel } from './sub-child-menu.state.model';
import { SUB_CHILD_MENU_FEATURE_KEY } from './sub-child-menu.state.reducer';



/**
 * @description Selectors - Sub child menu adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = subChildMenuAdapter.getSelectors();

/**
 * @description  Selectors - Sub child menu State
 */
export const selectSubChildMenuState: MemoizedSelector<SubChildMenuStateModel, SubChildMenuStateModel> = createFeatureSelector<SubChildMenuStateModel>(SUB_CHILD_MENU_FEATURE_KEY);

/**
 * @description Selectors - All Sub child menu
 */
export const selectAllSubChildMenu = createSelector(
	selectSubChildMenuState,
	selectAll,
);

/**
 * @description Selectors - All Sub child menu Ids
 */
export const selectAllSubChildMenuIds = createSelector(
	selectSubChildMenuState,
	selectIds,
);

/**
 * @description Selectors - Sub child menu total number
 */
export const selectSubChildMenuTotalNumber = createSelector(
	selectSubChildMenuState,
	selectTotal,
);

/**
 * @description Selectors - Sub child menu has data
 */
export const selectSubChildMenuHasData = createSelector(
	selectEntities,
	selectSubChildMenuTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Sub child menu by id
 */
 const selectSubChildMenuById = (subChildArticleId: string) => 
 createSelector(selectSubChildMenuState, (state) => state.entities[subChildArticleId]);

 
/**
 * @description Selectors - Sub child menu by child id
 */
export const selectSubChildMenuByChildId = (childArticleId: string) => createSelector(
	selectSubChildMenuState,
 //selectEntities,
 (entity) =>
 {
	 let subChildMenus: SubChildMenuModel[] = [];
	 const subChildMenuIds = entity.ids;
	 subChildMenuIds.map(eachId =>
	 {
		 const eachSubChildMenu = entity.entities[eachId];
		 if (eachSubChildMenu.childArticleId === childArticleId)
		 {
			subChildMenus = [
				 ...subChildMenus,
				 eachSubChildMenu
			 ]
		 }
	 })
	 return subChildMenus;
 }
);

/**
 * @description export sub child menu query to access all selectors
 */
export const SUB_CHILD_MENU_QUERY_SELECTOR = {
	selectAllSubChildMenu,
	selectAllSubChildMenuIds,
	selectSubChildMenuTotalNumber,
	selectSubChildMenuHasData,
	selectSubChildMenuById,
	selectSubChildMenuByChildId
};

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-25 18:16:03
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
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = subChildMenuAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
export const selectSubChildMenuState: MemoizedSelector<SubChildMenuStateModel, SubChildMenuStateModel> = createFeatureSelector<SubChildMenuStateModel>(SUB_CHILD_MENU_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
export const selectAllSubChildMenu = createSelector(
	selectSubChildMenuState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
export const selectAllSubChildMenuIds = createSelector(
	selectSubChildMenuState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
export const selectSubChildMenuTotalNumber = createSelector(
	selectSubChildMenuState,
	selectTotal,
);

export const selectSubChildMenuHasData = createSelector(
	selectEntities,
	selectSubChildMenuTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - Course material has subChildMenu
 */
 const selectSubChildMenuById = (subChildArticleId: string) => 
 createSelector(selectSubChildMenuState, (state) => state[subChildArticleId]);

 

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
 * @description export User skill categories query to access all selectors
 */
export const SUB_CHILD_MENU_QUERY_SELECTOR = {
	selectAllSubChildMenu,
	selectAllSubChildMenuIds,
	selectSubChildMenuTotalNumber,
	selectSubChildMenuHasData,
	selectSubChildMenuById,
	selectSubChildMenuByChildId
};

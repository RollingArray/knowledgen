/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:58:18 
 * Last modified  : 2022-07-05 15:13:00
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { PARENT_MENU_CRUD_FEATURE_KEY } from "./parent-menu-crud.state.reducer";
import { ParentMenuCrudStateModel } from "./parent-menu-crud.state.model";

/**
 * @description get operation status
 */
const getOperationStatus = (parentMenuCrudStateModel: ParentMenuCrudStateModel): OperationsEnum => parentMenuCrudStateModel.operationStatus;

/**
 * @description get operation sub child menu 
 */
const getOperationParentMenu = (parentMenuCrudStateModel: ParentMenuCrudStateModel): ParentMenuModel => parentMenuCrudStateModel.operationParentMenu;

/**
 * @description Selector - Sub child menu crud state
 */
export const selectParentMenuCrudState: MemoizedSelector<ParentMenuCrudStateModel, ParentMenuCrudStateModel> = createFeatureSelector<ParentMenuCrudStateModel>(PARENT_MENU_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<ParentMenuCrudStateModel, OperationsEnum> = createSelector(
	selectParentMenuCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation parent menu
 */
export const selectOperationParentMenu: MemoizedSelector<ParentMenuCrudStateModel, ParentMenuModel> = createSelector(
	selectParentMenuCrudState,
	getOperationParentMenu
);

/**
 * @description export parent menu crud query to access all selectors
 */
export const PARENT_MENU_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationParentMenu
};
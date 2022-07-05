/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:56:29 
 * Last modified  : 2022-07-05 14:57:23
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { CHILD_MENU_CRUD_FEATURE_KEY } from "./child-menu-crud.state.reducer";
import { ChildMenuCrudStateModel } from "./child-menu-crud.state.model";

/**
 * @description get operation status
 */
const getOperationStatus = (childMenuCrudStateModel: ChildMenuCrudStateModel): OperationsEnum => childMenuCrudStateModel.operationStatus;

/**
 * @description get operation sub child menu 
 */
const getOperationChildMenu = (childMenuCrudStateModel: ChildMenuCrudStateModel): ChildMenuModel => childMenuCrudStateModel.operationChildMenu;

/**
 * @description Selector - Sub child menu crud state
 */
export const selectChildMenuCrudState: MemoizedSelector<ChildMenuCrudStateModel, ChildMenuCrudStateModel> = createFeatureSelector<ChildMenuCrudStateModel>(CHILD_MENU_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<ChildMenuCrudStateModel, OperationsEnum> = createSelector(
	selectChildMenuCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation ChildMenu
 */
export const selectOperationChildMenu: MemoizedSelector<ChildMenuCrudStateModel, ChildMenuModel> = createSelector(
	selectChildMenuCrudState,
	getOperationChildMenu
);

/**
 * @description export sub child menu  crud query to access all selectors
 */
export const CHILD_MENU_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationChildMenu
};
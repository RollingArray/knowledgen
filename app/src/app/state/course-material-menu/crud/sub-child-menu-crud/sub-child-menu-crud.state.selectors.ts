/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:21:21 
 * Last modified  : 2022-07-05 16:22:44
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { SUB_CHILD_MENU_CRUD_FEATURE_KEY } from "./sub-child-menu-crud.state.reducer";
import { SubChildMenuCrudStateModel } from "./sub-child-menu-crud.state.model";

/**
 * @description get operation status
 */
const getOperationStatus = (subChildMenuCrudStateModel: SubChildMenuCrudStateModel): OperationsEnum => subChildMenuCrudStateModel.operationStatus;

/**
 * @description get operation sub child menu 
 */
const getOperationSubChildMenu = (subChildMenuCrudStateModel: SubChildMenuCrudStateModel): SubChildMenuModel => subChildMenuCrudStateModel.operationSubChildMenu;

/**
 * @description Selector - Sub child menu crud state
 */
export const selectSubChildMenuCrudState: MemoizedSelector<SubChildMenuCrudStateModel, SubChildMenuCrudStateModel> = createFeatureSelector<SubChildMenuCrudStateModel>(SUB_CHILD_MENU_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<SubChildMenuCrudStateModel, OperationsEnum> = createSelector(
	selectSubChildMenuCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation SubChildMenu
 */
export const selectOperationSubChildMenu: MemoizedSelector<SubChildMenuCrudStateModel, SubChildMenuModel> = createSelector(
	selectSubChildMenuCrudState,
	getOperationSubChildMenu
);

/**
 * @description export sub child menu  crud query to access all selectors
 */
export const SUB_CHILD_MENU_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationSubChildMenu
};
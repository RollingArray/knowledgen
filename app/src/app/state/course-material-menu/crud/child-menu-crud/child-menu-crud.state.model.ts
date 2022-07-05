/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:56:29 
 * Last modified  : 2022-07-05 14:56:45
 */



import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";

/**
 * Sub child menu model crud state model
 */
export interface ChildMenuCrudStateModel {
	operationStatus: OperationsEnum;
	operationChildMenu: ChildMenuModel;
}

/**
 * @description Sub child menu model crud initial state
 */
export const CHILD_MENU_CRUD_INITIAL_STATE: ChildMenuCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationChildMenu: {}
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:21:21 
 * Last modified  : 2022-07-05 16:21:50
 */


import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";

/**
 * Sub child menu model crud state model
 */
export interface SubChildMenuCrudStateModel {
	operationStatus: OperationsEnum;
	operationSubChildMenu: SubChildMenuModel;
}

/**
 * @description Sub child menu model crud initial state
 */
export const SUB_CHILD_MENU_CRUD_INITIAL_STATE: SubChildMenuCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationSubChildMenu: {}
};
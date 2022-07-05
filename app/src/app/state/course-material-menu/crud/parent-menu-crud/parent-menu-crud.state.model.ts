/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:58:18 
 * Last modified  : 2022-07-05 15:01:19
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";

/**
 * Parent menu crud state model
 */
export interface ParentMenuCrudStateModel {
	operationStatus: OperationsEnum;
	operationParentMenu: ParentMenuModel;
}

/**
 * @description Parent menu crud initial state
 */
export const PARENT_MENU_CRUD_INITIAL_STATE: ParentMenuCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationParentMenu: {}
};
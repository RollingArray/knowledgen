/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Menu select state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:23:29 
 * Last modified  : 2022-07-05 19:38:20
 */

import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";

/**
 * Summary
 */
export interface MenuSelectStateModel extends MenuSelectModel {
	
}

/**
 * @description Menu Select initial state
 */
export const INITIAL_MENU_SELECT_STATE: MenuSelectStateModel = {
	articleId: '',
	courseMaterialId: '',
	menuType: MenuTypeEnum.PARENT_MENU,
	courseMaterialType: CourseMaterialTypeIdEnum.TD
};
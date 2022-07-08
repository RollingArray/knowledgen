/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Menu Select Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 19:37:36 
 * Last modified  : 2022-07-05 19:38:07
 */


import { CourseMaterialTypeIdEnum } from '../enum/course-material-type-id.enum';
import { MenuTypeEnum } from '../enum/menu-type.enum';

export interface MenuSelectModel {
	articleId: string,
	courseMaterialId: string,
	menuType: MenuTypeEnum,
	courseMaterialType: CourseMaterialTypeIdEnum
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Menu Select Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 19:37:36 
 * Last modified  : 2022-07-18 19:44:12
 */


import { CourseMaterialTypeIdEnum } from '../enum/course-material-type-id.enum';
import { MenuTypeEnum } from '../enum/menu-type.enum';
import { ArticleModel } from './article.model';

export interface MenuSelectModel extends ArticleModel {
	menuType?: MenuTypeEnum,
	courseMaterialType: CourseMaterialTypeIdEnum
}

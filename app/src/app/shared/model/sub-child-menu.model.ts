/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 10:59:00 
 * Last modified  : 2022-07-05 10:59:00 
 */



import { MenuTypeEnum } from "../enum/menu-type.enum";
import { BaseModel } from "./base.model";
import { CourseMaterialMenuModel } from "./course-material-menu.model";


export interface SubChildMenuModel extends CourseMaterialMenuModel, BaseModel
{
	childArticleId?: string;
	subChildArticleId?: string;
	subChildArticleOrder?: number;
	courseMaterialId?: string;
	menuType?: MenuTypeEnum
}
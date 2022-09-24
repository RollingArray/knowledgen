/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 10:50:38 
 * Last modified  : 2022-07-05 10:50:38 
 */



import { MenuTypeEnum } from "../enum/menu-type.enum";
import { BaseModel } from "./base.model";
import { CourseMaterialMenuModel } from "./course-material-menu.model";

export interface ChildMenuModel extends CourseMaterialMenuModel, BaseModel
{
	childArticleId?: string;
	parentArticleId?: string;
	childArticleOrder?: number;
	courseMaterialId?: string;
	menuType?: MenuTypeEnum
}
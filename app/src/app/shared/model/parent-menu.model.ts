/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 10:55:36 
 * Last modified  : 2022-07-05 10:58:26
 */



import { BaseModel } from "./base.model";
import { CourseMaterialMenuModel } from "./course-material-menu.model";

export interface ParentMenuModel extends CourseMaterialMenuModel, BaseModel
{
	parentArticleId?: string;
	parentArticleOrder?: number;
	courseMaterialId?: string;
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material menu model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 10:51:22 
 * Last modified  : 2022-07-18 19:38:41
 */



import { CourseMaterialTypeIdEnum } from "../enum/course-material-type-id.enum";
import { ArticleModel } from "./article.model";

export interface CourseMaterialMenuModel extends ArticleModel
{
	courseMaterialTypeId?: CourseMaterialTypeIdEnum;
}
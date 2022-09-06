/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-09-02 20:35:16
 */

import { ArticleModel } from "./article.model";
import { BaseModel } from "./base.model";
import { CourseMaterialMenuModel } from "./course-material-menu.model";

export interface ArticleRevisionModel extends BaseModel
{
	articleRevisionDate?: string;
	articles: CourseMaterialMenuModel[]
}

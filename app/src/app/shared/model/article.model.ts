/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-07-18 19:37:51
 */

import { ArticleStatusTypeEnum } from "../enum/article-status-type.enum";
import { BaseModel } from "./base.model";

export interface ArticleModel extends BaseModel
{
	courseMaterialId?: string;
	articleId?: string;
	articleTitle?: string;
	articleStatus?: ArticleStatusTypeEnum;
}

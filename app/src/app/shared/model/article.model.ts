/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-20 01:53:16
 */

import { BaseModel } from "./base.model";


export interface ArticleModel extends BaseModel
{
	courseMaterialId?: string;
	articleId?: string;
	articleTitle?: string;
}

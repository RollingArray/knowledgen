/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-19 11:25:31
 */

import { BaseModel } from "./base.model";


export interface SubChildMenuModel extends BaseModel
{
	childArticleId?: string;
	subChildArticleId?: string;
	subChildArticleOrder?: number;
	courseMaterialId?: string;
	articleTitle?: string;
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-19 21:29:29
 */

import { BaseModel } from "./base.model";


export interface ChildMenuModel extends BaseModel
{
	childArticleId?: string;
	parentArticleId?: string;
	articleTitle?: string;
	childArticleOrder?: number;
	courseMaterialId?: string;
	// subChildMenu?: {
	// 	success?: boolean;
	// 	data?: CourseMaterialSubChildMenuModel[];
	// };
}
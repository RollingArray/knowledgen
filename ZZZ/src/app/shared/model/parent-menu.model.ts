/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-19 01:38:21
 */

import { BaseModel } from "./base.model";

export interface ParentMenuModel extends BaseModel
{
	parentArticleId?: string;
	parentArticleOrder?: number;
	courseMaterialId?: string;
	articleTitle: string;
	// childMenu?: {
	// 	success?: boolean;
	// 	data?: CourseMaterialChildMenuModel[];
	// };
}
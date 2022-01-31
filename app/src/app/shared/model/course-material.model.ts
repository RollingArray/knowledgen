/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-14 19:01:56
 */

import { BaseModel } from "./base.model";


export interface CourseMaterialModel extends BaseModel
{
	courseMaterialId?: string;
	courseMaterialName?: string;
	courseMaterialDescription?: string;
}

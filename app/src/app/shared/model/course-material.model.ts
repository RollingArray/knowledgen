/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-07-05 10:52:33
 */

import { BaseModel } from "./base.model";


export interface CourseMaterialModel extends BaseModel
{
	courseMaterialId?: string;
	courseMaterialName?: string;
	courseMaterialDescription?: string;
	courseMaterialOwner?: boolean | false;
}

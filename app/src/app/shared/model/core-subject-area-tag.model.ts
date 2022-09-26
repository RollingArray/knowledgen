/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-08-08 17:27:15
 */

import { BaseModel } from "./base.model";

export interface CoreSubjectAreaTagModel extends BaseModel
{
	subjectAreaId?: string;
	subjectAreaTagId?: string;
	subjectAreaTagName?: string;
}

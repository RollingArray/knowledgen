/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-08-08 17:27:15
 */

import { BaseModel } from "./base.model";
import { CoreSubjectAreaTagModel } from "./core-subject-area-tag.model";

export interface CoreSubjectAreaModel extends BaseModel
{
	subjectAreaId?: string;
	subjectAreaName?: string;
	subjectAreasTags?: CoreSubjectAreaTagModel[],
	strongSubjectAreas?: CoreSubjectAreaTagModel[],
	weakSubjectAreas?: CoreSubjectAreaTagModel[],
	neutralSubjectAreas?: CoreSubjectAreaTagModel[],
}

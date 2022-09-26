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
import { CoreSubjectAreaModel } from "./core-subject-area.model";


export interface CourseMaterialModel extends BaseModel, CoreSubjectAreaModel
{
	courseMaterialId?: string;
	courseMaterialName?: string;
	courseMaterialDescription?: string;
	courseMaterialOwner?: boolean | false;
	addedToLearningPath?: boolean | false;
	courseMaterialProgress?: number;
	authorFirstName?: string;
	authorLastName?: string;
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material type model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-06-30 14:23:11 
 * Last modified  : 2022-07-05 10:52:08
 */

import { CourseMaterialTypeIdEnum } from "../enum/course-material-type-id.enum";


export interface CourseMaterialTypeModel
{
	id: CourseMaterialTypeIdEnum;
	type: string;
	icon: string;
	definition?: string;
}
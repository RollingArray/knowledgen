/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-25 15:50:18
 */

import { BaseModel } from "./base.model";
import { MentorMatchModel } from "./mentor-match.model";
import { UserModel } from "./user.model";


export interface AvailabilityPlannerModel extends BaseModel, UserModel
{
	plannerId?: string;
	availabilityDate?: string;
	availabilityFrom?: string;
	availabilityTo?: string;
	availabilityContext?: string;
	onlineMeetingUrl?: string;
	onlineMeetingType?: string;
	mentorMatch?: {
		success: boolean,
		data: MentorMatchModel[]
	}
}

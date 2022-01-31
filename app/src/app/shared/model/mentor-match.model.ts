/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Modal data
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:57 
 * Last modified  : 2022-01-25 15:02:37
 */

import { AvailabilityPlannerModel } from "./availability-planner.model";
import { UserModel } from "./user.model";


export interface MentorMatchModel extends UserModel
{
	matchedSessions?: {
		success: boolean,
		data: AvailabilityPlannerModel[]
	}
}

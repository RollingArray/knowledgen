/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-16 16:02:55 
 * Last modified  : 2022-09-16 18:58:08
 */

import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";


export interface UserPeerModel extends UserModel, BaseModel
{
	userPeerId?: string;
	peerId?: string;
	totalStudyPoints?: number;
}
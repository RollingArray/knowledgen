/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:53:28
 */

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";

/**
 * Selects user peer id
 * @param userPeerModel 
 * @returns user peer id 
 */
export function selectUserPeerId(userPeerModel: UserPeerModel): string
{
	return userPeerModel.userPeerId ? userPeerModel.userPeerId : '';
}

/**
 * User peer state model
 */
export interface UserPeerStateModel extends EntityState<UserPeerModel> { }

/**
 * @description User peer adapter
 */
export const userPeerAdapter: EntityAdapter<UserPeerModel> = createEntityAdapter<UserPeerModel>({
	selectId: selectUserPeerId
});

/**
 * @description Initial User peer initial state
 */
export const INITIAL_USER_PEER_STATE: UserPeerStateModel = userPeerAdapter.getInitialState();
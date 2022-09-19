/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:54:47
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { userPeerAdapter, UserPeerStateModel } from "./user-peer.state.model";
import { USER_PEER_FEATURE_KEY } from "./user-peer.state.reducer";

/**
 * @description Selectors - User Peer adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = userPeerAdapter.getSelectors();

/**
 * @description  Selectors - User Peer State
 */
const selectUserPeerState: MemoizedSelector<UserPeerStateModel, UserPeerStateModel> = createFeatureSelector<UserPeerStateModel>(USER_PEER_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
const selectAllUserPeer = createSelector(
	selectUserPeerState,
	selectAll,
);

/**
 * @description Selectors - All User Peer Ids
 */
const selectAllUserPeerIds = createSelector(
	selectUserPeerState,
	selectIds,
);

/**
 * @description Selectors - User Peer total number
 */
const selectUserPeerTotalNumber = createSelector(
	selectUserPeerState,
	selectTotal,
);

/**
 * @description Selectors - User Peer has userPeer
 */
const selectUserPeerHasData = createSelector(
	selectEntities,
	selectUserPeerTotalNumber,
	(entity, total) => total !== 0 ? true : false
);

/**
 * @description Selectors - User Peer by userPeer id
 */
const selectUserPeerByUserPeerId = (courseMaterialIdId: string) =>
	createSelector(selectUserPeerState, (state) => state.entities[courseMaterialIdId]);

/**
 * @description Selectors - User Peer Owner
 */
const selectUserPeerOwner = (courseMaterialIdId: string) =>
	createSelector(selectUserPeerState, (state) =>
	{
		if (state.entities[courseMaterialIdId])
		{
			return state.entities[courseMaterialIdId].userId;
		}
		else
		{
			return '';
		}

	});

/**
 * @description export User skill categories query to access all selectors
 */
export const USER_PEER_QUERY_SELECTOR = {
	selectAllUserPeer,
	selectAllUserPeerIds,
	selectUserPeerTotalNumber,
	selectUserPeerHasData,
	selectUserPeerOwner,
	selectUserPeerByUserPeerId
};

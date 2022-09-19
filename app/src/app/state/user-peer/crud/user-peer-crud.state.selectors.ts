/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:52:25
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";
import { UserPeerCrudStateModel } from "./user-peer-crud.state.model";
import { USER_PEER_CRUD_FEATURE_KEY } from "./user-peer-crud.state.reducer";

/**
 * @description get operation status
 */
const getOperationStatus = (userPeerCrudStateModel: UserPeerCrudStateModel): OperationsEnum => userPeerCrudStateModel.operationStatus;

/**
 * @description get operation user peer
 */
const getOperationUserPeer = (userPeerCrudStateModel: UserPeerCrudStateModel): UserPeerModel => userPeerCrudStateModel.operationUserPeer;

/**
 * @description Selector - User Peer crud state
 */
export const selectUserPeerCrudState: MemoizedSelector<UserPeerCrudStateModel, UserPeerCrudStateModel>  = createFeatureSelector<UserPeerCrudStateModel>(USER_PEER_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<UserPeerCrudStateModel, OperationsEnum> = createSelector(
	selectUserPeerCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation User Peer
 */
export const selectOperationUserPeer: MemoizedSelector<UserPeerCrudStateModel, UserPeerModel> = createSelector(
	selectUserPeerCrudState,
	getOperationUserPeer
);

/**
 * @description export user peer crud query to access all selectors
 */
export const USER_PEER_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationUserPeer
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:56:24
 */

import { createAction, props } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";
import { UserPeerOperationsEnum } from "./user-peer-operations.enum";

/**
 * @description User Peer Action - Api Request User Peer
 */
export const API_REQUEST_USER_PEER = createAction(
	UserPeerOperationsEnum.API_REQUEST_USER_PEER
);

/**
 * @description User Peer Action - Loaded User Peer
 */
export const LOADED_REQUEST_USER_PEER = createAction(
	UserPeerOperationsEnum.LOADED_REQUEST_USER_PEER,
	props<{ payload: UserPeerModel[] }>()
);

/**
 * @description User Peer Action - Act Upon User Peer
 */
export const ACT_UPON_USER_PEER = createAction(
	UserPeerOperationsEnum.ACT_UPON_USER_PEER,
	props<{ payload: UserPeerModel, operation: OperationsEnum }>()
);

/**
 * @description User Peer Action - Send Api Request To Add New User Peer
 */
export const API_REQUEST_ADD_NEW_USER_PEER = createAction(
	UserPeerOperationsEnum.API_REQUEST_ADD_NEW_USER_PEER,
	props<{ payload: UserPeerModel }>()
);

/**
 * @description User Peer Action - Send Api Request To Delete User Peer
 */
export const API_REQUEST_DELETE_USER_PEER = createAction(
	UserPeerOperationsEnum.API_REQUEST_DELETE_USER_PEER,
	props<{ payload: UserPeerModel }>()
);

/**
 * @description User Peer Action - Store Newly Added User Peer
 */
export const STORE_NEWLY_ADDED_USER_PEER = createAction(
	UserPeerOperationsEnum.STORE_NEWLY_ADDED_USER_PEER,
	props<{ payload: UserPeerModel }>()
);

/**
 * @description User Peer Action - Remove User Peer From Store
 */
export const REMOVE_USER_PEER_FROM_STORE = createAction(
	UserPeerOperationsEnum.REMOVE_USER_PEER_FROM_STORE,
	props<{ payload: UserPeerModel }>()
);

/**
 * @description User Peer Action - User Peer CRUD Successfully
 */
export const USER_PEER_CRUD_SUCCESS = createAction(
	UserPeerOperationsEnum.USER_PEER_CRUD_SUCCESS
);

/**
 * @description User Peer Action - User Peer CRUD Fail
 */
export const USER_PEER_CRUD_FAIL = createAction(
	UserPeerOperationsEnum.USER_PEER_CRUD_FAIL
);

/**
 * @description User Peer Action - User Peer Deleted Successfully
 */
export const USER_PEER_DELETED_SUCCESS = createAction(
	UserPeerOperationsEnum.USER_PEER_DELETED_SUCCESS
);

/**
 * @description User Peer Action - User Peer Added Successfully
 */
export const USER_PEER_ADDED_SUCCESS = createAction(
	UserPeerOperationsEnum.USER_PEER_ADDED_SUCCESS
);

/**
 * @description User Peer Action - No Operation
 */
export const NOOP = createAction(
	UserPeerOperationsEnum.NOOP,
);

/**
 * @description Export all User Peer
 */
export const USER_PEER_ACTIONS = {
	API_REQUEST_USER_PEER,
	LOADED_REQUEST_USER_PEER,
	ACT_UPON_USER_PEER,
	API_REQUEST_ADD_NEW_USER_PEER,
	API_REQUEST_DELETE_USER_PEER,
	STORE_NEWLY_ADDED_USER_PEER,
	REMOVE_USER_PEER_FROM_STORE,
	USER_PEER_CRUD_SUCCESS,
	USER_PEER_CRUD_FAIL,
	USER_PEER_ADDED_SUCCESS,
	USER_PEER_DELETED_SUCCESS,
	NOOP,
};
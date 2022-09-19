/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary User peer crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:51:48
 */



import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";

/**
 * @description User peer crud state model
 */
export interface UserPeerCrudStateModel {
	operationStatus: OperationsEnum;
	operationUserPeer: UserPeerModel;
}

/**
 * @description User peer crud initial state
 */
export const USER_PEER_CRUD_INITIAL_STATE: UserPeerCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationUserPeer: {}
};
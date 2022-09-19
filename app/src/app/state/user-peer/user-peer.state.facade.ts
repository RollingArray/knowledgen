/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:50:38
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";
import { UserPeerCrudStateModel } from "./crud/user-peer-crud.state.model";
import { USER_PEER_CRUD_QUERY_SELECTOR } from "./crud/user-peer-crud.state.selectors";
import { USER_PEER_ACTIONS } from "./user-peer.state.actions";
import { UserPeerStateModel } from "./view/user-peer.state.model";
import { USER_PEER_QUERY_SELECTOR } from "./view/user-peer.state.selectors";

/**
 * @description Injectable
 */
@Injectable()

export class UserPeerStateFacade
{

	/**
	 * Creates an instance of user peer state facade.
	 * @param userPeerStore 
	 * @param userPeerCrudStore 
	 */
	constructor(
		private userPeerStore: Store<UserPeerStateModel>,
		private userPeerCrudStore: Store<UserPeerCrudStateModel>
	) { }

	/**
	 * All user peer$ of user peer state facade
	 */
	public allUserPeer$ = this.userPeerStore.select(USER_PEER_QUERY_SELECTOR.selectAllUserPeer);

	/**
	 * Course material has data$ of user peer state facade
	 */
	public userPeerHasData$ = this.userPeerStore.select(USER_PEER_QUERY_SELECTOR.selectUserPeerHasData);
	
	/**
	 * Course material curd operation status$ of user peer state facade
	 */
	public userPeerCurdOperationStatus$ = this.userPeerCrudStore.select(USER_PEER_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation user peer$ of user peer model state facade
	 */
	public operationUserPeer$ = this.userPeerCrudStore.select(USER_PEER_CRUD_QUERY_SELECTOR.selectOperationUserPeer);

	
	/**
	 * Requests user peer
	 */
	public requestUserPeer()
	{
		this.userPeerStore.dispatch(USER_PEER_ACTIONS.API_REQUEST_USER_PEER());
	}

	/**
	 * Adds new user peer
	 * @param userPeer 
	 */
	public addNewUserPeer(userPeer: UserPeerModel)
	{
		this.userPeerStore.dispatch(USER_PEER_ACTIONS.API_REQUEST_ADD_NEW_USER_PEER({ payload: userPeer }));
	}

	/**
	 * Deletes user peer
	 * @param userPeer 
	 */
	public deleteUserPeer(userPeer: UserPeerModel)
	{
		this.userPeerStore.dispatch(USER_PEER_ACTIONS.API_REQUEST_DELETE_USER_PEER({ payload: userPeer }));
	}

	/**
	 * Acts upon user peer
	 * @param userPeer 
	 * @param operation 
	 */
	public actUponUserPeer(userPeer: UserPeerModel, operation: OperationsEnum)
	{
		this.userPeerStore.dispatch(USER_PEER_ACTIONS.ACT_UPON_USER_PEER({ payload: userPeer, operation: operation }));
	}
}

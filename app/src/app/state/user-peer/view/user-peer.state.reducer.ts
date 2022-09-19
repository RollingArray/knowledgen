/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:53:42
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { USER_PEER_ACTIONS } from '../user-peer.state.actions';
import { INITIAL_USER_PEER_STATE, userPeerAdapter, UserPeerStateModel } from './user-peer.state.model';


/**
 * @description feature key
 */
export const USER_PEER_FEATURE_KEY = 'userPeerState';

/**
 * @description create reducer
 */
const reducer = createReducer(

	/**
	 * @description reducer initial state
	 */
	 INITIAL_USER_PEER_STATE,

	/**
	 * @description Reducer for action - Api Request objects
	 */
	on(USER_PEER_ACTIONS.API_REQUEST_USER_PEER, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded api request objects
	 */
	on(USER_PEER_ACTIONS.LOADED_REQUEST_USER_PEER, (state, action) => (

		userPeerAdapter.setAll(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Store Newly Added object
	 */
	on(USER_PEER_ACTIONS.STORE_NEWLY_ADDED_USER_PEER, (state, action) => (
		userPeerAdapter.setOne(action.payload, state)
	)),

	/**
	 * @description Reducer for action - Remove object From Store
	 */
	on(USER_PEER_ACTIONS.REMOVE_USER_PEER_FROM_STORE, (state, action) => (
		userPeerAdapter.removeOne(
			action.payload.userPeerId ? action.payload.userPeerId : '', 
			state
		)
	)),

);

/**
 * Users peer state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function userPeerStateReducer(state: UserPeerStateModel | undefined, action: Action) {
	return reducer(state, action);
}
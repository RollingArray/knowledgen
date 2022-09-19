/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:52:07
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { USER_PEER_ACTIONS } from '../user-peer.state.actions';
import { UserPeerCrudStateModel, USER_PEER_CRUD_INITIAL_STATE } from './user-peer-crud.state.model';

/**
 * @description Object crud feature key
 */
export const USER_PEER_CRUD_FEATURE_KEY = 'userPeerCrudState';

/**
 * @description Object crud reducer
 */
const reducer = createReducer(

	/**
	 * @description Object crud reducer initial state
	 */
	USER_PEER_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(USER_PEER_ACTIONS.ACT_UPON_USER_PEER, (state, action) => ({
		...state,
		operationUserPeer: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new object
	 */
	on(USER_PEER_ACTIONS.API_REQUEST_ADD_NEW_USER_PEER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete object
	 */
	on(USER_PEER_ACTIONS.API_REQUEST_DELETE_USER_PEER, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Object added success
	 */
	on(USER_PEER_ACTIONS.USER_PEER_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object delete success
	 */
	on(USER_PEER_ACTIONS.USER_PEER_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud success
	 */
	on(USER_PEER_ACTIONS.USER_PEER_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud fail
	 */
	on(USER_PEER_ACTIONS.USER_PEER_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * Users peer crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function userPeerCrudStateReducer(state: UserPeerCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
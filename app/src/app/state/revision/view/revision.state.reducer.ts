/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-21 20:59:35
 */

import { createReducer, Action, on, State } from '@ngrx/store';
import { REVISION_ACTIONS } from '../revision.state.actions';
import { INITIAL_REVISION_STATE, revisionAdapter, RevisionStateModel } from './revision.state.model';


/**
 * @description Feature key
 */
export const REVISION_FEATURE_KEY = 'revisionState';

/**
 * @description revision reducer
 */
const reducer = createReducer(

	/**
	 * @description User revision reducer initial state
	 */
	 INITIAL_REVISION_STATE,

	/**
	 * @description Reducer for action - Api Request Revision
	 */
	on(REVISION_ACTIONS.API_REQUEST_REVISION, (state, action) => ({
		...state,
	})),

	/**
	 * @description Reducer for action - Loaded user revision
	 */
	on(REVISION_ACTIONS.LOADED_REQUEST_REVISION, (state, action) => (

		revisionAdapter.setOne(action.payload, state)
	)),
);


/**
 * @description Globals categories state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function revisionStateReducer(state: RevisionStateModel | undefined, action: Action) {
	return reducer(state, action);
}
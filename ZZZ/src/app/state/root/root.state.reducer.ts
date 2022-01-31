/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:13 
 * Last modified  : 2022-01-14 18:41:13 
 */



import { createReducer, Action, on } from '@ngrx/store';
import { ROOT_ACTIONS } from './root.state.actions';
import { INITIAL_ROOT_STATE, RootStateModel } from './root.state.model';

/**
 * @description Root state feature key
 */
export const ROOT_FEATURE_KEY = 'rootState';

/**
 * @description Root state Reducer
 */
const reducer = createReducer(

	/**
	 * @description Root state initial state
	 */
	INITIAL_ROOT_STATE,

	/**
	 * Reducer for action - Start Loading Indicator
	 */
	on(ROOT_ACTIONS.LOADING_INDICATOR_START, (state, action) => ({
		...state,
		loadingIndicatorStatus: true
	})),

	/**
	 * Reducer for action - Stop Loading Indicator
	 */
	on(ROOT_ACTIONS.LOADING_INDICATOR_STOP, (state, action) => ({
		...state,
		loadingIndicatorStatus: false
	})),
);

/**
 * @description Roots state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function rootStateReducer(state: RootStateModel | undefined, action: Action) {
	return reducer(state, action);
}
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:40:25 
 * Last modified  : 2022-01-14 18:40:25 
 */

/**
 * @description Root state model
 */
export interface RootStateModel {
	loadingIndicatorStatus: boolean;
}

/**
 * @description Root initial state
 */
export const INITIAL_ROOT_STATE: RootStateModel = {
	loadingIndicatorStatus: false,
};
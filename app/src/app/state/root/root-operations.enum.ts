/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:32:22 
 * Last modified  : 2022-01-14 18:32:22 
 */

export enum RootOperationsEnum {
	LOG_EVENT = '[Root] Log Event',
	HYDRATE_INITIAL_BROWSER_DATA = '[Root] Hydrate Initial Browser data',
	LOADING_INDICATOR_START = '[Root] Start Loading Indicator',
	LOADING_INDICATOR_STOP = '[Root] Stop Loading Indicator',
	SELECT_PREFERRED_LANGUAGE = '[Root] Select Preferred Language',
	STORE_PREFERRED_LANGUAGE = '[Root] Store Preferred Language',
	STORE_LOGGED_IN_USER_DETAILS = '[Root] Store Logged In User Details',
	NOOP = '[Root] No Operation',
}
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
	STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE = '[Root] Store Logged In User Details To Cookie',

	UPDATE_USER_LOGGED_IN_STATUS = '[Root] Update User Logged In Status',
	API_REQUEST_SIGN_IN = '[Root] Api Request Sign In',
	API_REQUEST_SIGN_UP = '[Root] Api Request Sign Up',
	API_SIGN_IN_FAIL = '[Root] Api Sign In Fail',
	API_REQUEST_ACCOUNT_VERIFICATION = '[Root] Api Request Account Verification',

	NOOP = '[Root] No Operation',
}
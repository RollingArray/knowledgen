/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:32:22 
 * Last modified  : 2022-09-20 07:49:02
 */

export enum RootOperationsEnum {
	LOG_EVENT = '[Root] Log Event',
	HYDRATE_INITIAL_BROWSER_DATA = '[Root] Hydrate Initial Browser data',
	LOADING_INDICATOR_START = '[Root] Start Loading Indicator',
	LOADING_INDICATOR_STOP = '[Root] Stop Loading Indicator',
	MODAL_LOADING_INDICATOR_START = '[Root] Start Modal Loading Indicator',
	MODAL_LOADING_INDICATOR_STOP = '[Root] Stop Modal Loading Indicator',
	SELECT_PREFERRED_LANGUAGE = '[Root] Select Preferred Language',
	STORE_PREFERRED_LANGUAGE = '[Root] Store Preferred Language',
	STORE_LOGGED_IN_USER_DETAILS = '[Root] Store Logged In User Details',
	STORE_UPDATED_LOGGED_IN_USER_DETAILS = '[Root] Store Update Logged In User Details',
	
	STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE = '[Root] Store Logged In User Details To Cookie',
	STORE_UPDATED_IN_USER_DETAILS_TO_COOKIE = '[Root] Store Update Logged In User Details To Cookie',
	
	UPDATE_USER_LOGGED_IN_STATUS = '[Root] Update User Logged In Status',
	API_REQUEST_SIGN_IN = '[Root] Api Request Sign In',
	API_REQUEST_SIGN_UP = '[Root] Api Request Sign Up',
	API_SIGN_IN_FAIL = '[Root] Api Sign In Fail',
	API_REQUEST_ACCOUNT_VERIFICATION = '[Root] Api Request Account Verification',
	API_REQUEST_EDIT_LOGGED_IN_USER = '[Root] Api Request Edit Logged In User ',
	API_REQUEST_EDIT_LOGGED_IN_USER_FAIL = '[Root] Api Request Edit Logged In User Fail',

	STUDY_TIMER_START = '[Root] Start Study Timer',
	STUDY_TIMER_STOP = '[Root] Stop Study Timer',
	STORE_STUDY_TIMER_STATUS = '[Root] Store Study Timer Status',

	NOOP = '[Root] No Operation',
}
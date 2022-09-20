/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:33:13 
 * Last modified  : 2022-09-20 07:49:44
 */

import { createAction, props } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserModel } from 'src/app/shared/model/user.model';
import { RootOperationsEnum } from './root-operations.enum';

/**
 * @description Root action - Start Loading Indicator
 */
export const LOADING_INDICATOR_START = createAction(
	RootOperationsEnum.LOADING_INDICATOR_START,
	props<{ payload: string }>()
);

/**
 * @description Root action - Stop Loading Indicator
 */
export const LOADING_INDICATOR_STOP = createAction(
	RootOperationsEnum.LOADING_INDICATOR_STOP,
);

/**
 * @description Root action - Start Modal Loading Indicator
 */
export const MODAL_LOADING_INDICATOR_START = createAction(
	RootOperationsEnum.MODAL_LOADING_INDICATOR_START
);

/**
 * @description Root action - Stop Modal Loading Indicator
 */
export const MODAL_LOADING_INDICATOR_STOP = createAction(
	RootOperationsEnum.MODAL_LOADING_INDICATOR_STOP,
);

/**
 * @description Root action - Select Preferred Language
 */
export const SELECT_PREFERRED_LANGUAGE = createAction(
	RootOperationsEnum.SELECT_PREFERRED_LANGUAGE,
	props<{ payload: string }>()
);


/**
 * @description Root action - Store Preferred Language
 */
export const STORE_PREFERRED_LANGUAGE = createAction(
	RootOperationsEnum.STORE_PREFERRED_LANGUAGE,
	props<{ payload: string }>()
);

/**
 * @description Root action - Store Logged In User Details
 */
export const STORE_LOGGED_IN_USER_DETAILS = createAction(
	RootOperationsEnum.STORE_LOGGED_IN_USER_DETAILS,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Store Update Logged In User Details
 */
 export const STORE_UPDATED_LOGGED_IN_USER_DETAILS = createAction(
	RootOperationsEnum.STORE_UPDATED_LOGGED_IN_USER_DETAILS,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Hydrate Initial Browser data
 */
export const HYDRATE_INITIAL_BROWSER_DATA = createAction(
	RootOperationsEnum.HYDRATE_INITIAL_BROWSER_DATA
);

/**
 * @description Root action - Api Request Sign In
 */
export const API_REQUEST_SIGN_IN = createAction(
	RootOperationsEnum.API_REQUEST_SIGN_IN,
	props<{ payload: UserModel }>()
);

/**
* @description Root action - Api Sign In Fail
*/
export const API_SIGN_IN_FAIL = createAction(
	RootOperationsEnum.API_SIGN_IN_FAIL
);

/**
 * @description Root action - Update User Logged In Status
 */
export const UPDATE_USER_LOGGED_IN_STATUS = createAction(
	RootOperationsEnum.UPDATE_USER_LOGGED_IN_STATUS,
	props<{ payload: OperationsEnum }>()
);

/**
 * @description Root action - Api Request Account Verification
 */
export const API_REQUEST_ACCOUNT_VERIFICATION = createAction(
	RootOperationsEnum.API_REQUEST_ACCOUNT_VERIFICATION,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Store Logged In User Details To Cookie
 */
export const STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE = createAction(
	RootOperationsEnum.STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Store Logged In User Details To Cookie
 */
 export const STORE_UPDATED_IN_USER_DETAILS_TO_COOKIE = createAction(
	RootOperationsEnum.STORE_UPDATED_IN_USER_DETAILS_TO_COOKIE,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Api Request Sign Up
 */
export const API_REQUEST_SIGN_UP = createAction(
	RootOperationsEnum.API_REQUEST_SIGN_UP,
	props<{ payload: UserModel }>()
);

/**
 * @description Root action - Start Study Timer
 */
export const STUDY_TIMER_START = createAction(
	RootOperationsEnum.STUDY_TIMER_START,
	props<{ payload: OperationsEnum }>()
);

/**
 * @description Root action - Stop Study Timer
 */
export const STUDY_TIMER_STOP = createAction(
	RootOperationsEnum.STUDY_TIMER_STOP,
	props<{ payload: OperationsEnum }>()
);

/**
* @description Root action - Store Study Timer Status
*/
export const STORE_STUDY_TIMER_STATUS = createAction(
	RootOperationsEnum.STORE_STUDY_TIMER_STATUS,
	props<{ payload: OperationsEnum }>()
);

/**
* @description Root action - Api Request Edit Logged In User 
*/
export const API_REQUEST_EDIT_LOGGED_IN_USER = createAction(
	RootOperationsEnum.API_REQUEST_EDIT_LOGGED_IN_USER,
	props<{ payload: UserModel }>()
);

/**
* @description Root action - Api Request Edit Logged In User Fail
*/
export const API_REQUEST_EDIT_LOGGED_IN_USER_FAIL = createAction(
	RootOperationsEnum.API_REQUEST_EDIT_LOGGED_IN_USER_FAIL
);


/**
 * @description Root action - No Operation
 */
export const NOOP = createAction(
	RootOperationsEnum.NOOP,
);

/**
 * @description Export all Root actions
 */
export const ROOT_ACTIONS = {
	LOADING_INDICATOR_START,
	LOADING_INDICATOR_STOP,
	MODAL_LOADING_INDICATOR_START,
	MODAL_LOADING_INDICATOR_STOP,
	SELECT_PREFERRED_LANGUAGE,
	STORE_PREFERRED_LANGUAGE,
	HYDRATE_INITIAL_BROWSER_DATA,
	STORE_LOGGED_IN_USER_DETAILS,
	STORE_UPDATED_LOGGED_IN_USER_DETAILS,
	API_REQUEST_SIGN_IN,
	API_SIGN_IN_FAIL,
	UPDATE_USER_LOGGED_IN_STATUS,
	API_REQUEST_ACCOUNT_VERIFICATION,
	STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE,
	STORE_UPDATED_IN_USER_DETAILS_TO_COOKIE,
	API_REQUEST_SIGN_UP,
	STUDY_TIMER_START,
	STUDY_TIMER_STOP,
	STORE_STUDY_TIMER_STATUS,
	API_REQUEST_EDIT_LOGGED_IN_USER,
	API_REQUEST_EDIT_LOGGED_IN_USER_FAIL,
	NOOP
};
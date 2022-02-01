/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:33:13 
 * Last modified  : 2022-01-14 18:33:13 
 */

import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/shared/model/user.model';
import { RootOperationsEnum } from './root-operations.enum';

/**
 * @description Root action - Start Loading Indicator
 */
export const LOADING_INDICATOR_START = createAction(
	RootOperationsEnum.LOADING_INDICATOR_START,
	props<{payload: string}>()
);

/**
 * @description Root action - Stop Loading Indicator
 */
export const LOADING_INDICATOR_STOP = createAction(
	RootOperationsEnum.LOADING_INDICATOR_STOP,
);

/**
 * @description Root action - Select Preferred Language
 */
 export const SELECT_PREFERRED_LANGUAGE = createAction(
	RootOperationsEnum.SELECT_PREFERRED_LANGUAGE,
	props<{payload: string}>()
);


/**
 * @description Root action - Store Preferred Language
 */
export const STORE_PREFERRED_LANGUAGE = createAction(
	RootOperationsEnum.STORE_PREFERRED_LANGUAGE,
	props<{payload: string}>()
);

/**
 * @description Root action - Store Logged In User Details
 */
export const STORE_LOGGED_IN_USER_DETAILS = createAction(
	RootOperationsEnum.STORE_LOGGED_IN_USER_DETAILS,
	props<{payload: UserModel}>()
);

/**
 * @description Root action - Hydrate Initial Browser data
 */
export const HYDRATE_INITIAL_BROWSER_DATA = createAction(
	RootOperationsEnum.HYDRATE_INITIAL_BROWSER_DATA
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
	SELECT_PREFERRED_LANGUAGE,
	STORE_PREFERRED_LANGUAGE,
	HYDRATE_INITIAL_BROWSER_DATA,
	STORE_LOGGED_IN_USER_DETAILS,
	NOOP
};
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
	NOOP
};
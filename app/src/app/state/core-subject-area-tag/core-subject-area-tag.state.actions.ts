/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core Subject Area Tag State Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 18:16:13 
 * Last modified  : 2022-09-26 14:26:53
 */

import { createAction, props } from '@ngrx/store';
import { CoreSubjectAreaTagModel } from 'src/app/shared/model/core-subject-area-tag.model';
import { CoreSubjectAreaTagOperationsEnum } from './core-subject-area-tag-operations.enum';


/**
 * @description Core Subject Area Tag Action - Api Request Core Subject Area Tag
 */
export const API_REQUEST_CORE_SUBJECT_AREA_TAG = createAction(
	CoreSubjectAreaTagOperationsEnum.API_REQUEST_CORE_SUBJECT_AREA_TAG
);

/**
 * @description Core Subject Area Tag Action - Loaded Core Subject Area Tag
 */
export const LOADED_REQUEST_CORE_SUBJECT_AREA_TAG = createAction(
	CoreSubjectAreaTagOperationsEnum.LOADED_REQUEST_CORE_SUBJECT_AREA_TAG,
	props<{ payload: CoreSubjectAreaTagModel[] }>()
);

/**
 * @description Core Subject Area Tag Action - Store Newly Added Core Subject Area Tag
 */
export const STORE_NEWLY_ADDED_CORE_SUBJECT_AREA_TAG = createAction(
	CoreSubjectAreaTagOperationsEnum.STORE_NEWLY_ADDED_CORE_SUBJECT_AREA_TAG,
	props<{ payload: CoreSubjectAreaTagModel }>()
);

/**
 * @description Core Subject Area Tag Action - Core Subject Area Tag Added Successfully
 */
export const CORE_SUBJECT_AREA_TAG_ADDED_SUCCESS = createAction(
	CoreSubjectAreaTagOperationsEnum.CORE_SUBJECT_AREA_TAG_ADDED_SUCCESS
);

/**
 * @description Core Subject Area Tag Action - No Operation
 */
export const NOOP = createAction(
	CoreSubjectAreaTagOperationsEnum.NOOP,
);

/**
 * @description Export all Core Subject Area Tag
 */
export const CORE_SUBJECT_AREA_TAG_ACTIONS = {
	API_REQUEST_CORE_SUBJECT_AREA_TAG,
	LOADED_REQUEST_CORE_SUBJECT_AREA_TAG,
	STORE_NEWLY_ADDED_CORE_SUBJECT_AREA_TAG,
	CORE_SUBJECT_AREA_TAG_ADDED_SUCCESS,
	NOOP,
};
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core Subject Area State Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 18:16:13 
 * Last modified  : 2022-09-26 14:26:53
 */

import { createAction, props } from '@ngrx/store';
import { CoreSubjectAreaModel } from 'src/app/shared/model/core-subject-area.model';
import { CoreSubjectAreaOperationsEnum } from './core-subject-area-operations.enum';


/**
 * @description Core Subject Area Action - Api Request Core Subject Area
 */
export const API_REQUEST_CORE_SUBJECT_AREA = createAction(
	CoreSubjectAreaOperationsEnum.API_REQUEST_CORE_SUBJECT_AREA
);

/**
 * @description Core Subject Area Action - Loaded Core Subject Area
 */
export const LOADED_REQUEST_CORE_SUBJECT_AREA = createAction(
	CoreSubjectAreaOperationsEnum.LOADED_REQUEST_CORE_SUBJECT_AREA,
	props<{ payload: CoreSubjectAreaModel[] }>()
);

/**
 * @description Core Subject Area Action - Store Newly Added Core Subject Area
 */
export const STORE_NEWLY_ADDED_CORE_SUBJECT_AREA = createAction(
	CoreSubjectAreaOperationsEnum.STORE_NEWLY_ADDED_CORE_SUBJECT_AREA,
	props<{ payload: CoreSubjectAreaModel }>()
);

/**
 * @description Core Subject Area Action - Core Subject Area Added Successfully
 */
export const CORE_SUBJECT_AREA_ADDED_SUCCESS = createAction(
	CoreSubjectAreaOperationsEnum.CORE_SUBJECT_AREA_ADDED_SUCCESS
);

/**
 * @description Core Subject Area Action - No Operation
 */
export const NOOP = createAction(
	CoreSubjectAreaOperationsEnum.NOOP,
);

/**
 * @description Export all Core Subject Area
 */
export const CORE_SUBJECT_AREA_ACTIONS = {
	API_REQUEST_CORE_SUBJECT_AREA,
	LOADED_REQUEST_CORE_SUBJECT_AREA,
	STORE_NEWLY_ADDED_CORE_SUBJECT_AREA,
	CORE_SUBJECT_AREA_ADDED_SUCCESS,
	NOOP,
};
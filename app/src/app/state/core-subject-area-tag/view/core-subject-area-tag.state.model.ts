/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:23:54 
 * Last modified  : 2022-09-26 14:24:52
 */



import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Selects core subject area id
 * @param coreSubjectAreaTagModel 
 * @returns core subject area id 
 */
export function selectCoreSubjectAreaTagId(coreSubjectAreaTagModel: CoreSubjectAreaTagModel): string
{
	return coreSubjectAreaTagModel.subjectAreaTagId ? coreSubjectAreaTagModel.subjectAreaTagId : '';
}

/**
 * @description Core subject area tag model
 */
export interface CoreSubjectAreaTagStateModel extends EntityState<CoreSubjectAreaTagModel> { }

/**
 * @description Core subject area tag adapter
 */
export const coreSubjectAreaTagAdapter: EntityAdapter<CoreSubjectAreaTagModel> = createEntityAdapter<CoreSubjectAreaTagModel>({
	selectId: selectCoreSubjectAreaTagId
});

/**
 * @description Initial core subject area initial state
 */
export const INITIAL_CORE_SUBJECT_AREA_TAG_STATE: CoreSubjectAreaTagStateModel = coreSubjectAreaTagAdapter.getInitialState();
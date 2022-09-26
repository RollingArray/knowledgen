/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:23:54 
 * Last modified  : 2022-09-26 14:24:52
 */



import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Selects core subject area id
 * @param coreSubjectAreaModel 
 * @returns core subject area id 
 */
export function selectCoreSubjectAreaId(coreSubjectAreaModel: CoreSubjectAreaModel): string
{
	return coreSubjectAreaModel.subjectAreaId ? coreSubjectAreaModel.subjectAreaId : '';
}

/**
 * @description Core subject area model
 */
export interface CoreSubjectAreaStateModel extends EntityState<CoreSubjectAreaModel> { }

/**
 * @description Core subject area adapter
 */
export const coreSubjectAreaAdapter: EntityAdapter<CoreSubjectAreaModel> = createEntityAdapter<CoreSubjectAreaModel>({
	selectId: selectCoreSubjectAreaId
});

/**
 * @description Initial core subject area initial state
 */
export const INITIAL_CORE_SUBJECT_AREA_STATE: CoreSubjectAreaStateModel = coreSubjectAreaAdapter.getInitialState();
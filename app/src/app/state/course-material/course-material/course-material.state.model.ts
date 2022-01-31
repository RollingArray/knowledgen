/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-14 19:30:21
 */



import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Selects course material id
 * @param courseMaterialModel 
 * @returns course material id 
 */
export function selectCourseMaterialId(courseMaterialModel: CourseMaterialModel): string
{
	return courseMaterialModel.courseMaterialId ? courseMaterialModel.courseMaterialId : '';
}

/**
 * @description Course material model
 */
export interface CourseMaterialStateModel extends EntityState<CourseMaterialModel> { }

/**
 * @description Course material adapter
 */
export const courseMaterialAdapter: EntityAdapter<CourseMaterialModel> = createEntityAdapter<CourseMaterialModel>({
	selectId: selectCourseMaterialId
});

/**
 * @description Initial course material initial state
 */
export const INITIAL_COURSE_MATERIAL_STATE: CourseMaterialStateModel = courseMaterialAdapter.getInitialState();
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:09:17
 */


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseMaterialQuizModel } from 'src/app/shared/model/course-material-quiz.model';

/**
 * Selects course material quiz id
 * @param courseMaterialQuizModel 
 * @returns course material quiz id 
 */
export function selectCourseMaterialQuizId(courseMaterialQuizModel: CourseMaterialQuizModel): string
{
	return courseMaterialQuizModel.questionId ? courseMaterialQuizModel.questionId : '';
}

/**
 * Course material quiz state model
 */
export interface CourseMaterialQuizStateModel extends EntityState<CourseMaterialQuizModel> { }

/**
 * @description Course material quiz adapter
 */
export const courseMaterialQuizAdapter: EntityAdapter<CourseMaterialQuizModel> = createEntityAdapter<CourseMaterialQuizModel>({
	selectId: selectCourseMaterialQuizId
});

/**
 * @description Initial course material quiz initial state
 */
export const INITIAL_COURSE_MATERIAL_QUIZ_STATE: CourseMaterialQuizStateModel = courseMaterialQuizAdapter.getInitialState();
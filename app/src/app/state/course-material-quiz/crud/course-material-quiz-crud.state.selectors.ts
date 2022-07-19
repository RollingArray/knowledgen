/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-19 18:42:20
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { CourseMaterialQuizModel } from 'src/app/shared/model/course-material-quiz.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { CourseMaterialQuizCrudStateModel } from './course-material-quiz-crud.state.model';
import { COURSE_MATERIAL_QUIZ_CRUD_FEATURE_KEY } from './course-material-quiz-crud.state.reducer';

/**
 * @description get operation status
 */
const getOperationStatus = (courseMaterialQuizCrudStateModel: CourseMaterialQuizCrudStateModel): OperationsEnum => courseMaterialQuizCrudStateModel.operationStatus;

/**
 * @description get operation course material quiz
 */
const getOperationCourseMaterialQuiz = (courseMaterialQuizCrudStateModel: CourseMaterialQuizCrudStateModel): CourseMaterialQuizModel => courseMaterialQuizCrudStateModel.operationCourseMaterialQuiz;

/**
 * @description Selector - course material quiz crud state
 */
export const selectCourseMaterialQuizCrudState: MemoizedSelector<CourseMaterialQuizCrudStateModel, CourseMaterialQuizCrudStateModel>  = createFeatureSelector<CourseMaterialQuizCrudStateModel>(COURSE_MATERIAL_QUIZ_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<CourseMaterialQuizCrudStateModel, OperationsEnum> = createSelector(
	selectCourseMaterialQuizCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation course material quiz
 */
export const selectOperationCourseMaterialQuiz: MemoizedSelector<CourseMaterialQuizCrudStateModel, CourseMaterialQuizModel> = createSelector(
	selectCourseMaterialQuizCrudState,
	getOperationCourseMaterialQuiz
);

/**
 * @description export course material quiz crud query to access all selectors
 */
export const COURSE_MATERIAL_QUIZ_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationCourseMaterialQuiz
};
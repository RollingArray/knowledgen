/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:08:38
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";

/**
 * Course material quiz crud state model
 */
export interface CourseMaterialQuizCrudStateModel {
	operationStatus: OperationsEnum;
	operationCourseMaterialQuiz: CourseMaterialQuizModel;
}

/**
 * Course material quiz crud initial state
 */
export const COURSE_MATERIAL_QUIZ_CRUD_INITIAL_STATE: CourseMaterialQuizCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationCourseMaterialQuiz: {}
};
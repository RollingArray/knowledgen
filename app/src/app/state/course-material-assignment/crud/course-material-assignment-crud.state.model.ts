/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:18:30 
 * Last modified  : 2022-07-26 16:46:22
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";

/**
 * Course material assignment crud crud state model
 */
export interface CourseMaterialAssignmentCrudStateModel {
	operationStatus: OperationsEnum;
	operationCourseMaterialAssignmentResult: CourseMaterialAssignmentResultModel;
}

/**
 * Course material assignment crud initial state
 */
export const COURSE_MATERIAL_ASSIGNMENT_CRUD_INITIAL_STATE: CourseMaterialAssignmentCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationCourseMaterialAssignmentResult: {}
};
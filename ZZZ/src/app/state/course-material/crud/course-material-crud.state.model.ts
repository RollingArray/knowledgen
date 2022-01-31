/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-01-14 19:34:06
 */



import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";

/**
 * @description CourseMaterial crud state model
 */
export interface CourseMaterialCrudStateModel {
	operationStatus: OperationsEnum;
	operationCourseMaterial: CourseMaterialModel;
}

/**
 * @description CourseMaterial crud initial state
 */
export const COURSE_MATERIAL_CRUD_INITIAL_STATE: CourseMaterialCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationCourseMaterial: {}
};
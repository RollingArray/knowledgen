/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:35:45
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialFlashCardModel } from "src/app/shared/model/course-material-flash-card.model";

/**
 * Course material flash card crud state model
 */
export interface CourseMaterialFlashCardCrudStateModel {
	operationStatus: OperationsEnum;
	operationCourseMaterialFlashCard: CourseMaterialFlashCardModel;
}

/**
 * Course material flash card crud initial state
 */
export const COURSE_MATERIAL_FLASH_CARD_CRUD_INITIAL_STATE: CourseMaterialFlashCardCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationCourseMaterialFlashCard: {}
};
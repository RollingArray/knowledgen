/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment crud state selectors
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:28:40 
 * Last modified  : 2022-07-26 10:29:19
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";
import { CourseMaterialAssignmentCrudStateModel } from "./course-material-assignment-crud.state.model";
import { COURSE_MATERIAL_ASSIGNMENT_CRUD_FEATURE_KEY } from "./course-material-assignment-crud.state.reducer";

/**
 * @description get operation status
 */
const getOperationStatus = (courseMaterialAssignmentCrudStateModel: CourseMaterialAssignmentCrudStateModel): OperationsEnum => courseMaterialAssignmentCrudStateModel.operationStatus;

/**
 * @description get operation course material assignment
 */
const getOperationCourseMaterialAssignment = (courseMaterialAssignmentCrudStateModel: CourseMaterialAssignmentCrudStateModel): CourseMaterialAssignmentResultModel => courseMaterialAssignmentCrudStateModel.operationCourseMaterialAssignmentResult;

/**
 * @description Selector - course material assignment crud state
 */
export const selectCourseMaterialAssignmentCrudState: MemoizedSelector<CourseMaterialAssignmentCrudStateModel, CourseMaterialAssignmentCrudStateModel>  = createFeatureSelector<CourseMaterialAssignmentCrudStateModel>(COURSE_MATERIAL_ASSIGNMENT_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<CourseMaterialAssignmentCrudStateModel, OperationsEnum> = createSelector(
	selectCourseMaterialAssignmentCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation course material assignment
 */
export const selectOperationCourseMaterialAssignment: MemoizedSelector<CourseMaterialAssignmentCrudStateModel, CourseMaterialAssignmentResultModel> = createSelector(
	selectCourseMaterialAssignmentCrudState,
	getOperationCourseMaterialAssignment
);

/**
 * @description export course material assignment crud query to access all selectors
 */
export const COURSE_MATERIAL_ASSIGNMENT_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationCourseMaterialAssignment
};
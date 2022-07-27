/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 12:02:00 
 * Last modified  : 2022-07-26 14:05:43
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";
import { COURSE_MATERIAL_ASSIGNMENT_ACTIONS } from "./course-material-assignment.state.actions";
import { CourseMaterialAssignmentCrudStateModel } from "./crud/course-material-assignment-crud.state.model";
import { COURSE_MATERIAL_ASSIGNMENT_CRUD_QUERY_SELECTOR } from "./crud/course-material-assignment-crud.state.selectors";


/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialAssignmentStateFacade {

	/**
	 * Creates an instance of availability planner state facade.
	 * @param courseMaterialAssignmentResultStore 
	 * @param courseMaterialAssignmentResultCrudStore 
	 */
	constructor(
		private courseMaterialAssignmentCrudStore: Store<CourseMaterialAssignmentCrudStateModel>
	) { }

	/**
	 * Course material assignment result curd operation status$ of course material assignment state facade
	 */
	public courseMaterialAssignmentResultCurdOperationStatus$ = this.courseMaterialAssignmentCrudStore.select(COURSE_MATERIAL_ASSIGNMENT_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material assignment$ of course material assignment state facade
	 */
	public operationCourseMaterialAssignment$ = this.courseMaterialAssignmentCrudStore.select(COURSE_MATERIAL_ASSIGNMENT_CRUD_QUERY_SELECTOR.selectOperationCourseMaterialAssignment);

	/**
	 * Adds new course material assignment result
	 * @param courseMaterialAssignmentResult 
	 */
	public addNewCourseMaterialAssignmentResult(courseMaterialAssignmentResult: CourseMaterialAssignmentResultModel) {
		this.courseMaterialAssignmentCrudStore.dispatch(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL_ASSIGNMENT_RESULT({payload: courseMaterialAssignmentResult}));
	}

	/**
	 * Acts upon course material assignment
	 * @param courseMaterialAssignmentResult 
	 * @param operation 
	 */
	public actUponCourseMaterialAssignment(courseMaterialAssignmentResult: CourseMaterialAssignmentResultModel, operation: OperationsEnum) {
		this.courseMaterialAssignmentCrudStore.dispatch(COURSE_MATERIAL_ASSIGNMENT_ACTIONS.ACT_UPON_COURSE_MATERIAL_ASSIGNMENT_RESULT({payload: courseMaterialAssignmentResult, operation: operation}));
	}	
}

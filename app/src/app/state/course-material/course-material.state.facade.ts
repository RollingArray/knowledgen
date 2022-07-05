/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-07-05 14:49:57
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { COURSE_MATERIAL_ACTIONS } from "./course-material.state.actions";
import { CourseMaterialStateModel } from "./course-material/course-material.state.model";
import { COURSE_MATERIAL_QUERY_SELECTOR } from "./course-material/course-material.state.selectors";
import { CourseMaterialCrudStateModel } from "./crud/course-material-crud.state.model";
import { COURSE_MATERIAL_CRUD_QUERY_SELECTOR } from "./crud/course-material-crud.state.selectors";
import { Injectable } from "@angular/core";

/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialStateFacade
{

	/**
	 * Creates an instance of course material state facade.
	 * @param courseMaterialStore 
	 * @param courseMaterialCrudStore 
	 */
	constructor(
		private courseMaterialStore: Store<CourseMaterialStateModel>,
		private courseMaterialCrudStore: Store<CourseMaterialCrudStateModel>
	) { }

	/**
	 * All course material$ of course material state facade
	 */
	public allCourseMaterial$ = this.courseMaterialStore.select(COURSE_MATERIAL_QUERY_SELECTOR.selectAllCourseMaterial);

	/**
	 * Course material has data$ of course material state facade
	 */
	public courseMaterialHasData$ = this.courseMaterialStore.select(COURSE_MATERIAL_QUERY_SELECTOR.selectCourseMaterialHasData);

	/**
	 * Course material by course material id$ of course material state facade
	 */
	public courseMaterialByCourseMaterialId$ = (courseMaterialId: string) => this.courseMaterialStore.select(COURSE_MATERIAL_QUERY_SELECTOR.selectCourseMaterialByCourseMaterialId(courseMaterialId));

	/**
	 * Course material owner$ of course material state facade
	 */
	public courseMaterialOwner$ = (courseMaterialId: string) => this.courseMaterialStore.select(COURSE_MATERIAL_QUERY_SELECTOR.selectCourseMaterialOwner(courseMaterialId));

	/**
	 * Course material curd operation status$ of course material state facade
	 */
	public courseMaterialCurdOperationStatus$ = this.courseMaterialCrudStore.select(COURSE_MATERIAL_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material$ of course material model state facade
	 */
	public operationCourseMaterial$ = this.courseMaterialCrudStore.select(COURSE_MATERIAL_CRUD_QUERY_SELECTOR.selectOperationCourseMaterial);

	/**
	 * Requests course material
	 */
	public requestCourseMaterial()
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.API_REQUEST_COURSE_MATERIAL());
	}

	/**
	 * Requests recommended course material
	 */
	public requestRecommendedCourseMaterial()
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.API_REQUEST_RECOMMENDED_COURSE_MATERIAL());
	}

	/**
	 * Adds new course material
	 * @param courseMaterial 
	 */
	public addNewCourseMaterial(courseMaterial: CourseMaterialModel)
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.API_REQUEST_ADD_NEW_COURSE_MATERIAL({ payload: courseMaterial }));
	}

	/**
	 * Edits course material
	 * @param courseMaterial 
	 */
	public editCourseMaterial(courseMaterial: CourseMaterialModel)
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.API_REQUEST_EDIT_COURSE_MATERIAL({ payload: courseMaterial }));
	}

	/**
	 * Deletes course material
	 * @param courseMaterial 
	 */
	public deleteCourseMaterial(courseMaterial: CourseMaterialModel)
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.API_REQUEST_DELETE_COURSE_MATERIAL({ payload: courseMaterial }));
	}

	/**
	 * Acts upon course material
	 * @param courseMaterial 
	 * @param operation 
	 */
	public actUponCourseMaterial(courseMaterial: CourseMaterialModel, operation: OperationsEnum)
	{
		this.courseMaterialStore.dispatch(COURSE_MATERIAL_ACTIONS.ACT_UPON_COURSE_MATERIAL({ payload: courseMaterial, operation: operation }));
	}
}

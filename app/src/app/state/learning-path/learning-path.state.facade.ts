/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-08-08 17:47:03
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { LearningPathModel } from "src/app/shared/model/learning-path.model";
import { LEARNING_PATH_ACTIONS } from "./learning-path.state.actions";
import { LearningPathStateModel } from "./view/learning-path.state.model";
import { LEARNING_PATH_QUERY_SELECTOR } from "./view/learning-path.state.selectors";
import { LearningPathCrudStateModel } from "./crud/learning-path-crud.state.model";
import { LEARNING_PATH_CRUD_QUERY_SELECTOR } from "./crud/learning-path-crud.state.selectors";
import { Injectable } from "@angular/core";

/**
 * @description Injectable
 */
@Injectable()

export class LearningPathStateFacade
{

	/**
	 * Creates an instance of course material state facade.
	 * @param learningPathStore 
	 * @param learningPathCrudStore 
	 */
	constructor(
		private learningPathStore: Store<LearningPathStateModel>,
		private learningPathCrudStore: Store<LearningPathCrudStateModel>
	) { }

	/**
	 * All course material$ of course material state facade
	 */
	public allLearningPath$ = this.learningPathStore.select(LEARNING_PATH_QUERY_SELECTOR.selectAllLearningPath);

	/**
	 * Course material has data$ of course material state facade
	 */
	public learningPathHasData$ = this.learningPathStore.select(LEARNING_PATH_QUERY_SELECTOR.selectLearningPathHasData);

	/**
	 * Learning path total progress percentage$ of learning path state facade
	 */
	public learningPathTotalProgressPercentage$ = this.learningPathStore.select(LEARNING_PATH_QUERY_SELECTOR.selectLearningPathTotalProgressPercentage);

	
	/**
	 * Course material by course material id$ of course material state facade
	 */
	public learningPathByLearningPathId$ = (courseMaterialId: string) => this.learningPathStore.select(LEARNING_PATH_QUERY_SELECTOR.selectLearningPathByLearningPathId(courseMaterialId));

	/**
	 * Course material owner$ of course material state facade
	 */
	public learningPathOwner$ = (courseMaterialId: string) => this.learningPathStore.select(LEARNING_PATH_QUERY_SELECTOR.selectLearningPathOwner(courseMaterialId));

	/**
	 * Course material curd operation status$ of course material state facade
	 */
	public learningPathCurdOperationStatus$ = this.learningPathCrudStore.select(LEARNING_PATH_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation course material$ of course material model state facade
	 */
	public operationLearningPath$ = this.learningPathCrudStore.select(LEARNING_PATH_CRUD_QUERY_SELECTOR.selectOperationLearningPath);

	
	/**
	 * Requests course material
	 */
	public requestLearningPath()
	{
		this.learningPathStore.dispatch(LEARNING_PATH_ACTIONS.API_REQUEST_LEARNING_PATH());
	}

	/**
	 * Adds new course material
	 * @param learningPath 
	 */
	public addNewLearningPath(learningPath: LearningPathModel)
	{
		this.learningPathStore.dispatch(LEARNING_PATH_ACTIONS.API_REQUEST_ADD_NEW_LEARNING_PATH({ payload: learningPath }));
	}

	/**
	 * Deletes course material
	 * @param learningPath 
	 */
	public deleteLearningPath(learningPath: LearningPathModel)
	{
		this.learningPathStore.dispatch(LEARNING_PATH_ACTIONS.API_REQUEST_DELETE_LEARNING_PATH({ payload: learningPath }));
	}

	/**
	 * Acts upon course material
	 * @param learningPath 
	 * @param operation 
	 */
	public actUponLearningPath(learningPath: LearningPathModel, operation: OperationsEnum)
	{
		this.learningPathStore.dispatch(LEARNING_PATH_ACTIONS.ACT_UPON_LEARNING_PATH({ payload: learningPath, operation: operation }));
	}
}

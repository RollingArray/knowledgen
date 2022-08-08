/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state reducer
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-08-08 09:11:13
 */


import { createReducer, Action, on } from '@ngrx/store';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { LEARNING_PATH_ACTIONS } from '../learning-path.state.actions';
import { LearningPathCrudStateModel, LEARNING_PATH_CRUD_INITIAL_STATE } from './learning-path-crud.state.model';

/**
 * @description Object crud feature key
 */
export const LEARNING_PATH_CRUD_FEATURE_KEY = 'learningPathCrudState';

/**
 * @description Object crud reducer
 */
const reducer = createReducer(

	/**
	 * @description Object crud reducer initial state
	 */
	LEARNING_PATH_CRUD_INITIAL_STATE,

	/**
	 * @description Reducer for action - act upon object
	 */
	on(LEARNING_PATH_ACTIONS.ACT_UPON_LEARNING_PATH, (state, action) => ({
		...state,
		operationLearningPath: action.payload,
		operationStatus: action.operation
	})),

	/**
	 * @description Reducer for action - Request new object
	 */
	on(LEARNING_PATH_ACTIONS.API_REQUEST_ADD_NEW_LEARNING_PATH, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Request delete object
	 */
	on(LEARNING_PATH_ACTIONS.API_REQUEST_DELETE_LEARNING_PATH, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.REQUEST
	})),

	/**
	 * @description Reducer for action - Object added success
	 */
	on(LEARNING_PATH_ACTIONS.LEARNING_PATH_ADDED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object delete success
	 */
	on(LEARNING_PATH_ACTIONS.LEARNING_PATH_DELETED_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud success
	 */
	on(LEARNING_PATH_ACTIONS.LEARNING_PATH_CRUD_SUCCESS, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.SUCCESS
	})),

	/**
	 * @description Reducer for action - Object crud fail
	 */
	on(LEARNING_PATH_ACTIONS.LEARNING_PATH_CRUD_FAIL, (state, action) => ({
		...state,
		operationStatus: OperationsEnum.FAIL
	})),
);


/**
 * Courses material crud state reducer
 * @param state 
 * @param action 
 * @returns  
 */
export function learningPathCrudStateReducer(state: LearningPathCrudStateModel | undefined, action: Action) {
	return reducer(state, action);
}
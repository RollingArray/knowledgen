/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:32
 */

import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { CourseMaterialFlashCardModel } from 'src/app/shared/model/course-material-flash-card.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { CourseMaterialFlashCardCrudStateModel } from './course-material-flash-card-crud.state.model';
import { COURSE_MATERIAL_FLASH_CARD_CRUD_FEATURE_KEY } from './course-material-flash-card-crud.state.reducer';

/**
 * @description get operation status
 */
const getOperationStatus = (courseMaterialFlashCardCrudStateModel: CourseMaterialFlashCardCrudStateModel): OperationsEnum => courseMaterialFlashCardCrudStateModel.operationStatus;

/**
 * @description get operation course material flash card
 */
const getOperationCourseMaterialFlashCard = (courseMaterialFlashCardCrudStateModel: CourseMaterialFlashCardCrudStateModel): CourseMaterialFlashCardModel => courseMaterialFlashCardCrudStateModel.operationCourseMaterialFlashCard;

/**
 * @description Selector - course material flash card crud state
 */
export const selectCourseMaterialFlashCardCrudState: MemoizedSelector<CourseMaterialFlashCardCrudStateModel, CourseMaterialFlashCardCrudStateModel>  = createFeatureSelector<CourseMaterialFlashCardCrudStateModel>(COURSE_MATERIAL_FLASH_CARD_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<CourseMaterialFlashCardCrudStateModel, OperationsEnum> = createSelector(
	selectCourseMaterialFlashCardCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation course material flash card
 */
export const selectOperationCourseMaterialFlashCard: MemoizedSelector<CourseMaterialFlashCardCrudStateModel, CourseMaterialFlashCardModel> = createSelector(
	selectCourseMaterialFlashCardCrudState,
	getOperationCourseMaterialFlashCard
);

/**
 * @description export course material flash card crud query to access all selectors
 */
export const COURSE_MATERIAL_FLASH_CARD_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationCourseMaterialFlashCard
};
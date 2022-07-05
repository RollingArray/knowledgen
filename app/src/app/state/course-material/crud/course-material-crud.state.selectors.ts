/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material crud state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:32:01 
 * Last modified  : 2022-01-14 19:36:03
 */
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { OperationsEnum } from '../../../shared/enum/operations.enum';
import { CourseMaterialCrudStateModel } from './course-material-crud.state.model';
import { COURSE_MATERIAL_CRUD_FEATURE_KEY } from './course-material-crud.state.reducer';

/**
 * @description get operation status
 */
const getOperationStatus = (courseMaterialCrudStateModel: CourseMaterialCrudStateModel): OperationsEnum => courseMaterialCrudStateModel.operationStatus;

/**
 * @description get operation courseMaterial
 */
const getOperationCourseMaterial = (courseMaterialCrudStateModel: CourseMaterialCrudStateModel): CourseMaterialModel => courseMaterialCrudStateModel.operationCourseMaterial;

/**
 * @description Selector - Course Material crud state
 */
export const selectCourseMaterialCrudState: MemoizedSelector<CourseMaterialCrudStateModel, CourseMaterialCrudStateModel>  = createFeatureSelector<CourseMaterialCrudStateModel>(COURSE_MATERIAL_CRUD_FEATURE_KEY);

/**
 * @description Selector - Operation status
 */
export const selectOperationStatus: MemoizedSelector<CourseMaterialCrudStateModel, OperationsEnum> = createSelector(
	selectCourseMaterialCrudState,
	getOperationStatus
);

/**
 * @description Selector - Operation Course Material
 */
export const selectOperationCourseMaterial: MemoizedSelector<CourseMaterialCrudStateModel, CourseMaterialModel> = createSelector(
	selectCourseMaterialCrudState,
	getOperationCourseMaterial
);

/**
 * @description export courseMaterial crud query to access all selectors
 */
export const COURSE_MATERIAL_CRUD_QUERY_SELECTOR = {
	selectOperationStatus,
	selectOperationCourseMaterial
};
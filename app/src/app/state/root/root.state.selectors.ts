/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:39 
 * Last modified  : 2022-01-14 18:41:39 
 */



import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { RootStateModel } from './root.state.model';
import { ROOT_FEATURE_KEY } from './root.state.reducer';

/**
 * @description Get loading indicator status
 */
const getLoadingIndicatorStatus = (rootStateModel: RootStateModel): boolean => rootStateModel.loadingIndicatorStatus;

/**
 * @description Selector - Root state
 */
export const selectRootState: MemoizedSelector<RootStateModel, RootStateModel> = createFeatureSelector<RootStateModel>(ROOT_FEATURE_KEY);

/**
 * @description Selector - Loading indicator status
 */
export const selectLoadingIndicatorStatus: MemoizedSelector<RootStateModel, boolean> = createSelector(
	selectRootState,
	getLoadingIndicatorStatus
);

/**
 * export root state query to access all selectors
 */
export const ROOT_QUERY_SELECTOR = {
	selectLoadingIndicatorStatus
};
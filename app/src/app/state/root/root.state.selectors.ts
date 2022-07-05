/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:39 
 * Last modified  : 2022-07-05 16:58:53
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserModel } from 'src/app/shared/model/user.model';
import { RootStateModel } from './root.state.model';
import { ROOT_FEATURE_KEY } from './root.state.reducer';

/**
 * @description Selector - Root state
 */
export const selectRootState: MemoizedSelector<RootStateModel, RootStateModel> = createFeatureSelector<RootStateModel>(ROOT_FEATURE_KEY);

/**
 * @description Selector - Loading indicator status
 */
export const selectLoadingIndicatorStatus: MemoizedSelector<RootStateModel, boolean> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): boolean => rootStateModel.loadingIndicatorStatus
);

/**
 * @description Selector - Preferred Language
 */
export const selectPreferredLanguage: MemoizedSelector<RootStateModel, string> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): string => rootStateModel.preferredLanguage
);

/**
 * @description Selector - User logged in status
 */
export const selectUserLoggedInStatus: MemoizedSelector<RootStateModel, OperationsEnum> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): OperationsEnum => rootStateModel.userLoggedInStatus
);

/**
 * @description Selector - Logged in User
 */
export const selectLoggedInUser: MemoizedSelector<RootStateModel, UserModel> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): UserModel => rootStateModel.loggedInUser
);

/**
 * @description Selector - Logged in Userid
 */
export const selectLoggedInUserId: MemoizedSelector<RootStateModel, string> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): string => rootStateModel.loggedInUser.userId
);

/**
 * export root state query to access all selectors
 */
export const ROOT_QUERY_SELECTOR = {
	selectLoadingIndicatorStatus,
	selectPreferredLanguage,
	selectUserLoggedInStatus,
	selectLoggedInUser,
	selectLoggedInUserId
};
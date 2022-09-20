/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:41:39 
 * Last modified  : 2022-09-20 12:19:18
 */

import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
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
 * @description Selector - Modal loading indicator status
 */
export const selectModalLoadingIndicatorStatus: MemoizedSelector<RootStateModel, boolean> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): boolean => rootStateModel.modalLoadingIndicatorStatus
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
 * @description Selector - Logged in User id
 */
export const selectLoggedInUserId: MemoizedSelector<RootStateModel, string> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): string => rootStateModel.loggedInUser.userId
);

/**
 * @description Selector - Logged in User token
 */
 export const selectLoggedInUserToken: MemoizedSelector<RootStateModel, string> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): string => rootStateModel.loggedInUser.token
);

/**
 * @description Selector - Logged in User type
 */
export const selectLoggedInUserType: MemoizedSelector<RootStateModel, UserTypeEnum> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): UserTypeEnum => rootStateModel.loggedInUser.userType
);

/**
* @description Selector - If user teacher
*/
export const selectIfUserTeacher: MemoizedSelector<RootStateModel, boolean> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): boolean => rootStateModel.loggedInUser.userType === UserTypeEnum.Teacher ? true : false
);

/**
* @description Selector - If user student
*/
export const selectIfUserStudent: MemoizedSelector<RootStateModel, boolean> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): boolean => rootStateModel.loggedInUser.userType === UserTypeEnum.Student ? true : false
);

/**
 * @description Selector - Study timer status
 */
export const selectStudyTimerStatus: MemoizedSelector<RootStateModel, OperationsEnum> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): OperationsEnum => rootStateModel.studyTimerStatus
);



/**
 * @description Selector - Logged in user name
 */
export const selectLoggedInUserName: MemoizedSelector<RootStateModel, string> = createSelector(
	selectRootState,
	(rootStateModel: RootStateModel): string =>
	{
		const firstName = rootStateModel.loggedInUser.userFirstName;
		const lastName = rootStateModel.loggedInUser.userLastName;
		const firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
		const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1);

		return firstNameCapitalized + " " + lastNameCapitalized;
	}
);

/**
 * export root state query to access all selectors
 */
export const ROOT_QUERY_SELECTOR = {
	selectLoadingIndicatorStatus,
	selectModalLoadingIndicatorStatus,
	selectPreferredLanguage,
	selectUserLoggedInStatus,
	selectLoggedInUser,
	selectLoggedInUserId,
	selectStudyTimerStatus,
	selectLoggedInUserName,
	selectLoggedInUserType,
	selectIfUserTeacher,
	selectIfUserStudent,
	selectLoggedInUserToken
};
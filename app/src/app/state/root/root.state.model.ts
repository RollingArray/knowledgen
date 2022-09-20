/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:40:25 
 * Last modified  : 2022-09-20 15:40:07
 */

import { LANGUAGE_CODE } from "@angular/fire/compat/auth";
import { DEFAULT_LANGUAGE } from "@ngx-translate/core";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserModel } from "src/app/shared/model/user.model";

/**
 * @description Root state model
 */
export interface RootStateModel {
	loadingIndicatorStatus: boolean;
	modalLoadingIndicatorStatus: boolean;
	preferredLanguage: string,
	userLoggedInStatus: OperationsEnum,
	loggedInUser: UserModel,
	studyTimerStatus: OperationsEnum
}

/**
 * @description Root initial state
 */
export const INITIAL_ROOT_STATE: RootStateModel = {
	modalLoadingIndicatorStatus: false,
	loadingIndicatorStatus: false,
	preferredLanguage: ArrayKey.LANGUAGES[0].code,
	userLoggedInStatus: OperationsEnum.NOT_LOGGED_IN,
	loggedInUser: {},
	studyTimerStatus: OperationsEnum.END
};
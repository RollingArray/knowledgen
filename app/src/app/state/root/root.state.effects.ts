/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:39:06 
 * Last modified  : 2022-01-14 18:39:06 
 */



import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserModel } from 'src/app/shared/model/user.model';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ROOT_ACTIONS } from './root.state.actions';
import { RootStateFacade } from './root.state.facade';


@Injectable()
export class RootStateEffects
{

	/**
	 * Creates an instance of root state effects.
	 * @param actions$ 
	 * @param authStateFacade 
	 * @param appInsightsService 
	 * @param loadingIndicatorService 
	 */
	constructor(
		private actions$: Actions,
		private loadingService: LoadingService,
		private cookieService: CookieService,
		private userService: UserService, 
		private rootStateFacade: RootStateFacade,
		private toastService: ToastService
	) { }


	/**
	 * Hydrate in browser data$ of root state effects
	 */
	hydrateInBrowserData$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.HYDRATE_INITIAL_BROWSER_DATA
				),
				// merge all
				mergeMap((action) =>
				{
					// preferred language
					const preferredLanguage = this.cookieService.get(LocalStoreKey.LANGUAGE);

					// logged in user
					const loggedInUser: UserModel = {
						userId: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID),
						userFirstName: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME),
						userLastName: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_LAST_NAME),
						userEmail: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_EMAIL),
						userSkills: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_SKILLS)
					};

					return [
						ROOT_ACTIONS.STORE_PREFERRED_LANGUAGE({ payload: preferredLanguage }),
						ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: loggedInUser })
					];
				}),
			),
	);

	/**
	 * @description Start loading indicator$ of root state effects
	 */
	startLoadingIndicator$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.LOADING_INDICATOR_START
				),
				// merge all
				mergeMap((action) =>
				{
					this.loadingService.present(action.payload);
					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * @description Start loading indicator$ of root state effects
	 */
	stopLoadingIndicator$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.LOADING_INDICATOR_STOP
				),
				// merge all
				mergeMap((action) =>
				{
					this.loadingService.dismiss();
					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * Select preferred language$ of root state effects
	 */
	selectPreferredLanguage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.SELECT_PREFERRED_LANGUAGE
				),
				// merge all
				mergeMap((action) =>
				{
					this.cookieService.set(LocalStoreKey.LANGUAGE, action.payload);

					return [
						ROOT_ACTIONS.STORE_PREFERRED_LANGUAGE({ payload: action.payload })
					];
				}),
			),
	);

	/**
	 * Api request sign in$ of root state effects
	 */
	apiRequestSignIn$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.API_REQUEST_SIGN_IN
				),
				mergeMap(action =>
					this.userService.resendActivationCode(action.payload).pipe(
						mergeMap((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								this.toastService.presentToast(data.message[0]);

								// store newly added skill
								return [
									ROOT_ACTIONS.UPDATE_USER_LOGGED_IN_STATUS({ payload: OperationsEnum.SIGNED_IN_NOT_VERIFIED }),
									ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: action.payload })
								];
							}
							// response fail
							else {

								// if error message
								if (data.message)
								{
									data.message.map(eachMessage =>
									{
										this.toastService.presentToast(eachMessage);	
									})
								}

								return [ROOT_ACTIONS.API_SIGN_IN_FAIL()];
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:39:06 
 * Last modified  : 2022-09-20 19:44:55
 */



import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { UserModel } from 'src/app/shared/model/user.model';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';
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
						userSkills: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_SKILLS),
						userType: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE) as UserTypeEnum,
						token: this.cookieService.get(LocalStoreKey.LOGGED_IN_SESSION_ID)
					};

					return [
						ROOT_ACTIONS.STORE_PREFERRED_LANGUAGE({ payload: preferredLanguage }),
						ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: loggedInUser }),
						ROOT_ACTIONS.UPDATE_USER_LOGGED_IN_STATUS({ payload: OperationsEnum.SIGNED_IN_VERIFIED })
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
					// if loading has text
					if (action.payload !== '')
					{
						this.loadingService.present(action.payload);
					}
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
	 * Start modal loading indicator$ of root state effects
	 */
	startModalLoadingIndicator$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.MODAL_LOADING_INDICATOR_START
				),
				// merge all
				mergeMap((action) =>
				{
					// if any action
					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * Stop modal loading indicator$ of root state effects
	 */
	stopModalLoadingIndicator$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.MODAL_LOADING_INDICATOR_STOP
				),
				// merge all
				mergeMap((action) =>
				{
					// if any action
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
						mergeMap((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								this.toastService.presentToast(data.message[0]);

								// store newly added skill
								return [
									ROOT_ACTIONS.UPDATE_USER_LOGGED_IN_STATUS({ payload: OperationsEnum.SIGNED_IN_NOT_VERIFIED }),
									ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: action.payload })
								];
							}
							// response fail
							else
							{

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

	/**
	 * Api request account activation$ of root state effects
	 */
	apiRequestAccountActivation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.API_REQUEST_ACCOUNT_VERIFICATION
				),
				mergeMap(action =>
					this.userService.signIn(action.payload).pipe(
						mergeMap((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{


								const userModel: UserModel = {
									userType: data.data.userType,
									userId: data.data.userId,
									token: data.token,
									userEmail: data.data.userEmail,
									userFirstName: data.data.userFirstName,
									userLastName: data.data.userLastName,
									userSkills: data.data.userSkills,
								};

								// store newly added skill
								return [
									ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE({ payload: userModel }),
									ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: userModel }),
									ROOT_ACTIONS.UPDATE_USER_LOGGED_IN_STATUS({ payload: OperationsEnum.SIGNED_IN_VERIFIED })
								];
							}
							// response fail
							else
							{

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

	/**
	 * Api request edit logged in user$ of root state effects
	 */
	apiRequestEditLoggedInUser$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.API_REQUEST_EDIT_LOGGED_IN_USER
				),
				mergeMap(action =>
					this.userService.userProfileUpdate(action.payload).pipe(
						mergeMap((data) =>
						{
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success)
							{
								const userModel: UserModel = {
									userType: data.resource.userType,
									userId: data.resource.userId,
									token: data.token,
									userEmail: data.resource.userEmail,
									userFirstName: data.resource.userFirstName,
									userLastName: data.resource.userLastName,
									userSkills: data.resource.userSkills,
								};

								// store newly added skill
								return [
									ROOT_ACTIONS.STORE_UPDATED_LOGGED_IN_USER_DETAILS_TO_COOKIE({ payload: userModel }),
									ROOT_ACTIONS.STORE_UPDATED_LOGGED_IN_USER_DETAILS({ payload: userModel }),
								];
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									data.message.map(eachMessage =>
									{
										this.toastService.presentToast(eachMessage);
									})
								}

								return [ROOT_ACTIONS.API_REQUEST_EDIT_LOGGED_IN_USER_FAIL()];
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Store logged in user to cookie$ of root state effects
	 */
	storeLoggedInUserToCookie$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS_TO_COOKIE
				),
				// merge all
				mergeMap((action) =>
				{
					const path = { path: environment.domain };

					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_TYPE, action.payload.userType, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_ID, action.payload.userId, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, action.payload.userFirstName, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, action.payload.userLastName, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_EMAIL, action.payload.userEmail, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_SKILLS, action.payload.userSkills, path);

					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * Store updated logged in user to cookie$ of root state effects
	 */
	storeUpdatedLoggedInUserToCookie$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.STORE_UPDATED_LOGGED_IN_USER_DETAILS_TO_COOKIE
				),
				// merge all
				mergeMap((action) =>
				{
					const path = { path: environment.domain };

					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, action.payload.userFirstName, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, action.payload.userLastName, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_EMAIL, action.payload.userEmail, path);
					this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_SKILLS, action.payload.userSkills, path);

					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * Api request sign in$ of root state effects
	 */
	apiRequestSignUp$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.API_REQUEST_SIGN_UP
				),
				mergeMap(action =>
					this.userService.signUp(action.payload).pipe(
						mergeMap((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								this.toastService.presentToast(data.message[0]);

								// store newly added skill
								return [
									ROOT_ACTIONS.UPDATE_USER_LOGGED_IN_STATUS({ payload: OperationsEnum.SIGNED_UP }),
									ROOT_ACTIONS.STORE_LOGGED_IN_USER_DETAILS({ payload: action.payload })
								];
							}
							// response fail
							else
							{

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

	/**
	 * Start study timer$ of root state effects
	 */
	startStudyTimer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.STUDY_TIMER_START
				),
				// merge all
				mergeMap((action) =>
				{
					return [
						ROOT_ACTIONS.STORE_STUDY_TIMER_STATUS({ payload: action.payload })
					];
				}),
			),
	);

	/**
	 * Stop study timer$ of root state effects
	 */
	stopStudyTimer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.STUDY_TIMER_STOP
				),
				// merge all
				mergeMap((action) =>
				{
					return [
						ROOT_ACTIONS.STORE_STUDY_TIMER_STATUS({ payload: action.payload })
					];
				}),
			),
	);

	/**
	 * Store updated user token$ of root state effects
	 */
	storeUpdatedUserToken$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.STORE_UPDATED_LOGGED_IN_USER_TOKEN
				),
				// merge all
				mergeMap((action) =>
				{
					const path = { path: environment.domain };

					this.cookieService.set(LocalStoreKey.LOGGED_IN_SESSION_ID, action.payload.token, path);
					
					return [
						ROOT_ACTIONS.STORE_UPDATED_LOGGED_IN_USER_TOKEN_TO_COOKIE({ payload: action.payload })
					];
				}),
			),
	);

	/**
	 * Delete logged in user of root state effects
	 */
	deleteLoggedInUser = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.REQUEST_SIGN_OUT
				),
				// merge all
				mergeMap((action) =>
				{
					return [
						ROOT_ACTIONS.DELETE_LOGGED_IN_USER_DETAILS_FROM_COOKIE(),
						ROOT_ACTIONS.DELETE_LOGGED_IN_USER_DETAILS_FROM_STORE()
					];
				}),
			),
	 );
	
	/**
	 * Delete logged in user from cookie$ of root state effects
	 */
	deleteLoggedInUserFromCookie$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.DELETE_LOGGED_IN_USER_DETAILS_FROM_COOKIE
				),
				// merge all
				mergeMap((action) =>
				{
					const path = { path: environment.domain };
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_ID, path.path);
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, path.path);
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, path.path);
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_EMAIL, path.path);
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_SKILLS, path.path);
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_SESSION_ID, path.path);  
					this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_TYPE, path.path);  

					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);

	/**
	 * Delete logged in user from store$ of root state effects
	 */
	deleteLoggedInUserFromStore$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ROOT_ACTIONS.DELETE_LOGGED_IN_USER_DETAILS_FROM_STORE
				),
				// merge all
				mergeMap((action) =>
				{
					//reload window 
					window.location.reload()
					
					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);
}

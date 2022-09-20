/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:39:39 
 * Last modified  : 2022-09-20 08:17:24
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { UserModel } from 'src/app/shared/model/user.model';
import { ROOT_ACTIONS } from './root.state.actions';
import { RootStateModel } from './root.state.model';
import { ROOT_QUERY_SELECTOR } from './root.state.selectors';


@Injectable()
export class RootStateFacade {

	/**
	 * @description Loading indicator status$ of auth state facade
	 */
	loadingIndicatorStatus$ = this.store.select(ROOT_QUERY_SELECTOR.selectLoadingIndicatorStatus);

	/**
	 * Modal loading indicator status$ of root state facade
	 */
	modalLoadingIndicatorStatus$ = this.store.select(ROOT_QUERY_SELECTOR.selectModalLoadingIndicatorStatus);

	/**
	 * Preferred language$ of root state facade
	 */
	preferredLanguage$ = this.store.select(ROOT_QUERY_SELECTOR.selectPreferredLanguage);

	/**
	 * Select user logged in status$ of root state facade
	 */
	selectUserLoggedInStatus$ = this.store.select(ROOT_QUERY_SELECTOR.selectUserLoggedInStatus);
	
	/**
	 * Select logged in user$ of root state facade
	 */
	loggedInUser$ = this.store.select(ROOT_QUERY_SELECTOR.selectLoggedInUser);
	
	/**
	 * Logged in user id$ of root state facade
	 */
	loggedInUserId$ = this.store.select(ROOT_QUERY_SELECTOR.selectLoggedInUserId);

	/**
	 * Study timer status$ of root state facade
	 */
	studyTimerStatus$ = this.store.select(ROOT_QUERY_SELECTOR.selectStudyTimerStatus);

	/**
	 * Logged in user name$ of root state facade
	 */
	loggedInUserName$ = this.store.select(ROOT_QUERY_SELECTOR.selectLoggedInUserName);
	
	/**
	 * Creates an instance of auth state facade.
	 * @param store 
	 */
	constructor(private store: Store<RootStateModel>) { }

	/**
	 * @description Starts loading
	 */
	public startLoading(message: string) {
		this.store.dispatch(ROOT_ACTIONS.LOADING_INDICATOR_START({payload: message}));
	}

	/**
	 * @description Stops loading
	 */
	public stopLoading() {
		this.store.dispatch(ROOT_ACTIONS.LOADING_INDICATOR_STOP());
	}

	/**
	 * Starts modal loading
	 */
	public startModalLoading() {
		this.store.dispatch(ROOT_ACTIONS.MODAL_LOADING_INDICATOR_START());
	}

	/**
	 * Stops modal loading
	 */
	public stopModalLoading() {
		this.store.dispatch(ROOT_ACTIONS.MODAL_LOADING_INDICATOR_STOP());
	}

	/**
	 * Sets preferred language
	 * @param languageMode 
	 */
	public setPreferredLanguage(languageMode: string) {
		this.store.dispatch(ROOT_ACTIONS.SELECT_PREFERRED_LANGUAGE({payload: languageMode}));
	}

	/**
	 * Hydrates in browser data
	 */
	public hydrateInBrowserData() {
		this.store.dispatch(ROOT_ACTIONS.HYDRATE_INITIAL_BROWSER_DATA());
	}

	/**
	 * Signs in
	 * @param user 
	 */
	public signIn(user: UserModel) {
		this.store.dispatch(ROOT_ACTIONS.API_REQUEST_SIGN_IN({payload: user}));
	}

	/**
	 * Accounts verification
	 * @param user 
	 */
	public accountVerification(user: UserModel) {
		this.store.dispatch(ROOT_ACTIONS.API_REQUEST_ACCOUNT_VERIFICATION({payload: user}));
	}

	/**
	 * Starts study timer
	 * @param operation 
	 */
	public startStudyTimer(operation: OperationsEnum) {
		this.store.dispatch(ROOT_ACTIONS.STUDY_TIMER_START({payload: operation}));
	}

	/**
	 * Stops study timer
	 * @param operation 
	 */
	public stopStudyTimer(operation: OperationsEnum) {
		this.store.dispatch(ROOT_ACTIONS.STUDY_TIMER_STOP({payload: operation}));
	}

	/**
	 * Signs up
	 * @param user 
	 */
	public signUp(user: UserModel) {
		this.store.dispatch(ROOT_ACTIONS.API_REQUEST_SIGN_UP({payload: user}));
	}

	/**
	 * Users profile update
	 * @param user 
	 */
	public userProfileUpdate(user: UserModel)
	{
		console.log("a");
		this.store.dispatch(ROOT_ACTIONS.API_REQUEST_EDIT_LOGGED_IN_USER({payload: user}));
	}

}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:39:39 
 * Last modified  : 2022-01-14 18:39:39 
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
	 * Preferred language$ of root state facade
	 */
	preferredLanguage$ = this.store.select(ROOT_QUERY_SELECTOR.selectPreferredLanguage);

	/**
	 * Select user logged in status$ of root state facade
	 */
	selectUserLoggedInStatus$ = this.store.select(ROOT_QUERY_SELECTOR.selectUserLoggedInStatus);
	
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

}

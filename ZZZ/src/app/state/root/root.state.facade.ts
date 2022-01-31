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
}

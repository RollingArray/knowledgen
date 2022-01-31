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
import { mergeMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ROOT_ACTIONS } from './root.state.actions';


@Injectable()
export class RootStateEffects {

	/**
	 * Creates an instance of root state effects.
	 * @param actions$ 
	 * @param authStateFacade 
	 * @param appInsightsService 
	 * @param loadingIndicatorService 
	 */
	constructor(
		private actions$: Actions,
		private loadingService: LoadingService
	) { }

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
				mergeMap((action) => {
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
				mergeMap((action) => {
					this.loadingService.dismiss();
					return [
						ROOT_ACTIONS.NOOP()
					];
				}),
			),
	);
}

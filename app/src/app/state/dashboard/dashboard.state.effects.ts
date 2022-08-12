/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-08-12 20:15:47
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { DashboardService } from "src/app/shared/service/dashboard.service";
import { DASHBOARD_ACTIONS } from "./dashboard.state.actions";


@Injectable()
export class DashboardStateEffects {
	/**
	 * Creates an instance of dashboard state effects.
	 * @param actions$ 
	 * @param dashboardService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private dashboardService: DashboardService,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Api request student dashboard$ of dashboard state effects
	 */
	apiRequestStudentDashboard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					DASHBOARD_ACTIONS.API_REQUEST_DASHBOARD_STUDENT
				),
				mergeMap(action =>

					this.dashboardService.getDashboardStudent().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success)
							{
								// store retrieved categories
								return DASHBOARD_ACTIONS.LOADED_REQUEST_DASHBOARD_STUDENT({ payload: data.data.data });
							}

							// response fail
							else {
								return DASHBOARD_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

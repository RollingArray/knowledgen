/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:06:25 
 * Last modified  : 2022-09-26 14:27:00
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { CoreSubjectAreaService } from "src/app/shared/service/core-subject-area.service";
import { CORE_SUBJECT_AREA_ACTIONS } from "./core-subject-area.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";


@Injectable()
export class CoreSubjectAreaStateEffects {
	
	/**
	 * Creates an instance of core subject area state effects.
	 * @param actions$ 
	 * @param coreSubjectAreaService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private coreSubjectAreaService: CoreSubjectAreaService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * Api request core subject area$ of core subject area state effects
	 */
	apiRequestCoreSubjectArea$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					CORE_SUBJECT_AREA_ACTIONS.API_REQUEST_CORE_SUBJECT_AREA
				),
				mergeMap(action =>

					this.coreSubjectAreaService.getCoreSubjectArea().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success)
							{
								// store retrieved data
								return CORE_SUBJECT_AREA_ACTIONS.LOADED_REQUEST_CORE_SUBJECT_AREA({ payload: data.data });
							}

							// response fail
							else {
								return CORE_SUBJECT_AREA_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

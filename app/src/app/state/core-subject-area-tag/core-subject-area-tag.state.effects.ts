/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:06:25 
 * Last modified  : 2022-09-26 14:27:00
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { CoreSubjectAreaTagService } from "src/app/shared/service/core-subject-area-tag.service";
import { CORE_SUBJECT_AREA_TAG_ACTIONS } from "./core-subject-area-tag.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";


@Injectable()
export class CoreSubjectAreaTagStateEffects {
	
	/**
	 * Creates an instance of core subject area state effects.
	 * @param actions$ 
	 * @param coreSubjectAreaTagService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private coreSubjectAreaTagService: CoreSubjectAreaTagService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * Api request core subject area$ of core subject area state effects
	 */
	apiRequestCoreSubjectAreaTag$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					CORE_SUBJECT_AREA_TAG_ACTIONS.API_REQUEST_CORE_SUBJECT_AREA_TAG
				),
				mergeMap(action =>

					this.coreSubjectAreaTagService.getCoreSubjectAreaTag().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success)
							{
								// store retrieved data
								return CORE_SUBJECT_AREA_TAG_ACTIONS.LOADED_REQUEST_CORE_SUBJECT_AREA_TAG({ payload: data.data });
							}

							// response fail
							else {
								return CORE_SUBJECT_AREA_TAG_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

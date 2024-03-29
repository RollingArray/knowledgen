/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:56:15 
 * Last modified  : 2022-07-05 12:00:04
 */



import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, takeUntil, take } from "rxjs/operators";
import { REVISION_ACTIONS } from "./revision.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { ArticleRevisionService } from "src/app/shared/service/article-revision.service";
import { ArticleRevisionModel } from "src/app/shared/model/article-revision.model";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class RevisionStateEffects {
	categoriesService: any;
	categoryService: any;

	/**
	 * Creates an instance of revision state effects.
	 * @param actions$ 
	 * @param articleRevisionService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private articleRevisionService: ArticleRevisionService,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private toastService: ToastService
	)
	{
		//
	 }


	/**
	 * Api request availability planner$ of availability planner state effects
	 */
	apiRequestRevision$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					REVISION_ACTIONS.API_REQUEST_REVISION
				),
				mergeMap(action =>

					this.articleRevisionService.getArticleRevision(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success) {
								// store retrieved categories

								const model: ArticleRevisionModel = {
									articleRevisionDate: action.payload.articleRevisionDate,
									articles: data.data.data
								}
								return REVISION_ACTIONS.LOADED_REQUEST_REVISION({ payload: model });
							}

							// response fail
							else {
								return REVISION_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Api request availability planner$ of availability planner state effects
	 */
	 apiRequestAddRevision$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					REVISION_ACTIONS.API_REQUEST_ADD_REVISION
				),
				mergeMap(action =>

					this.articleRevisionService.crudArticleRevision(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success) {
								// show tost
								this.translateService
								.get('response.articleRevision')
								.pipe(take(1))
								.subscribe(async (data: string) =>
								{
									// success response
									this.toastService.presentToast(
										data
									);
								});
							}

							// response fail
							else {
								return REVISION_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:01:49 
 * Last modified  : 2022-08-04 20:14:25
 */

import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { ARTICLE_SESSION_ACTIONS } from "./article-session.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { ArticleSessionService } from "src/app/shared/service/article-session.service";


@Injectable()
export class ArticleSessionStateEffects {
	
	/**
	 * Creates an instance of course material assignment state effects.
	 * @param actions$ 
	 * @param courseMaterialAssignmentService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private articleSessionService: ArticleSessionService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Api request article sessions$ of article session state effects
	 */
	apiRequestArticleSessions$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_SESSION_ACTIONS.API_REQUEST_ARTICLE_SESSIONS
				),
				mergeMap(action =>

					this.articleSessionService.getArticleSessions(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{
								// store objects
								return ARTICLE_SESSION_ACTIONS.LOADED_REQUEST_ARTICLE_SESSIONS({ payload: data.data });
							}


							// response fail
							else {
								return ARTICLE_SESSION_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	 );
	
	/**
	 * Add new article session$ of article session state effects
	 */
	addNewArticleSession$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_SESSION_ACTIONS.API_REQUEST_ADD_NEW_ARTICLE_SESSION
				),
				mergeMap(action =>
					this.articleSessionService.crudArticleSession(action.payload).pipe(
						map((data) => {
							
							// stop loader
							this.rootStateFacade.stopLoading();
							
							// if success response
							if (data.success) {

								// store newly added object
								return ARTICLE_SESSION_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_SESSION({ payload: data.resource.data });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return ARTICLE_SESSION_ACTIONS.ARTICLE_SESSION_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete course material assignment result add operation$ of course material assignment state effects
	 */
	completeArticleSessionResultAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_SESSION_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_SESSION
				),
				map(action => ARTICLE_SESSION_ACTIONS.ARTICLE_SESSION_ADDED_SUCCESS()),
			),
	);
}

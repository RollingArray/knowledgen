/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:56:15 
 * Last modified  : 2022-09-20 15:09:46
 */



import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { ARTICLE_TEXT_DOCUMENT_ACTIONS } from "./article-text-document.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { ArticleTextDocumentService } from "src/app/shared/service/article-text-document.service";


@Injectable()
export class ArticleTextDocumentStateEffects {
	
	/**
	 * Creates an instance of article text document state effects.
	 * @param actions$ 
	 * @param articleTextDocumentService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private articleTextDocumentService: ArticleTextDocumentService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Api request Article Text Document state effects
	 */
	apiRequestArticleTextDocument$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ARTICLE_TEXT_DOCUMENT
				),
				mergeMap(action =>

					this.articleTextDocumentService.getArticleTextDocument(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.data.success && data.data.data.length !== 0)
							{
								// store retrieved categories
								return ARTICLE_TEXT_DOCUMENT_ACTIONS.LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT({ payload: data.data.data });
							}

							// response fail
							else {
								return ARTICLE_TEXT_DOCUMENT_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new Article Text Document state effects
	 */
	addNewArticleTextDocument$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT
				),
				mergeMap(action =>
					this.articleTextDocumentService.crudArticleTextDocument(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store newly added skill
								return ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT({ payload: data.resource });
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Edit Article Text Document$ of Article Text Document state effects
	 */
	editArticleTextDocument$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT
				),
				mergeMap(action =>
					this.articleTextDocumentService.crudArticleTextDocument(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success) {

								// store updated category
								return ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_UPDATED_ARTICLE_TEXT_DOCUMENT({ payload: action.payload });
								//return ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS();
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}
								return ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete Article Text Document add operation$ of Article Text Document state effects
	 */
	completeArticleTextDocumentAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT
				),
				map(action => ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete Article Text Document update operation$ of Article Text Document state effects
	 */
	completeArticleTextDocumentUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.STORE_UPDATED_ARTICLE_TEXT_DOCUMENT
				),
				map(action => ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete Article Text Document delete operation$ of Article Text Document state effects
	 */
	completeArticleTextDocumentDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE
				),
				map(action => ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS())
			),
	);

	/**
	 * Complete new skill curd operation$ of Article Text Document state effects
	 */
	completeNewSkillCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS,
					ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS,
					ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS
				),
				map(action => ARTICLE_TEXT_DOCUMENT_ACTIONS.ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS()),
			),
	);
}

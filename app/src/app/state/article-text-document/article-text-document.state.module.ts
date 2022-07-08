/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Availability planner state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-06 20:24:33
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ARTICLE_TEXT_DOCUMENT_CRUD_INITIAL_STATE } from './crud/article-text-document-crud.state.model';
import { articleTextDocumentCrudStateReducer, ARTICLE_TEXT_DOCUMENT_CRUD_FEATURE_KEY } from './crud/article-text-document-crud.state.reducer';
import { ArticleTextDocumentStateEffects } from './article-text-document.state.effects';
import { INITIAL_ARTICLE_TEXT_DOCUMENT_STATE } from './view/article-text-document.state.model';
import { ARTICLE_TEXT_DOCUMENT_FEATURE_KEY, articleTextDocumentStateReducer } from './view/article-text-document.state.reducer';
import { ArticleTextDocumentStateFacade } from './article-text-document.state.facade';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(ARTICLE_TEXT_DOCUMENT_FEATURE_KEY, articleTextDocumentStateReducer, {
			initialState: INITIAL_ARTICLE_TEXT_DOCUMENT_STATE
		}),

		StoreModule.forFeature(ARTICLE_TEXT_DOCUMENT_CRUD_FEATURE_KEY, articleTextDocumentCrudStateReducer, {
			initialState: ARTICLE_TEXT_DOCUMENT_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([ArticleTextDocumentStateEffects]),
	],
	providers: [
		ArticleTextDocumentStateFacade,
		ArticleTextDocumentStateEffects,
	]
})
export class ArticleTextDocumentStateModule { }

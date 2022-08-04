/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:58:07 
 * Last modified  : 2022-08-04 20:14:32
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ArticleSessionStateEffects } from "./article-session.state.effects";
import { ArticleSessionStateFacade } from "./article-session.state.facade";
import { INITIAL_ARTICLE_SESSION_STATE } from "./view/article-session.state.model";
import { articleSessionStateReducer, ARTICLE_SESSION_FEATURE_KEY } from "./view/article-session.state.reducer";

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(ARTICLE_SESSION_FEATURE_KEY, articleSessionStateReducer, {
			initialState: INITIAL_ARTICLE_SESSION_STATE
		}),

		EffectsModule.forFeature([ArticleSessionStateEffects]),
	],
	providers: [
		 ArticleSessionStateFacade,
		 ArticleSessionStateEffects,
	]
})
export class  ArticleSessionStateModule { }

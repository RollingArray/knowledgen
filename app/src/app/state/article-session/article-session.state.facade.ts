/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:52:39 
 * Last modified  : 2022-08-04 16:30:15
 */



import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ArticleSessionModel } from "src/app/shared/model/article-session.model";
import { ARTICLE_SESSION_ACTIONS } from "./article-session.state.actions";
import { ArticleSessionStateModel } from "./view/article-session.state.model";
import { ARTICLE_SESSION_QUERY_SELECTOR } from "./view/article-session.state.selectors";


/**
 * @description Injectable
 */
@Injectable()

export class ArticleSessionStateFacade
{

	/**
	 * Creates an instance of article session state facade.
	 * @param articleSessionStateModel 
	 */
	constructor(
		private articleSessionStateModel: Store<ArticleSessionStateModel>
	) { }

	
	/**
	 * Select article session has data$ of article session state facade
	 */
	public selectArticleSessionHasData$ = (articleId: string) => this.articleSessionStateModel.select(ARTICLE_SESSION_QUERY_SELECTOR.selectArticleSessionHasData(articleId));

	/**
	 * Select article session analysis$ of article session state facade
	 */
	public selectArticleSessionAnalysis$ = (articleId: string) => this.articleSessionStateModel.select(ARTICLE_SESSION_QUERY_SELECTOR.selectArticleSessionAnalysis(articleId));

	
	/**
	 * Select article session by article id$ of article session state facade
	 */
	public selectArticleSessionByArticleId$ = (articleId: string) => this.articleSessionStateModel.select(ARTICLE_SESSION_QUERY_SELECTOR.selectArticleSessionByArticleId(articleId));

	/**
	 * Requests course material
	 */
	public requestCourseMaterial(articleSessionModel: ArticleSessionModel)
	{
		this.articleSessionStateModel.dispatch(ARTICLE_SESSION_ACTIONS.API_REQUEST_ARTICLE_SESSIONS({ payload: articleSessionModel }));
	}

	/**
	 * Adds new article session
	 * @param articleSessionModel 
	 */
	public addNewArticleSession(articleSessionModel: ArticleSessionModel)
	{
		this.articleSessionStateModel.dispatch(ARTICLE_SESSION_ACTIONS.API_REQUEST_ADD_NEW_ARTICLE_SESSION({ payload: articleSessionModel }));
	}
}

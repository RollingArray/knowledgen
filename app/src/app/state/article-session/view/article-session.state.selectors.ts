/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state selectors
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:41:21 
 * Last modified  : 2022-08-04 19:32:32
 */



import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";
import { ArticleSessionAnalysisModel } from "src/app/shared/model/article-session-analysis.model";
import { articleSessionAdapter, ArticleSessionStateModel } from "./article-session.state.model";
import { ARTICLE_SESSION_FEATURE_KEY } from "./article-session.state.reducer";

/**
 * @description Selectors - Article session adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = articleSessionAdapter.getSelectors();

/**
 * @description  Selectors - Article session State
 */
const selectArticleSessionState: MemoizedSelector<ArticleSessionStateModel, ArticleSessionStateModel> = createFeatureSelector<ArticleSessionStateModel>(ARTICLE_SESSION_FEATURE_KEY);


/**
 * @description Selectors - All Article session
 */
const selectAllArticleSession = createSelector(
	selectArticleSessionState,
	selectAll,
);

/**
 * @description Selectors - All Article session Ids
 */
const selectAllArticleSessionIds = createSelector(
	selectArticleSessionState,
	selectIds,
);

/**
 * @description Selectors - Article session total number
 */
const selectArticleSessionTotalNumber = createSelector(
	selectArticleSessionState,
	selectTotal,
);

/**
 * @description Selectors - Article session by article id
 */
const selectArticleSessionByArticleId = (articleId: string) =>
	createSelector(selectArticleSessionState, (state) => state.entities[articleId]);

/**
* @description Selectors - Article session has data
*/
export const selectArticleSessionHasData = (articleId: string) => createSelector(
	selectArticleSessionState,
	//selectEntities,
	(entity) =>
	{
		let hasData = false;
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			if (eachId === articleId)
			{
				const eachEntity = entity.entities[eachId];
				if (eachEntity.articleSessions.length !== 0)
				{
					hasData = true
				}
			}
		})

		return hasData;
	}
);

/**
* @description Selectors - Article session analysis
*/
export const selectArticleSessionAnalysis = (articleId: string) => createSelector(
	selectArticleSessionState,
	//selectEntities,
	(entity) =>
	{
		let articleSessionAnalysis: ArticleSessionAnalysisModel;
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{

			if (eachId === articleId)
			{
				const eachEntity = entity.entities[eachId];
				if (eachEntity.articleSessions.length >= 2)
				{
					const articleSessions = eachEntity.articleSessions;
					const last = parseFloat(articleSessions[articleSessions.length - 1]);
					const secondLast = parseFloat(articleSessions[articleSessions.length - 2]);
					const gapBetweenLast2Time = last - secondLast;
					const inPercentage = ((Math.abs(gapBetweenLast2Time) / secondLast) * 100).toFixed(2);
					
					if (gapBetweenLast2Time === 0)
					{
						articleSessionAnalysis = {
							characteristics: CharacteristicsEnum.NEUTRAL,
							value: '0'
						}
					}
					else if (gapBetweenLast2Time > 0)
					{
						articleSessionAnalysis = {
							characteristics: CharacteristicsEnum.POSITIVE,
							value: inPercentage
						}
					}
					else
					{
						articleSessionAnalysis = {
							characteristics: CharacteristicsEnum.NEGATIVE,
							value: inPercentage
						}
					}
				}
			}
		})

		return articleSessionAnalysis;
	}
);


/**
 * @description export all selectors
 */
export const ARTICLE_SESSION_QUERY_SELECTOR = {
	selectAllArticleSession,
	selectAllArticleSessionIds,
	selectArticleSessionTotalNumber,
	selectArticleSessionHasData,
	selectArticleSessionByArticleId,
	selectArticleSessionAnalysis
};

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:41
 */

import
{
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { CourseMaterialFlashCardModel } from 'src/app/shared/model/course-material-flash-card.model';
import { courseMaterialFlashCardAdapter, CourseMaterialFlashCardStateModel } from './course-material-flash-card.state.model';
import { COURSE_MATERIAL_FLASH_CARD_FEATURE_KEY } from './course-material-flash-card.state.reducer';


/**
 * @description Selectors - Course material flash card adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = courseMaterialFlashCardAdapter.getSelectors();

/**
 * @description  Selectors - Course material flash card State
 */
export const selectCourseMaterialFlashCardState: MemoizedSelector<CourseMaterialFlashCardStateModel, CourseMaterialFlashCardStateModel> = createFeatureSelector<CourseMaterialFlashCardStateModel>(COURSE_MATERIAL_FLASH_CARD_FEATURE_KEY);

/**
 * @description Selectors - All Course material flash card
 */
export const selectAllCourseMaterialFlashCard = createSelector(
	selectCourseMaterialFlashCardState,
	selectAll,
);

/**
 * @description Selectors - All Course material flash card Ids
 */
export const selectAllCourseMaterialFlashCardIds = createSelector(
	selectCourseMaterialFlashCardState,
	selectIds,
);

/**
 * @description Selectors - Course material flash card total number
 */
export const selectCourseMaterialFlashCardTotalNumber = createSelector(
	selectCourseMaterialFlashCardState,
	selectTotal,
);

/**
 * @description Selectors - Course material article has quiz data
 */
export const selectCourseMaterialArticleHasQuiz = (articleId: string) => createSelector(
	selectCourseMaterialFlashCardState,
	//selectEntities,
	(entity) =>
	{
		let hasData = false;
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.articleId === articleId)
			{
				hasData = true
			}
		})
		
		return hasData;
	}
);

/**
 * @description Selectors - All course material article by article id
 */
export const selectAllCourseMaterialFlashCardByArticleId = (articleId: string) => createSelector(
	selectCourseMaterialFlashCardState,
	(entity) =>
	{
		let courseMaterialFlashCard: CourseMaterialFlashCardModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.articleId === articleId)
			{
				courseMaterialFlashCard = [
					...courseMaterialFlashCard,
					eachEntity
				]
			}
		})
		
		return courseMaterialFlashCard;
	}
);



/**
 * @description Selectors - Course material flash card by question id
 */
const selectCourseMaterialFlashCardByQuestionId = (questionId: string) =>
	createSelector(selectCourseMaterialFlashCardState, (state) => state.entities[questionId]);

/**
 * @description export Course material flash card query to access all selectors
 */
export const COURSE_MATERIAL_FLASH_CARD_QUERY_SELECTOR = {
	selectAllCourseMaterialFlashCard,
	selectAllCourseMaterialFlashCardIds,
	selectCourseMaterialFlashCardTotalNumber,
	selectCourseMaterialArticleHasQuiz,
	selectAllCourseMaterialFlashCardByArticleId,
	selectCourseMaterialFlashCardByQuestionId
};

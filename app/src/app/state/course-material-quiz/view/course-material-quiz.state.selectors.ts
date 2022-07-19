/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:09:43
 */


import
{
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { CourseMaterialQuizModel } from 'src/app/shared/model/course-material-quiz.model';
import { MentorMatchModel } from 'src/app/shared/model/mentor-match.model';
import { courseMaterialQuizAdapter, CourseMaterialQuizStateModel } from './course-material-quiz.state.model';
import { COURSE_MATERIAL_QUIZ_FEATURE_KEY } from './course-material-quiz.state.reducer';


/**
 * @description Selectors - Course material quiz adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = courseMaterialQuizAdapter.getSelectors();

/**
 * @description  Selectors - Course material quiz State
 */
export const selectCourseMaterialQuizState: MemoizedSelector<CourseMaterialQuizStateModel, CourseMaterialQuizStateModel> = createFeatureSelector<CourseMaterialQuizStateModel>(COURSE_MATERIAL_QUIZ_FEATURE_KEY);

/**
 * @description Selectors - All Course material quiz
 */
export const selectAllCourseMaterialQuiz = createSelector(
	selectCourseMaterialQuizState,
	selectAll,
);

/**
 * @description Selectors - All Course material quiz Ids
 */
export const selectAllCourseMaterialQuizIds = createSelector(
	selectCourseMaterialQuizState,
	selectIds,
);

/**
 * @description Selectors - Course material quiz total number
 */
export const selectCourseMaterialQuizTotalNumber = createSelector(
	selectCourseMaterialQuizState,
	selectTotal,
);

/**
 * @description Selectors - Course material article has quiz data
 */
export const selectCourseMaterialArticleHasQuiz = (articleId: string) => createSelector(
	selectCourseMaterialQuizState,
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
export const selectAllCourseMaterialQuizByArticleId = (articleId: string) => createSelector(
	selectCourseMaterialQuizState,
	(entity) =>
	{
		let courseMaterialQuiz: CourseMaterialQuizModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.articleId === articleId)
			{
				courseMaterialQuiz = [
					...courseMaterialQuiz,
					eachEntity
				]
			}
		})
		
		return courseMaterialQuiz;
	}
);



/**
 * @description Selectors - Course material quiz by question id
 */
const selectCourseMaterialQuizByQuestionId = (questionId: string) =>
	createSelector(selectCourseMaterialQuizState, (state) => state.entities[questionId]);

/**
 * @description export Course material quiz query to access all selectors
 */
export const COURSE_MATERIAL_QUIZ_QUERY_SELECTOR = {
	selectAllCourseMaterialQuiz,
	selectAllCourseMaterialQuizIds,
	selectCourseMaterialQuizTotalNumber,
	selectCourseMaterialArticleHasQuiz,
	selectAllCourseMaterialQuizByArticleId,
	selectCourseMaterialQuizByQuestionId
};

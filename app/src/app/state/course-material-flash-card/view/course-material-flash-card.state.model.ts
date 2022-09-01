/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:37:23
 */


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseMaterialFlashCardModel } from 'src/app/shared/model/course-material-flash-card.model';

/**
 * Selects course material flash card id
 * @param courseMaterialFlashCardModel 
 * @returns course material flash card id 
 */
export function selectCourseMaterialFlashCardId(courseMaterialFlashCardModel: CourseMaterialFlashCardModel): string
{
	return courseMaterialFlashCardModel.cardId ? courseMaterialFlashCardModel.cardId : '';
}

/**
 * Course material flash card state model
 */
export interface CourseMaterialFlashCardStateModel extends EntityState<CourseMaterialFlashCardModel> { }

/**
 * @description Course material flash card adapter
 */
export const courseMaterialFlashCardAdapter: EntityAdapter<CourseMaterialFlashCardModel> = createEntityAdapter<CourseMaterialFlashCardModel>({
	selectId: selectCourseMaterialFlashCardId
});

/**
 * @description Initial course material flash card initial state
 */
export const INITIAL_COURSE_MATERIAL_FLASH_CARD_STATE: CourseMaterialFlashCardStateModel = courseMaterialFlashCardAdapter.getInitialState();
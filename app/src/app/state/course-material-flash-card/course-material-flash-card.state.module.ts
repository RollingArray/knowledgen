/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 08:36:18
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COURSE_MATERIAL_FLASH_CARD_CRUD_INITIAL_STATE } from './crud/course-material-flash-card-crud.state.model';
import { courseMaterialFlashCardCrudStateReducer, COURSE_MATERIAL_FLASH_CARD_CRUD_FEATURE_KEY } from './crud/course-material-flash-card-crud.state.reducer';
import { CourseMaterialFlashCardStateEffects } from './course-material-flash-card.state.effects';
import { INITIAL_COURSE_MATERIAL_FLASH_CARD_STATE } from './view/course-material-flash-card.state.model';
import { COURSE_MATERIAL_FLASH_CARD_FEATURE_KEY, courseMaterialFlashCardStateReducer } from './view/course-material-flash-card.state.reducer';
import { CourseMaterialFlashCardStateFacade } from './course-material-flash-card.state.facade';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(COURSE_MATERIAL_FLASH_CARD_FEATURE_KEY, courseMaterialFlashCardStateReducer, {
			initialState: INITIAL_COURSE_MATERIAL_FLASH_CARD_STATE
		}),

		StoreModule.forFeature(COURSE_MATERIAL_FLASH_CARD_CRUD_FEATURE_KEY, courseMaterialFlashCardCrudStateReducer, {
			initialState: COURSE_MATERIAL_FLASH_CARD_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([CourseMaterialFlashCardStateEffects]),
	],
	providers: [
		CourseMaterialFlashCardStateFacade,
		CourseMaterialFlashCardStateEffects,
	]
})
export class CourseMaterialFlashCardStateModule { }

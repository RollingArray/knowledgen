/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:11:13
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COURSE_MATERIAL_QUIZ_CRUD_INITIAL_STATE } from './crud/course-material-quiz-crud.state.model';
import { courseMaterialQuizCrudStateReducer, COURSE_MATERIAL_QUIZ_CRUD_FEATURE_KEY } from './crud/course-material-quiz-crud.state.reducer';
import { CourseMaterialQuizStateEffects } from './course-material-quiz.state.effects';
import { INITIAL_COURSE_MATERIAL_QUIZ_STATE } from './view/course-material-quiz.state.model';
import { COURSE_MATERIAL_QUIZ_FEATURE_KEY, courseMaterialQuizStateReducer } from './view/course-material-quiz.state.reducer';
import { CourseMaterialQuizStateFacade } from './course-material-quiz.state.facade';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(COURSE_MATERIAL_QUIZ_FEATURE_KEY, courseMaterialQuizStateReducer, {
			initialState: INITIAL_COURSE_MATERIAL_QUIZ_STATE
		}),

		StoreModule.forFeature(COURSE_MATERIAL_QUIZ_CRUD_FEATURE_KEY, courseMaterialQuizCrudStateReducer, {
			initialState: COURSE_MATERIAL_QUIZ_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([CourseMaterialQuizStateEffects]),
	],
	providers: [
		CourseMaterialQuizStateFacade,
		CourseMaterialQuizStateEffects,
	]
})
export class CourseMaterialQuizStateModule { }

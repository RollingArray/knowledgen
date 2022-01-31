/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:54:00 
 * Last modified  : 2022-01-14 19:54:16
 */



import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COURSE_MATERIAL_CRUD_INITIAL_STATE } from './crud/course-material-crud.state.model';
import { courseMaterialCrudStateReducer, SKILL_CRUD_FEATURE_KEY } from './crud/course-material-crud.state.reducer';
import { CourseMaterialStateEffects } from './course-material.state.effects';
import { INITIAL_COURSE_MATERIAL_STATE } from './course-material/course-material.state.model';
import { COURSE_MATERIAL_FEATURE_KEY, courseMaterialStateReducer } from './course-material/course-material.state.reducer';
import { CourseMaterialStateFacade } from './course-material.state.facade';

@NgModule({
	imports: [
		CommonModule,

		// Global Skill CourseMaterial
		StoreModule.forFeature(COURSE_MATERIAL_FEATURE_KEY, courseMaterialStateReducer, {
			initialState: INITIAL_COURSE_MATERIAL_STATE
		}),

		// Global Skill CourseMaterial crud
		StoreModule.forFeature(SKILL_CRUD_FEATURE_KEY, courseMaterialCrudStateReducer, {
			initialState: COURSE_MATERIAL_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([CourseMaterialStateEffects]),
	],
	providers: [
		CourseMaterialStateFacade,
		CourseMaterialStateEffects,
	]
})
export class CourseMaterialStateModule { }

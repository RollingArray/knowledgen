/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:54:00 
 * Last modified  : 2022-07-05 14:51:00
 */



import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COURSE_MATERIAL_CRUD_INITIAL_STATE } from './crud/course-material-crud.state.model';
import { courseMaterialCrudStateReducer, COURSE_MATERIAL_CRUD_FEATURE_KEY } from './crud/course-material-crud.state.reducer';
import { CourseMaterialStateEffects } from './course-material.state.effects';
import { INITIAL_COURSE_MATERIAL_STATE } from './course-material/course-material.state.model';
import { COURSE_MATERIAL_FEATURE_KEY, courseMaterialStateReducer } from './course-material/course-material.state.reducer';
import { CourseMaterialStateFacade } from './course-material.state.facade';
import { RootStateModule } from '../root/root.state.module';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(COURSE_MATERIAL_FEATURE_KEY, courseMaterialStateReducer, {
			initialState: INITIAL_COURSE_MATERIAL_STATE
		}),

		StoreModule.forFeature(COURSE_MATERIAL_CRUD_FEATURE_KEY, courseMaterialCrudStateReducer, {
			initialState: COURSE_MATERIAL_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([CourseMaterialStateEffects]),
		RootStateModule,
	],
	providers: [
		CourseMaterialStateFacade,
		CourseMaterialStateEffects,
	]
})
export class CourseMaterialStateModule { }

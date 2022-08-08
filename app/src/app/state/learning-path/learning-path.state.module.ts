/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:54:00 
 * Last modified  : 2022-08-08 09:08:32
 */



import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LEARNING_PATH_CRUD_INITIAL_STATE } from './crud/learning-path-crud.state.model';
import { learningPathCrudStateReducer, LEARNING_PATH_CRUD_FEATURE_KEY } from './crud/learning-path-crud.state.reducer';
import { LearningPathStateEffects } from './learning-path.state.effects';
import { INITIAL_LEARNING_PATH_STATE } from './view/learning-path.state.model';
import { LEARNING_PATH_FEATURE_KEY, learningPathStateReducer } from './view/learning-path.state.reducer';
import { LearningPathStateFacade } from './learning-path.state.facade';
import { RootStateModule } from '../root/root.state.module';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(LEARNING_PATH_FEATURE_KEY, learningPathStateReducer, {
			initialState: INITIAL_LEARNING_PATH_STATE
		}),

		StoreModule.forFeature(LEARNING_PATH_CRUD_FEATURE_KEY, learningPathCrudStateReducer, {
			initialState: LEARNING_PATH_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([LearningPathStateEffects]),
		RootStateModule,
	],
	providers: [
		LearningPathStateFacade,
		LearningPathStateEffects,
	]
})
export class LearningPathStateModule { }

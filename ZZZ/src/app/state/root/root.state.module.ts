/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Root state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:40:49 
 * Last modified  : 2022-01-14 18:40:49 
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RootStateEffects } from './root.state.effects';
import { RootStateFacade } from './root.state.facade';
import { INITIAL_ROOT_STATE } from './root.state.model';
import { rootStateReducer, ROOT_FEATURE_KEY } from './root.state.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(ROOT_FEATURE_KEY, rootStateReducer, {
			initialState: INITIAL_ROOT_STATE
		}),
		EffectsModule.forFeature([RootStateEffects])
	],
	providers: [
		RootStateFacade,
		RootStateEffects,
	]
})
export class RootStateModule { }

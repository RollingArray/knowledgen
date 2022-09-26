/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:54:00 
 * Last modified  : 2022-09-26 14:27:07
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RootStateModule } from "../root/root.state.module";
import { CoreSubjectAreaStateEffects } from "./core-subject-area.state.effects";
import { CoreSubjectAreaStateFacade } from "./core-subject-area.state.facade";
import { INITIAL_CORE_SUBJECT_AREA_STATE } from "./view/core-subject-area.state.model";
import { CORE_SUBJECT_AREA_FEATURE_KEY, coreSubjectAreaStateReducer } from "./view/core-subject-area.state.reducer";

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(CORE_SUBJECT_AREA_FEATURE_KEY, coreSubjectAreaStateReducer, {
			initialState: INITIAL_CORE_SUBJECT_AREA_STATE
		}),

		EffectsModule.forFeature([CoreSubjectAreaStateEffects]),
		RootStateModule,
	],
	providers: [
		CoreSubjectAreaStateFacade,
		CoreSubjectAreaStateEffects,
	]
})
export class CoreSubjectAreaStateModule { }

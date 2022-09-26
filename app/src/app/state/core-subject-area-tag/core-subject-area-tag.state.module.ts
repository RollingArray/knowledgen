/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag state module
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
import { CoreSubjectAreaTagStateEffects } from "./core-subject-area-tag.state.effects";
import { CoreSubjectAreaTagStateFacade } from "./core-subject-area-tag.state.facade";
import { INITIAL_CORE_SUBJECT_AREA_TAG_STATE } from "./view/core-subject-area-tag.state.model";
import { CORE_SUBJECT_AREA_TAG_FEATURE_KEY, coreSubjectAreaTagStateReducer } from "./view/core-subject-area-tag.state.reducer";

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(CORE_SUBJECT_AREA_TAG_FEATURE_KEY, coreSubjectAreaTagStateReducer, {
			initialState: INITIAL_CORE_SUBJECT_AREA_TAG_STATE
		}),

		EffectsModule.forFeature([CoreSubjectAreaTagStateEffects]),
		RootStateModule,
	],
	providers: [
		CoreSubjectAreaTagStateFacade,
		CoreSubjectAreaTagStateEffects,
	]
})
export class CoreSubjectAreaTagStateModule { }

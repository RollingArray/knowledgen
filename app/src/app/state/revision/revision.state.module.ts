/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-05 13:02:23
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RevisionStateEffects } from "./revision.state.effects";
import { RevisionStateFacade } from "./revision.state.facade";
import { INITIAL_REVISION_STATE } from "./view/revision.state.model";
import { REVISION_FEATURE_KEY, revisionStateReducer } from "./view/revision.state.reducer";


@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(REVISION_FEATURE_KEY, revisionStateReducer, {
			initialState: INITIAL_REVISION_STATE
		}),

		EffectsModule.forFeature([RevisionStateEffects]),
	],
	providers: [
		RevisionStateFacade,
		RevisionStateEffects,
	]
})
export class RevisionStateModule { }



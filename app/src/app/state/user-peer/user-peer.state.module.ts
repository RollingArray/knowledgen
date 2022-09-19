/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:48:37
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { USER_PEER_CRUD_INITIAL_STATE } from './crud/user-peer-crud.state.model';
import { userPeerCrudStateReducer, USER_PEER_CRUD_FEATURE_KEY } from './crud/user-peer-crud.state.reducer';
import { UserPeerStateEffects } from './user-peer.state.effects';
import { INITIAL_USER_PEER_STATE } from './view/user-peer.state.model';
import { USER_PEER_FEATURE_KEY, userPeerStateReducer } from './view/user-peer.state.reducer';
import { UserPeerStateFacade } from './user-peer.state.facade';
import { RootStateModule } from '../root/root.state.module';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(USER_PEER_FEATURE_KEY, userPeerStateReducer, {
			initialState: INITIAL_USER_PEER_STATE
		}),

		StoreModule.forFeature(USER_PEER_CRUD_FEATURE_KEY, userPeerCrudStateReducer, {
			initialState: USER_PEER_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([UserPeerStateEffects]),
		RootStateModule,
	],
	providers: [
		UserPeerStateFacade,
		UserPeerStateEffects,
	]
})
export class UserPeerStateModule { }

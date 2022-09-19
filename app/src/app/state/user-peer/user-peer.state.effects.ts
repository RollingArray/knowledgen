/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:58:03
 */

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ToastService } from "src/app/shared/service/toast.service";
import { UserPeerService } from "src/app/shared/service/user-peer.service";
import { RootStateFacade } from "../root/root.state.facade";
import { USER_PEER_ACTIONS } from "./user-peer.state.actions";




@Injectable()
export class UserPeerStateEffects {
	/**
	 * Creates an instance of user peer state effects.
	 * @param actions$ 
	 * @param userPeerService 
	 * @param toastService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private userPeerService: UserPeerService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * Api request user peer$ of user peer state effects
	 */
	apiRequestUserPeer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.API_REQUEST_USER_PEER
				),
				mergeMap(action =>

					this.userPeerService.getPeerPoints().pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.data.success)
							{
								// store retrieved data
								return USER_PEER_ACTIONS.LOADED_REQUEST_USER_PEER({ payload: data.data.data });
							}

							// response fail
							else {
								return USER_PEER_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new user peer$ of user peer state effects
	 */
	addNewUserPeer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.API_REQUEST_ADD_NEW_USER_PEER
				),
				mergeMap(action =>
					this.userPeerService.crudPeer(action.payload).pipe(
						map((data) =>
						{
							
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success) {
								
								// store newly added data
								return USER_PEER_ACTIONS.USER_PEER_ADDED_SUCCESS();
							}
							// response fail
							else {

								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return USER_PEER_ACTIONS.USER_PEER_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete skill$ of user peer state effects
	 */
	deleteSkill$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.API_REQUEST_DELETE_USER_PEER
				),
				mergeMap(action =>
					this.userPeerService.crudPeer(action.payload).pipe(
						map((data) => {
							// stop loader
							this.rootStateFacade.stopModalLoading();

							// if success response
							if (data.success) {

								// remove deleted data from store 
								return USER_PEER_ACTIONS.REMOVE_USER_PEER_FROM_STORE({ payload: action.payload });
							}

							// response fail
							else {
								// if error message
								if (data.message) {
									this.toastService.presentToast(data.message);
								}

								return USER_PEER_ACTIONS.USER_PEER_CRUD_FAIL();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete user peer add operation$ of user peer state effects
	 */
	completeUserPeerAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.STORE_NEWLY_ADDED_USER_PEER
				),
				map(action => USER_PEER_ACTIONS.USER_PEER_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete user peer delete operation$ of user peer state effects
	 */
	completeUserPeerDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.REMOVE_USER_PEER_FROM_STORE
				),
				map(action => USER_PEER_ACTIONS.USER_PEER_DELETED_SUCCESS())
			),
	);

	/**
	 * Complete user peer curd operation$ of user peer state effects
	 */
	completeUserPeerCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					USER_PEER_ACTIONS.USER_PEER_ADDED_SUCCESS,
					USER_PEER_ACTIONS.USER_PEER_DELETED_SUCCESS
				),
				map(action => USER_PEER_ACTIONS.USER_PEER_CRUD_SUCCESS()),
			),
	);
}

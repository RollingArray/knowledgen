/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state effects
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-01-19 23:22:23
 */

import { Injectable } from "@angular/core";
import { concat, EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { COURSE_MATERIAL_MENU_ACTIONS } from "./course-material-menu.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CourseMaterialMenuService } from "src/app/shared/service/course-material-menu.service";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { COURSE_MATERIAL_ACTIONS } from "../course-material/course-material.state.actions";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";


@Injectable()
export class CourseMaterialMenuStateEffects
{
	categoriesService: any;
	//rootStateFacade: any;
	categoryService: any;

	/**
	 * Creates an instance of policy state effects.
	 * @param actions$ 
	 * @param localStorageService 
	 * @param privacyPolicyService 
	 * @param rootStateFacade 
	 */
	constructor(
		private actions$: Actions,
		private courseMaterialMenuService: CourseMaterialMenuService,
		private toastService: ToastService,
		private rootStateFacade: RootStateFacade
	) { }


	/**
	 * @description Api request global skill categories$ of global skill category state effects
	 */
	apiRequestCourseMaterialMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_MENU
				),
				mergeMap(action =>

					this.courseMaterialMenuService.getCourseMaterialMenu(action.payload).pipe(
						map((data) =>
						{
							
							let parentMenus: ParentMenuModel[] = [];

							let childMenus: ChildMenuModel[] = [];

							let subChildMenus: SubChildMenuModel[] = [];

							// stop loader
							this.rootStateFacade.stopLoading();

							const courseMaterial = data.data.courseMaterial;
							
							// if success response
							if (data.success)
							{
								const courseMaterialMenu: CourseMaterialModel = data.data.courseMaterialMenu;

								if (courseMaterialMenu.success)
								{

									courseMaterialMenu.data.map(eachParentMenu =>
									{
										const courseMaterialParentMenuModel: ParentMenuModel = {
											parentArticleId: eachParentMenu.parentArticleId,
											parentArticleOrder: eachParentMenu.parentArticleOrder,
											courseMaterialId: eachParentMenu.courseMaterialId,
											articleTitle: eachParentMenu.articleTitle
										};

										parentMenus = [
											...parentMenus,
											courseMaterialParentMenuModel
										]

										if (eachParentMenu.childMenu.success)
										{

											eachParentMenu.childMenu.data.map(eachChildMenu =>
											{
												const childMenuModel: ChildMenuModel = {
													parentArticleId: eachChildMenu.parentArticleId,
													childArticleId: eachChildMenu.childArticleId,
													childArticleOrder: eachChildMenu.parentArticleOrder,
													courseMaterialId: eachChildMenu.courseMaterialId,
													articleTitle: eachChildMenu.articleTitle
												};

												childMenus = [
													...childMenus,
													childMenuModel
												];



												if (eachChildMenu.subChildMenu.success)
												{
													eachChildMenu.subChildMenu.data.map(eachSubChildMenu =>
													{
														const subChildMenuModel: SubChildMenuModel = {
															childArticleId: eachSubChildMenu.childArticleId,
															subChildArticleId: eachSubChildMenu.subChildArticleId,
															subChildArticleOrder: eachSubChildMenu.subChildArticleOrder,
															courseMaterialId: eachSubChildMenu.courseMaterialId,
															articleTitle: eachSubChildMenu.articleTitle
														};

														subChildMenus = [
															...subChildMenus,
															subChildMenuModel
														];
													});
												}
											});
										}
									});
								}

								return COURSE_MATERIAL_MENU_ACTIONS.LOADING_GENERATED_MENU(
									{
										payloadCourseMaterial: courseMaterial,
										payloadParentMenu: parentMenus,
										payloadChildMenu: childMenus,
										payloadSubChildMenu: subChildMenus

									});
							}


							// response fail
							else
							{
								return COURSE_MATERIAL_MENU_ACTIONS.NOOP();
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Api request global skill categories$ of global skill category state effects
	 */
	loadedParentMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.LOADING_GENERATED_MENU
				),
				mergeMap(action => concat([
					COURSE_MATERIAL_ACTIONS.STORE_NEWLY_ADDED_COURSE_MATERIAL({ payload: action.payloadCourseMaterial }),
					COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_PARENT_MENU({ payload: action.payloadParentMenu }),
					COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_CHILD_MENU({ payload: action.payloadChildMenu }),
					COURSE_MATERIAL_MENU_ACTIONS.LOADED_REQUEST_SUB_CHILD_MENU({ payload: action.payloadSubChildMenu })
				]))
			),
	);

	/**
	 * @description Add new category$ of global skill category state effects
	 */
	addNewMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.addNewMenu(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								// build new object
								const parentArticleId = data.resource.parentArticleId;
								const newParentMenu = {
									...action.payload,
									parentArticleId
								};

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_MENU({ payload: newParentMenu });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.COURSE_MATERIAL_MENU_CRUD_FAIL;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Add new sub child menu$ of course material menu state effects
	 */
	 addNewChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.addNewChildMenu(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								// build new object
								const childArticleId = data.resource.childArticleId;
								const newChildMenu = {
									...action.payload,
									childArticleId
								};

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_CHILD_MENU({ payload: newChildMenu });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.COURSE_MATERIAL_CHILD_MENU_CRUD_FAIL;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	 );
	
	/**
	 * Add new sub child menu$ of course material menu state effects
	 */
	addNewSubChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_SUB_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.addNewSubChildMenu(action.payload).pipe(
						map((data) =>
						{
							// stop loader
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								// build new object
								const subChildArticleId = data.resource.subChildArticleId;
								const newSubChildMenu = {
									...action.payload,
									subChildArticleId
								};

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_SUB_CHILD_MENU({ payload: newSubChildMenu });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.COURSE_MATERIAL_SUB_CHILD_MENU_CRUD_FAIL;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);
}

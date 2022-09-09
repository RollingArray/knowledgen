/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material menu state effect
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-08-08 20:33:10
 */

import { Injectable } from "@angular/core";
import { concat, EMPTY } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, take } from "rxjs/operators";
import { COURSE_MATERIAL_MENU_ACTIONS } from "./course-material-menu.state.actions";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "../root/root.state.facade";
import { CourseMaterialMenuService } from "src/app/shared/service/course-material-menu.service";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { COURSE_MATERIAL_ACTIONS } from "../course-material/course-material.state.actions";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { MenuTypeEnum } from "src/app/shared/enum/menu-type.enum";
import { CourseMaterialMenuStateFacade } from "./course-material-menu.state.facade";


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
		private rootStateFacade: RootStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade
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
						mergeMap((data) =>
						{
							let storableArticle: MenuSelectModel;

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

									courseMaterialMenu.data.map((eachParentMenu, index) =>
									{
										// get first article from the top parent menu list
										if (index == 0)
										{

											// build first selected menu as first parent menu
											storableArticle = {
												articleId: eachParentMenu.parentArticleId,
												articleStatus: eachParentMenu.articleStatus,
												courseMaterialId: eachParentMenu.courseMaterialId,
												menuType: MenuTypeEnum.PARENT_MENU,
												courseMaterialType: eachParentMenu.courseMaterialTypeId,
												articleCompletionTime: eachParentMenu.articleCompletionTime,
												articleCompletionReward: eachParentMenu.articleCompletionReward
											};

										}

										const courseMaterialParentMenuModel: ParentMenuModel = {
											parentArticleId: eachParentMenu.parentArticleId,
											parentArticleOrder: eachParentMenu.parentArticleOrder,
											courseMaterialId: eachParentMenu.courseMaterialId,
											articleTitle: eachParentMenu.articleTitle,
											articleSummery: eachParentMenu.articleSummery,
											articleStatus: eachParentMenu.articleStatus,
											courseMaterialTypeId: eachParentMenu.courseMaterialTypeId,
											articleCompletionTime: eachParentMenu.articleCompletionTime,
											articleCompletionReward: eachParentMenu.articleCompletionReward
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
													childArticleOrder: eachChildMenu.childArticleOrder,
													courseMaterialId: eachChildMenu.courseMaterialId,
													articleTitle: eachChildMenu.articleTitle,
													articleSummery: eachParentMenu.articleSummery,
													articleStatus: eachChildMenu.articleStatus,
													courseMaterialTypeId: eachChildMenu.courseMaterialTypeId,
													articleCompletionTime: eachChildMenu.articleCompletionTime,
													articleCompletionReward: eachChildMenu.articleCompletionReward
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
															articleTitle: eachSubChildMenu.articleTitle,
															articleSummery: eachParentMenu.articleSummery,
															articleStatus: eachSubChildMenu.articleStatus,
															courseMaterialTypeId: eachSubChildMenu.courseMaterialTypeId,
															articleCompletionTime: eachSubChildMenu.articleCompletionTime,
															articleCompletionReward: eachSubChildMenu.articleCompletionReward
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

									// compare selected menu and first menu
									this.courseMaterialMenuStateFacade.selectedMenuArticle$
										.pipe(take(1))
										.subscribe(
											selectedMenu =>
											{
												if (selectedMenu)
												{
													let menuType: MenuTypeEnum = this.getSelectedArticleMenuType(parentMenus, selectedMenu, childMenus, subChildMenus);

													// if both are same material, save selectedMenu
													if (selectedMenu.courseMaterialId === storableArticle.courseMaterialId)
													{
														// build first selected menu as first parent menu
														storableArticle = {
															articleId: selectedMenu.articleId,
															articleStatus: selectedMenu.articleStatus,
															courseMaterialId: selectedMenu.courseMaterialId,
															courseMaterialType: selectedMenu.courseMaterialType,
															menuType: menuType,
														};
													}

													// else keep storableArticle as first article
													else
													{
														// 
													}
												}
											}
										)

								}

								return [
									COURSE_MATERIAL_MENU_ACTIONS.LOADING_GENERATED_MENU(
										{
											payloadCourseMaterial: courseMaterial,
											payloadParentMenu: parentMenus,
											payloadChildMenu: childMenus,
											payloadSubChildMenu: subChildMenus

										}),
									COURSE_MATERIAL_MENU_ACTIONS.STORE_SELECTED_MENU({ payload: storableArticle })
								];
							}


							// response fail
							else
							{
								return [
									COURSE_MATERIAL_MENU_ACTIONS.NOOP()
								];
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
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_PARENT_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudParentMenu(action.payload).pipe(
						map((data) =>
						{
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
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_PARENT_MENU({ payload: newParentMenu });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_PARENT_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Add new category$ of global skill category state effects
	 */
	editParentMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_PARENT_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudParentMenu(action.payload).pipe(
						map((data) =>
						{
							// hide loading, applicable for change visibility section
							this.rootStateFacade.stopLoading();

							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_PARENT_MENU({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_PARENT_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * @description Add new category$ of global skill category state effects
	 */
	deleteParentMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_PARENT_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudParentMenu(action.payload).pipe(
						map((data) =>
						{
							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.REMOVE_PARENT_MENU_FROM_STORE({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_PARENT_MENU;
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
					this.courseMaterialMenuService.crudChildMenu(action.payload).pipe(
						map((data) =>
						{
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

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_CHILD_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Edit child menu$ of course material menu state effects
	 */
	editChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudChildMenu(action.payload).pipe(
						map((data) =>
						{
							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_CHILD_MENU({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_CHILD_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete child menu$ of course material menu state effects
	 */
	deleteChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudChildMenu(action.payload).pipe(
						map((data) =>
						{
							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.REMOVE_CHILD_MENU_FROM_STORE({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_CHILD_MENU;
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
					this.courseMaterialMenuService.crudSubChildMenu(action.payload).pipe(
						map((data) =>
						{
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

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_SUB_CHILD_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Edit child menu$ of course material menu state effects
	 */
	editSubChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_SUB_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudSubChildMenu(action.payload).pipe(
						map((data) =>
						{
							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_SUB_CHILD_MENU({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_SUB_CHILD_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Delete child menu$ of course material menu state effects
	 */
	deleteSubChildMenu$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_SUB_CHILD_MENU
				),
				mergeMap(action =>
					this.courseMaterialMenuService.crudSubChildMenu(action.payload).pipe(
						map((data) =>
						{
							// if success response
							if (data.success)
							{

								// store newly added object
								return COURSE_MATERIAL_MENU_ACTIONS.REMOVE_SUB_CHILD_MENU_FROM_STORE({ payload: action.payload });
							}
							// response fail
							else
							{

								// if error message
								if (data.message)
								{
									this.toastService.presentToast(data.message);
								}

								return COURSE_MATERIAL_MENU_ACTIONS.CRUD_FAIL_SUB_CHILD_MENU;
							}

						}),
						catchError(() => EMPTY)
					),
				),
			),
	);

	/**
	 * Complete parent menu add operation$ of course material menu state effects
	 */
	completeParentMenuAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_PARENT_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete parent menu update operation$ of course material menu state effects
	 */
	completeParentMenuUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_PARENT_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete parent menu delete operation$ of course material menu state effects
	 */
	completeParentMenuDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.REMOVE_PARENT_MENU_FROM_STORE
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_DELETED_SUCCESS()),
			),
	);



	/**
	 * Complete child menu add operation$ of course material menu state effects
	 */
	completeChildMenuAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_CHILD_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete child menu update operation$ of course material menu state effects
	 */
	completeChildMenuUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_CHILD_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete child menu delete operation$ of course material menu state effects
	 */
	completeChildMenuDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.REMOVE_CHILD_MENU_FROM_STORE
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_DELETED_SUCCESS()),
			),
	);

	/**
	 * Complete child menu add operation$ of course material menu state effects
	 */
	completeSubChildMenuAddOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_NEWLY_ADDED_SUB_CHILD_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_ADDED_SUCCESS()),
			),
	);

	/**
	 * Complete sub child menu update operation$ of course material menu state effects
	 */
	completeSubChildMenuUpdateOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.STORE_UPDATED_SUB_CHILD_MENU
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_UPDATED_SUCCESS()),
			),
	);

	/**
	 * Complete sub child menu delete operation$ of course material menu state effects
	 */
	completeSubChildMenuDeleteOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.REMOVE_SUB_CHILD_MENU_FROM_STORE
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_DELETED_SUCCESS()),
			),
	);

	/**
	 * Complete parent menu curd operation$ of course material menu state effects
	 */
	completeParentMenuCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_ADDED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_UPDATED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.PARENT_MENU_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_PARENT_MENU()),
			),
	);

	/**
	 * Complete child menu curd operation$ of course material menu state effects
	 */
	completeChildMenuCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_ADDED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_UPDATED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.CHILD_MENU_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_CHILD_MENU()),
			),
	);

	/**
	 * Complete sub child menu curd operation$ of course material menu state effects
	 */
	completeSubChildMenuCurdOperation$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_ADDED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_UPDATED_SUCCESS,
					COURSE_MATERIAL_MENU_ACTIONS.SUB_CHILD_MENU_DELETED_SUCCESS
				),
				map(action => COURSE_MATERIAL_MENU_ACTIONS.CRUD_SUCCESS_SUB_CHILD_MENU()),
			),
	);

	/**
	 * Gets selected article menu type
	 * @param parentMenus 
	 * @param selectedMenu 
	 * @param childMenus 
	 * @param subChildMenus 
	 * @returns  
	 */
	private getSelectedArticleMenuType(parentMenus: ParentMenuModel[], selectedMenu: MenuSelectModel, childMenus: ChildMenuModel[], subChildMenus: SubChildMenuModel[])
	{
		const foundInParentMenu = parentMenus.filter(menu => menu.parentArticleId === selectedMenu.articleId).length > 0 ? true : false;
		const foundInChildMenu = childMenus.filter(menu => menu.childArticleId === selectedMenu.articleId).length > 0 ? true : false;
		const foundInSubChildMenu = subChildMenus.filter(menu => menu.subChildArticleId === selectedMenu.articleId).length > 0 ? true : false;

		let menuType: MenuTypeEnum;

		if (foundInParentMenu)
		{
			menuType = MenuTypeEnum.PARENT_MENU;
		}
		else if (foundInChildMenu)
		{
			menuType = MenuTypeEnum.CHILD_MENU;
		}
		else if (foundInSubChildMenu)
		{
			menuType = MenuTypeEnum.SUB_CHILD_MENU;
		}
		return menuType;
	}
}

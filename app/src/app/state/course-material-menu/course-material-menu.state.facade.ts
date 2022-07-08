/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material menu state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-07-05 20:35:16
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { PARENT_MENU_QUERY_SELECTOR } from "./parent-menu/parent-menu.state.selectors";
import { ParentMenuStateModel } from "./parent-menu/parent-menu.state.model";
import { COURSE_MATERIAL_MENU_ACTIONS } from "./course-material-menu.state.actions";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { ChildMenuStateModel } from "./child-menu/child-menu.state.model";
import { CHILD_MENU_QUERY_SELECTOR } from "./child-menu/child-menu.state.selectors";
import { SubChildMenuStateModel } from "./sub-child-menu/sub-child-menu.state.model";
import { SUB_CHILD_MENU_QUERY_SELECTOR } from "./sub-child-menu/sub-child-menu.state.selectors";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";
import { MenuSelectStateModel } from "./menu-select/menu-select.state.model";
import { MENU_SELECT_QUERY_SELECTOR } from "./menu-select/menu-select.state.selectors";
import { SubChildMenuCrudStateModel } from "./crud/sub-child-menu-crud/sub-child-menu-crud.state.model";
import { SUB_CHILD_MENU_CRUD_QUERY_SELECTOR } from "./crud/sub-child-menu-crud/sub-child-menu-crud.state.selectors";
import { PARENT_MENU_CRUD_QUERY_SELECTOR } from "./crud/parent-menu-crud/parent-menu-crud.state.selectors";
import { ParentMenuCrudStateModel } from "./crud/parent-menu-crud/parent-menu-crud.state.model";
import { ChildMenuCrudStateModel } from "./crud/child-menu-crud/child-menu-crud.state.model";
import { CHILD_MENU_CRUD_QUERY_SELECTOR } from "./crud/child-menu-crud/child-menu-crud.state.selectors";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";

/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialMenuStateFacade {

	/**
	 * Creates an instance of course material menu state facade.
	 * @param parentMenuStore 
	 * @param childMenuStore 
	 * @param subChildMenuStore 
	 * @param menuSelectStateModel 
	 * @param subChildMenuCrudStore 
	 * @param parentMenuCrudStore 
	 * @param childMenuCrudStore 
	 */
	constructor(
		 private parentMenuStore: Store<ParentMenuStateModel>,
		 private childMenuStore: Store<ChildMenuStateModel>,
		 private subChildMenuStore: Store<SubChildMenuStateModel>,
		 private menuSelectStateModel: Store<MenuSelectStateModel>,
		 private subChildMenuCrudStore: Store<SubChildMenuCrudStateModel>,
		 private parentMenuCrudStore: Store<ParentMenuCrudStateModel>,
		 private childMenuCrudStore: Store<ChildMenuCrudStateModel>,
	) { }

	/**
	 * Get first parent menu id$ of course material menu state facade
	 */
	public getFirstParentMenuId$ = this.parentMenuStore.select(PARENT_MENU_QUERY_SELECTOR.selectFirstParentMenuId);

	/**
	 * Menu by course material id$ of course material menu state facade
	 */
	public menuByCourseMaterialId$ = (courseMaterialId: string) => this.parentMenuStore.select(PARENT_MENU_QUERY_SELECTOR.selectParentMenuByMaterialId(courseMaterialId));

	/**
	 * Child menu by parent menu id$ of course material menu state facade
	 */
	public childMenuByParentMenuId$ = (parentArticleId: string) => this.childMenuStore.select(CHILD_MENU_QUERY_SELECTOR.selectChildMenuByParentId(parentArticleId));

	/**
	 * Sub child menu by child id$ of course material menu state facade
	 */
	public subChildMenuByChildId$ = (childArticleId: string) => this.subChildMenuStore.select(SUB_CHILD_MENU_QUERY_SELECTOR.selectSubChildMenuByChildId(childArticleId));

	/**
	 * Total number of sub child menu$ of course material menu state facade
	 */
	public totalNumberOfSubChildMenu$ = this.subChildMenuStore.select(SUB_CHILD_MENU_QUERY_SELECTOR.selectSubChildMenuTotalNumber);

	/**
	 * Selected menu article$ of course material menu state facade
	 */
	public selectedMenuArticle$ = this.menuSelectStateModel.select(MENU_SELECT_QUERY_SELECTOR.selectMenuArticle);
	
	/**
	 * Operation sub child menu$ of course material menu state facade
	 */
	public operationSubChildMenu$ = this.subChildMenuCrudStore.select(SUB_CHILD_MENU_CRUD_QUERY_SELECTOR.selectOperationSubChildMenu);

	/**
	 * Operation child menu$ of course material menu state facade
	 */
	public operationChildMenu$ = this.childMenuCrudStore.select(CHILD_MENU_CRUD_QUERY_SELECTOR.selectOperationChildMenu);

	/**
	 * Child menu curd operation status$ of course material menu state facade
	 */
	public childMenuCurdOperationStatus$ = this.childMenuCrudStore.select(CHILD_MENU_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Sub child menu curd operation status$ of course material menu state facade
	 */
	public subChildMenuCurdOperationStatus$ = this.subChildMenuCrudStore.select(SUB_CHILD_MENU_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Parent menu curd operation status$ of course material menu state facade
	 */
	public parentMenuCurdOperationStatus$ = this.parentMenuCrudStore.select(PARENT_MENU_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation parent menu$ of course material menu state facade
	 */
	 public operationParentMenu$ = this.parentMenuCrudStore.select(PARENT_MENU_CRUD_QUERY_SELECTOR.selectOperationParentMenu);

	/**
	 * Parent menu by article id$ of course material menu state facade
	 */
	public parentMenuByArticleId$ = (parentArticleId: string) => this.parentMenuStore.select(PARENT_MENU_QUERY_SELECTOR.selectParentMenuByArticleId(parentArticleId));

	/**
	 * Child menu by article id$ of course material menu state facade
	 */
	public childMenuByArticleId$ = (childArticleId: string) => this.subChildMenuStore.select(CHILD_MENU_QUERY_SELECTOR.selectChildMenuById(childArticleId));

	/**
	 * Sub child menu by article id$ of course material menu state facade
	 */
	public subChildMenuByArticleId$ = (subChildArticleId: string) => this.childMenuStore.select(SUB_CHILD_MENU_QUERY_SELECTOR.selectSubChildMenuById(subChildArticleId));

	 
	
	/**
	 * Requests course material
	 * @param courseMaterialModel 
	 */
	public requestCourseMaterial(courseMaterialModel: CourseMaterialModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_MENU({payload: courseMaterialModel}));
	}

	/**
	 * Acts upon parent menu
	 * @param parentMenuModel 
	 */
	public actUponParentMenu(parentMenuModel: ParentMenuModel, operation: OperationsEnum) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_PARENT_MENU({payload: parentMenuModel, operation: operation}));
	}

	/**
	 * Acts upon child menu model
	 * @param childMenuModel 
	 */
	public actUponChildMenu(childMenuModel: ChildMenuModel, operation: OperationsEnum) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_CHILD_MENU({payload: childMenuModel, operation: operation}));
	}
	
	/**
	 * Acts upon sub child menu model
	 * @param subChildMenuModel 
	 */
	public actUponSubChildMenu(subChildMenuModel: SubChildMenuModel, operation: OperationsEnum) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.ACT_UPON_SUB_CHILD_MENU({payload: subChildMenuModel, operation: operation}));
	}

	/**
	 * Adds new parent menu
	 * @param parentMenuModel 
	 */
	public addNewParentMenu(parentMenuModel: ParentMenuModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_PARENT_MENU({payload: parentMenuModel}));
	}

	/**
	 * Adds new child menu
	 * @param childMenuModel 
	 */
	public addNewChildMenu(childMenuModel: ChildMenuModel) {
		this.childMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_CHILD_MENU({payload: childMenuModel}));
	}

	/**
	 * Adds new sub child menu
	 * @param subChildMenuModel 
	 */
	public addNewSubChildMenu(subChildMenuModel: SubChildMenuModel) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_SUB_CHILD_MENU({payload: subChildMenuModel}));
	}

	/**
	 * Edits parent menu
	 * @param parentMenuModel 
	 */
	public editParentMenu(parentMenuModel: ParentMenuModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_PARENT_MENU({payload: parentMenuModel}));
	}

	/**
	 * Edits child menu
	 * @param childMenuModel 
	 */
	public editChildMenu(childMenuModel: ChildMenuModel) {
		this.childMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_CHILD_MENU({payload: childMenuModel}));
	}

	/**
	 * Edits sub child menu
	 * @param subChildMenuModel 
	 */
	public editSubChildMenu(subChildMenuModel: SubChildMenuModel) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_EDIT_SUB_CHILD_MENU({payload: subChildMenuModel}));
	}

	/**
	 * Deletes parent menu
	 * @param parentMenuModel 
	 */
	public deleteParentMenu(parentMenuModel: ParentMenuModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_PARENT_MENU({payload: parentMenuModel}));
	}

	/**
	 * Deletes child menu
	 * @param childMenuModel 
	 */
	public deleteChildMenu(childMenuModel: ChildMenuModel) {
		this.childMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_CHILD_MENU({payload: childMenuModel}));
	}

	/**
	 * Deletes sub child menu
	 * @param subChildMenuModel 
	 */
	public deleteSubChildMenu(subChildMenuModel: SubChildMenuModel) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_DELETE_SUB_CHILD_MENU({payload: subChildMenuModel}));
	}

	/**
	 * Stores selected menu
	 * @param articleId 
	 */
	public storeSelectedMenu(menuSelectModel: MenuSelectModel) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.STORE_SELECTED_MENU({payload: menuSelectModel}));
	}
}

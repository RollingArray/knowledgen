/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:06:25 
 * Last modified  : 2022-01-20 01:04:05
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

/**
 * @description Injectable
 */
@Injectable()

export class CourseMaterialMenuStateFacade {

	/**
	 * Creates an instance of user skill state facade.
	 * @param courseMaterialStore 
	 * @param courseMaterialStore 
	 * @param courseMaterialCrudStore 
	 */
	 constructor(
		 private parentMenuStore: Store<ParentMenuStateModel>,
		 private childMenuStore: Store<ChildMenuStateModel>,
		 private subChildMenuStore: Store<SubChildMenuStateModel>
	) { }

	
	public getFirstParentMenuId$ = this.parentMenuStore.select(PARENT_MENU_QUERY_SELECTOR.selectFirstParentMenuId);

	public menuByCourseMaterialId$ = (courseMaterialId: string) => this.parentMenuStore.select(PARENT_MENU_QUERY_SELECTOR.selectParentMenuByMaterialId(courseMaterialId));

	public childMenuByParentMenuId$ = (parentArticleId: string) => this.childMenuStore.select(CHILD_MENU_QUERY_SELECTOR.selectChildMenuByParentId(parentArticleId));

	public subChildMenuByChildId$ = (childArticleId: string) => this.subChildMenuStore.select(SUB_CHILD_MENU_QUERY_SELECTOR.selectSubChildMenuByChildId(childArticleId));

	public totalNumberOfSubChildMenu$ = this.subChildMenuStore.select(SUB_CHILD_MENU_QUERY_SELECTOR.selectSubChildMenuTotalNumber);
	
	public requestCourseMaterial(courseMaterialModel: CourseMaterialModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_MENU({payload: courseMaterialModel}));
	}

	public addNewParentMenu(parentMenuModel: ParentMenuModel) {
		this.parentMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_MENU({payload: parentMenuModel}));
	}

	public addNewChildMenu(childMenuModel: ChildMenuModel) {
		this.childMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_CHILD_MENU({payload: childMenuModel}));
	}

	public addNewSubChildMenu(subChildMenuModel: SubChildMenuModel) {
		this.subChildMenuStore.dispatch(COURSE_MATERIAL_MENU_ACTIONS.API_REQUEST_ADD_NEW_SUB_CHILD_MENU({payload: subChildMenuModel}));
	}
}

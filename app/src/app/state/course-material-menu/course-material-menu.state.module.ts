/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:54:00 
 * Last modified  : 2022-07-05 16:47:53
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CourseMaterialMenuStateEffects } from './course-material-menu.state.effects';
import { CourseMaterialMenuStateFacade } from './course-material-menu.state.facade';
import { parentMenuStateReducer, PARENT_MENU_FEATURE_KEY } from './parent-menu/parent-menu.state.reducer';
import { INITIAL_PARENT_MENU_STATE } from './parent-menu/parent-menu.state.model';
import { childMenuStateReducer, CHILD_MENU_FEATURE_KEY } from './child-menu/child-menu.state.reducer';
import { INITIAL_CHILD_MENU_STATE } from './child-menu/child-menu.state.model';
import { subChildMenuStateReducer, SUB_CHILD_MENU_FEATURE_KEY } from './sub-child-menu/sub-child-menu.state.reducer';
import { INITIAL_SUB_CHILD_MENU_STATE } from './sub-child-menu/sub-child-menu.state.model';
import { menuSelectStateReducer, MENU_SELECT_FEATURE_KEY } from './menu-select/menu-select.state.reducer';
import { INITIAL_MENU_SELECT_STATE } from './menu-select/menu-select.state.model';
import { parentMenuCrudStateReducer, PARENT_MENU_CRUD_FEATURE_KEY } from './crud/parent-menu-crud/parent-menu-crud.state.reducer';
import { PARENT_MENU_CRUD_INITIAL_STATE } from './crud/parent-menu-crud/parent-menu-crud.state.model';
import { SUB_CHILD_MENU_CRUD_INITIAL_STATE } from './crud/sub-child-menu-crud/sub-child-menu-crud.state.model';
import { subChildMenuCrudStateReducer, SUB_CHILD_MENU_CRUD_FEATURE_KEY } from './crud/sub-child-menu-crud/sub-child-menu-crud.state.reducer';
import { CHILD_MENU_CRUD_INITIAL_STATE } from './crud/child-menu-crud/child-menu-crud.state.model';
import { CHILD_MENU_CRUD_FEATURE_KEY, childMenuCrudStateReducer } from './crud/child-menu-crud/child-menu-crud.state.reducer';

@NgModule({
	imports: [
		CommonModule,

		// parent menu
		StoreModule.forFeature(PARENT_MENU_FEATURE_KEY, parentMenuStateReducer, {
			initialState: INITIAL_PARENT_MENU_STATE
		}),

		// parent menu crud
		StoreModule.forFeature(PARENT_MENU_CRUD_FEATURE_KEY, parentMenuCrudStateReducer, {
			initialState: PARENT_MENU_CRUD_INITIAL_STATE
		}),

		// child menu
		StoreModule.forFeature(CHILD_MENU_FEATURE_KEY, childMenuStateReducer, {
			initialState: INITIAL_CHILD_MENU_STATE
		}),

		// child menu crud
		StoreModule.forFeature(CHILD_MENU_CRUD_FEATURE_KEY, childMenuCrudStateReducer, {
			initialState: CHILD_MENU_CRUD_INITIAL_STATE
		}),
		
		// sub child menu
		StoreModule.forFeature(SUB_CHILD_MENU_FEATURE_KEY, subChildMenuStateReducer, {
			initialState: INITIAL_SUB_CHILD_MENU_STATE
		}),

		// sub child menu crud
		StoreModule.forFeature(SUB_CHILD_MENU_CRUD_FEATURE_KEY, subChildMenuCrudStateReducer, {
			initialState: SUB_CHILD_MENU_CRUD_INITIAL_STATE
		}),

		// menu select
		StoreModule.forFeature(MENU_SELECT_FEATURE_KEY, menuSelectStateReducer, {
			initialState: INITIAL_MENU_SELECT_STATE
		}),

		EffectsModule.forFeature([CourseMaterialMenuStateEffects]),
	],
	providers: [
		CourseMaterialMenuStateFacade,
		CourseMaterialMenuStateEffects,
	]
})
export class CourseMaterialMenuStateModule { }

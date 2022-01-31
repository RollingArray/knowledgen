/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:54:00 
 * Last modified  : 2022-01-19 00:48:13
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

@NgModule({
	imports: [
		CommonModule,

		// Global Skill CourseMaterial
		StoreModule.forFeature(PARENT_MENU_FEATURE_KEY, parentMenuStateReducer, {
			initialState: INITIAL_PARENT_MENU_STATE
		}),

		// Global Skill CourseMaterial
		StoreModule.forFeature(CHILD_MENU_FEATURE_KEY, childMenuStateReducer, {
			initialState: INITIAL_CHILD_MENU_STATE
		}),

		StoreModule.forFeature(SUB_CHILD_MENU_FEATURE_KEY, subChildMenuStateReducer, {
			initialState: INITIAL_SUB_CHILD_MENU_STATE
		}),

		EffectsModule.forFeature([CourseMaterialMenuStateEffects]),
	],
	providers: [
		CourseMaterialMenuStateFacade,
		CourseMaterialMenuStateEffects,
	]
})
export class CourseMaterialMenuStateModule { }

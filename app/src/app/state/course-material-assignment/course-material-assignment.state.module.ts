/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 12:01:20 
 * Last modified  : 2022-07-26 12:01:53
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CourseMaterialAssignmentStateEffects } from "./course-material-assignment.state.effects";
import { CourseMaterialAssignmentStateFacade } from "./course-material-assignment.state.facade";
import { COURSE_MATERIAL_ASSIGNMENT_CRUD_INITIAL_STATE } from "./crud/course-material-assignment-crud.state.model";
import { COURSE_MATERIAL_ASSIGNMENT_CRUD_FEATURE_KEY, courseMaterialAssignmentCrudStateReducer } from "./crud/course-material-assignment-crud.state.reducer";

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(COURSE_MATERIAL_ASSIGNMENT_CRUD_FEATURE_KEY, courseMaterialAssignmentCrudStateReducer, {
			initialState: COURSE_MATERIAL_ASSIGNMENT_CRUD_INITIAL_STATE
		}),

		EffectsModule.forFeature([CourseMaterialAssignmentStateEffects]),
	],
	providers: [
		 CourseMaterialAssignmentStateFacade,
		 CourseMaterialAssignmentStateEffects,
	]
})
export class  CourseMaterialAssignmentStateModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard state module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-08-12 20:16:17
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RootStateModule } from "../root/root.state.module";
import { DashboardStateEffects } from "./dashboard.state.effects";
import { DashboardStateFacade } from "./dashboard.state.facade";
import { INITIAL_DASHBOARD_STUDENT_STATE } from "./student/dashboard-student.state.model";
import { dashboardStudentStateReducer, DASHBOARD_STUDENT_FEATURE_KEY } from "./student/dashboard-student.state.reducer";

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(DASHBOARD_STUDENT_FEATURE_KEY, dashboardStudentStateReducer, {
			initialState: INITIAL_DASHBOARD_STUDENT_STATE
		}),

		EffectsModule.forFeature([DashboardStateEffects]),
		RootStateModule,
	],
	providers: [
		DashboardStateFacade,
		DashboardStateEffects,
	]
})
export class DashboardStateModule { }

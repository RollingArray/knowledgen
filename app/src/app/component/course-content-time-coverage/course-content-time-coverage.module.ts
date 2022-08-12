/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course content time coverage component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-08-12 10:16:24
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { DashboardStateModule } from "src/app/state/dashboard/dashboard.state.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { CourseContentTimeCoverageComponent } from "./course-content-time-coverage.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		PanelHeaderModule,
		DashboardStateModule,
	],

	declarations: [CourseContentTimeCoverageComponent],
	exports: [CourseContentTimeCoverageComponent],
	entryComponents: [CourseContentTimeCoverageComponent],
})
export class CourseContentTimeCoverageModule { }

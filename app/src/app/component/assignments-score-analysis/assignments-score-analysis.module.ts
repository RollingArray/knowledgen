/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignments score analysis component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-09-21 16:48:51
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { DashboardStateModule } from "src/app/state/dashboard/dashboard.state.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { AssignmentsScoreAnalysisComponent } from "./assignments-score-analysis.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		PanelHeaderModule,
		DashboardStateModule,
		PanelInfoModule
	],

	declarations: [AssignmentsScoreAnalysisComponent],
	exports: [AssignmentsScoreAnalysisComponent],
	entryComponents: [AssignmentsScoreAnalysisComponent],
})
export class AssignmentsScoreAnalysisModule { }

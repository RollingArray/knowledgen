/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Subject area strength analysis component module 
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:39:22 
 * Last modified  : 2022-09-27 21:40:50
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { DashboardStateModule } from "src/app/state/dashboard/dashboard.state.module";
import { AnalysisAreaLayoutModule } from "../analysis-area-layout/analysis-area-layout.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { SubjectAreaAnalysisSegmentModule } from "../subject-area-analysis-segment/subject-area-analysis-segment.module";
import { SubjectAreaStrengthAnalysisComponent } from "./subject-area-strength-analysis.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		PanelHeaderModule,
		PanelInfoModule,
		DashboardStateModule,
		AnalysisAreaLayoutModule,
		SubjectAreaAnalysisSegmentModule
	],

	declarations: [SubjectAreaStrengthAnalysisComponent],
	exports: [SubjectAreaStrengthAnalysisComponent],
	entryComponents: [SubjectAreaStrengthAnalysisComponent],
})
export class SubjectAreaStrengthAnalysisModule { }

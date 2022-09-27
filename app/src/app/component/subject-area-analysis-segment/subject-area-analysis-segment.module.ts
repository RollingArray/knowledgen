/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Subject area analysis segment module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:36:25 
 * Last modified  : 2022-09-27 21:36:53
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { AnalysisAreaLayoutModule } from "../analysis-area-layout/analysis-area-layout.module";
import { SubjectAreaAnalysisSegmentComponent } from "./subject-area-analysis-segment.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		AnalysisAreaLayoutModule
	],

	declarations: [SubjectAreaAnalysisSegmentComponent],
	exports: [SubjectAreaAnalysisSegmentComponent],
	entryComponents: [SubjectAreaAnalysisSegmentComponent],
})
export class SubjectAreaAnalysisSegmentModule { }

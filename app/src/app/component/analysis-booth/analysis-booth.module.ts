/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Analysis booth component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-08-12 12:01:06
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ArticleSessionStateModule } from "src/app/state/article-session/article-session.state.module";
import { AnalysisBoothComponent } from "./analysis-booth.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		ArticleSessionStateModule
	],

	declarations: [AnalysisBoothComponent],
	exports: [AnalysisBoothComponent],
	entryComponents: [AnalysisBoothComponent],
})
export class AnalysisBoothModule { }

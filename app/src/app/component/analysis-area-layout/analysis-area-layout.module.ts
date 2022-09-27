/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Analysis area layout component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:29:44 
 * Last modified  : 2022-09-27 21:30:31
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { NoDataModule } from "../no-data/no-data.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { AnalysisAreaLayoutComponent } from "./analysis-area-layout.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		PanelHeaderModule,
		PanelInfoModule,
		NoDataModule
	],
	declarations: [AnalysisAreaLayoutComponent],
	exports: [AnalysisAreaLayoutComponent],
	entryComponents: [AnalysisAreaLayoutComponent],
})
export class AnalysisAreaLayoutModule { }

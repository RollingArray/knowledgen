/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Start stop timer component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 18:02:24 
 * Last modified  : 2022-09-22 18:03:06
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { CommonButtonModule } from "../button/common-button/common-button.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { TimerModule } from "../timer/timer.component.module";
import { StartStopTimerComponent } from "./start-stop-timer.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		CourseMaterialMenuStateModule,
		TimerModule,
		PanelHeaderModule,
		CommonButtonModule
	],

	declarations: [StartStopTimerComponent],
	exports: [StartStopTimerComponent],
	entryComponents: [StartStopTimerComponent],
})
export class StartStopTimerModule { }

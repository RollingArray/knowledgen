/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignment instructions module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:49:32 
 * Last modified  : 2022-07-27 18:49:49
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { TimerModule } from "../timer/timer.component.module";
import { AssignmentInstructionsComponent } from "./assignment-instructions.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		CourseMaterialMenuStateModule,
		TimerModule
	],

	declarations: [AssignmentInstructionsComponent],
	exports: [AssignmentInstructionsComponent],
	entryComponents: [AssignmentInstructionsComponent],
})
export class AssignmentInstructionsModule { }

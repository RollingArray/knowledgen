/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignment properties module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:49:32 
 * Last modified  : 2022-09-22 16:31:24
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { AssignmentPropertiesComponent } from "./assignment-properties.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		CourseMaterialMenuStateModule,
		PanelHeaderModule,
		PanelInfoModule
	],

	declarations: [AssignmentPropertiesComponent],
	exports: [AssignmentPropertiesComponent],
	entryComponents: [AssignmentPropertiesComponent],
})
export class AssignmentPropertiesModule { }

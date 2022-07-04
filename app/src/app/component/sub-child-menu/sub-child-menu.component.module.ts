/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Sub child menu component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 20:05:19 
 * Last modified  : 2022-07-04 20:05:50
 */ 

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { SubChildMenuComponent } from './sub-child-menu.component';
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { CrudCourseMaterialTypeModule } from "../crud-course-material-type/crud-course-material-type.module";
@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, CourseMaterialMenuStateModule,
		RootStateModule, CrudCourseMaterialTypeModule, I18nModule],

	declarations: [SubChildMenuComponent],
	exports: [SubChildMenuComponent],
	entryComponents: [SubChildMenuComponent]
})
export class SubChildMenuModule { }

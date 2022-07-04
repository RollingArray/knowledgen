/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:47:28 
 * Last modified  : 2022-07-04 19:48:29
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { ChildMenuComponent } from './child-menu.component';
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { SubChildMenuModule } from "../sub-child-menu/sub-child-menu.component.module";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { CrudCourseMaterialTypeModule } from "../crud-course-material-type/crud-course-material-type.module";
@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, CourseMaterialMenuStateModule, CrudCourseMaterialTypeModule,
		RootStateModule, SubChildMenuModule, I18nModule],

	declarations: [ChildMenuComponent],
	exports: [ChildMenuComponent],
	entryComponents: [ChildMenuComponent]
})
export class ChildMenuModule { }

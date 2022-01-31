/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary ChildMenu module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-19 20:51:32
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
@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, CourseMaterialMenuStateModule,
		RootStateModule, SubChildMenuModule, I18nModule],

	declarations: [ChildMenuComponent],
	exports: [ChildMenuComponent],
	entryComponents: [ChildMenuComponent]
})
export class ChildMenuModule { }

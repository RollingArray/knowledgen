/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material layout module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-07 07:14:33 
 * Last modified  : 2022-08-07 07:19:37
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { CourseMaterialLayoutComponent } from "./course-material-layout.component";
import { CourseMaterialStateModule } from "src/app/state/course-material/course-material.state.module";

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, CourseMaterialStateModule],

	declarations: [CourseMaterialLayoutComponent],
	exports: [CourseMaterialLayoutComponent],
	entryComponents: [CourseMaterialLayoutComponent]
})
export class CourseMaterialLayoutModule { }

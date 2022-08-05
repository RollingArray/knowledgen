/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary View button module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-08-05 09:47:54
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { ViewButtonComponent } from "./view-button.component";

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule],

	declarations: [ViewButtonComponent],
	exports: [ViewButtonComponent],
	entryComponents: [ViewButtonComponent]
})
export class ViewButtonModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Common button module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-08-05 09:53:02
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { CommonButtonComponent } from "./common-button.component";

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule],

	declarations: [CommonButtonComponent],
	exports: [CommonButtonComponent],
	entryComponents: [CommonButtonComponent]
})
export class CommonButtonModule { }

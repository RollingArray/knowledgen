/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Delete button module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-07-19 09:44:16
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { DeleteButtonComponent } from "./delete-button.component";

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule],

	declarations: [DeleteButtonComponent],
	exports: [DeleteButtonComponent],
	entryComponents: [DeleteButtonComponent]
})
export class DeleteButtonModule { }

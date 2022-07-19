/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Copy button module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-07-19 09:42:49
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { CopyButtonComponent } from "./copy-button.component";

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule],

	declarations: [CopyButtonComponent],
	exports: [CopyButtonComponent],
	entryComponents: [CopyButtonComponent]
})
export class CopyButtonModule { }

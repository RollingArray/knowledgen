/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Flash card layout module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-10-06 17:18:55 
 * Last modified  : 2022-10-06 17:18:55 
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CommonButtonModule } from "../button/common-button/common-button.component.module";
import { ImageHolderModule } from "../image-holder/image-holder.module";
import { FlashCardLayoutComponent } from "./flash-card-layout.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		TranslateModule,
		SharedModule,
		CommonButtonModule,
		ImageHolderModule
	],

	declarations: [FlashCardLayoutComponent],
	exports: [FlashCardLayoutComponent],
	entryComponents: [FlashCardLayoutComponent],
})
export class FlashCardLayoutModule { }

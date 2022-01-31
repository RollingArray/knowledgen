/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-01-24 07:09:06
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { TimePipeModule } from "src/app/shared/pipe/time.pipe";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { KeywordModule } from "../keyword/keyword.component.module";
import { AvailabilityComponent } from "./availability.component";

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		RootStateModule,
		I18nModule,
		KeywordModule,
		TimePipeModule
	],

	declarations: [AvailabilityComponent],
	exports: [AvailabilityComponent],
	entryComponents: [AvailabilityComponent]
})
export class AvailabilityComponentModule { }

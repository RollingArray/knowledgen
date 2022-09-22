/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Availability component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 19:55:29 
 * Last modified  : 2022-09-22 19:56:13
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
		TimePipeModule,
		RootStateModule
	],

	declarations: [AvailabilityComponent],
	exports: [AvailabilityComponent],
	entryComponents: [AvailabilityComponent]
})
export class AvailabilityComponentModule { }

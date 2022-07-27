/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Timer module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-25 19:35:16 
 * Last modified  : 2022-07-25 19:36:47
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { TimerComponent } from "./timer.component";


@NgModule({
	imports: [CommonModule, SharedModule, IonicModule],

	declarations: [TimerComponent],
	exports: [TimerComponent],
	entryComponents: [TimerComponent]
})
export class TimerModule { }

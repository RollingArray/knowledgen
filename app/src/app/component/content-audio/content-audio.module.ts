/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Content audio module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-25 16:15:05 
 * Last modified  : 2022-08-25 16:17:57
 */

import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ContentAudioComponent } from "./content-audio.component";
import { CommonModule } from "@angular/common";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { TimerModule } from "../timer/timer.component.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule, 
    RootStateModule,
    I18nModule,
    PageInfoTitleModule,
    TimerModule
  ],
  declarations: [ContentAudioComponent],
	exports: [ContentAudioComponent],
	entryComponents: [ContentAudioComponent],
})
export class ContentAudioModule {}

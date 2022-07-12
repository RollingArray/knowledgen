/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary content image module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-12 12:08:44 
 * Last modified  : 2022-07-12 12:09:14
 */

import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ContentImageComponent } from "./content-image.component";
import { CommonModule } from "@angular/common";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule, 
    RootStateModule,
    I18nModule,
    PageInfoTitleModule
  ],
  declarations: [ContentImageComponent],
	exports: [ContentImageComponent],
	entryComponents: [ContentImageComponent],
})
export class ContentImageModule {}

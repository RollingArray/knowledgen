/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Content change visibility component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-13 10:47:19 
 * Last modified  : 2022-09-13 10:48:23
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonButtonModule } from "../button/common-button/common-button.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { ContentChangeVisibilityComponent } from "./content-change-visibility.component";

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslateModule,
		PanelHeaderModule,
		PanelInfoModule,
		CommonButtonModule,
	],
	declarations: [ContentChangeVisibilityComponent],
	exports: [ContentChangeVisibilityComponent],
	entryComponents: [ContentChangeVisibilityComponent],
})
export class ContentChangeVisibilityModule { }

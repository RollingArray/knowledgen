/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary SelectLanguage module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2021-11-11 16:42:07
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { SelectLanguageComponent } from './select-language.component';
import { I18nModule } from "src/app/shared/module/i18n.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, I18nModule, PageInfoTitleModule, RootStateModule],

	declarations: [SelectLanguageComponent],
	exports: [SelectLanguageComponent],
	entryComponents: [SelectLanguageComponent]
})
export class SelectLanguageModule { }

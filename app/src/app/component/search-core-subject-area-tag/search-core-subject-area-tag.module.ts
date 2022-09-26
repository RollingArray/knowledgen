/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Search core subject area component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-26 14:17:31 
 * Last modified  : 2022-09-26 14:18:38
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { CoreSubjectAreaTagStateModule } from "src/app/state/core-subject-area-tag/core-subject-area-tag.state.module";
import { NoDataModule } from "../no-data/no-data.component.module";
import { SearchInputModule } from "../search-input/search-input.module";
import { SearchCoreSubjectAreaTagComponent } from "./search-core-subject-area-tag.component";



@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		RouterModule,
		NoDataModule,
		SearchInputModule,
		CoreSubjectAreaTagStateModule,
		I18nModule
	],

	declarations: [SearchCoreSubjectAreaTagComponent],
	exports: [SearchCoreSubjectAreaTagComponent],
	entryComponents: [SearchCoreSubjectAreaTagComponent],
})
export class SearchCoreSubjectAreaTagModule { }

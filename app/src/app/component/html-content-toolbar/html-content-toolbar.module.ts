/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Html content toolbar module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 11:33:29 
 * Last modified  : 2022-07-13 11:39:44
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HtmlContentToolbarComponent } from './html-content-toolbar.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CourseMaterialMenuStateModule } from 'src/app/state/course-material-menu/course-material-menu.state.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		TranslateModule,
		SharedModule,
		CourseMaterialMenuStateModule
	],

	declarations: [HtmlContentToolbarComponent],
	exports: [HtmlContentToolbarComponent],
	entryComponents: [HtmlContentToolbarComponent],
})
export class HtmlContentToolbarModule { }

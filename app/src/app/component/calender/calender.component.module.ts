/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Calender component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-09-20 16:20:22
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { IonicModule } from '@ionic/angular';
import { CalenderComponent } from './calender.component';
import { CourseMaterialMenuStateModule } from 'src/app/state/course-material-menu/course-material-menu.state.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		CourseMaterialMenuStateModule,
		RootStateModule,
		I18nModule
	],

	declarations: [CalenderComponent],
	exports: [CalenderComponent],
	entryComponents: [CalenderComponent]
})
export class CalenderModule { }

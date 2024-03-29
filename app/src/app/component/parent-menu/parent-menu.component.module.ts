/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent Menu module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 20:00:41 
 * Last modified  : 2022-09-07 16:28:18
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { IonicModule } from '@ionic/angular';
import { ParentMenuComponent } from './parent-menu.component';
import { CourseMaterialMenuStateModule } from 'src/app/state/course-material-menu/course-material-menu.state.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { ChildMenuModule } from '../child-menu/child-menu.component.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { CourseMaterialStateModule } from 'src/app/state/course-material/course-material.state.module';
import { CrudCourseMaterialTypeModule } from '../crud-course-material-type/crud-course-material-type.module';
import { CommonButtonModule } from '../button/common-button/common-button.component.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { EditButtonModule } from '../button/edit-button/edit-button.component.module';
import { DeleteButtonModule } from '../button/delete-button/delete-button.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		CourseMaterialMenuStateModule,
		CourseMaterialStateModule,
		CrudCourseMaterialTypeModule,
		RootStateModule,
		ChildMenuModule,
		I18nModule,
		CommonButtonModule,
		ContentLoadingModule,
		CommonButtonModule,
		EditButtonModule,
		DeleteButtonModule,
		NoDataModule
	],

	declarations: [ParentMenuComponent],
	exports: [ParentMenuComponent],
	entryComponents: [ParentMenuComponent],
})
export class ParentMenuModule { }

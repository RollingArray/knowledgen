/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-09-07 14:55:09
 */ 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudLearningPathComponent } from './crud-learning-path.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ParentMenuModule } from '../parent-menu/parent-menu.component.module';
import { CourseMaterialLayoutModule } from '../course-material-layout/course-material-layout.component.module';
import { CommonButtonModule } from '../button/common-button/common-button.component.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule,
		PageInfoTitleModule,
		SharedModule,
		ParentMenuModule,
		CourseMaterialLayoutModule,
		CommonButtonModule,
		ContentLoadingModule
	],

	declarations: [CrudLearningPathComponent],
	exports: [CrudLearningPathComponent],
	entryComponents: [CrudLearningPathComponent],
})
export class CrudLearningPathModule { }

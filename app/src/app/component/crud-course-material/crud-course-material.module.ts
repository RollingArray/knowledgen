/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-07-04 19:42:26
 */ 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudCourseMaterialComponent } from './crud-course-material.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KeywordModule } from '../keyword/keyword.component.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { SearchCoreSubjectAreaModule } from '../search-core-subject-area/search-core-subject-area.module';

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
		KeywordModule,
		ContentLoadingModule,
		SearchCoreSubjectAreaModule
	],

	declarations: [CrudCourseMaterialComponent],
	exports: [CrudCourseMaterialComponent],
	entryComponents: [CrudCourseMaterialComponent],
})
export class CrudCourseMaterialModule { }

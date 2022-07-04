/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material type component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-06-30 12:28:23 
 * Last modified  : 2022-06-30 12:29:08
 */


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudCourseMaterialTypeComponent } from './crud-course-material-type.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KeywordModule } from '../keyword/keyword.component.module';
//import { CustomTitleModule } from '../custom-title/custom-title.module';
//import { MessageModule } from '@rc-enterprise/message';

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
		KeywordModule
	],

	declarations: [CrudCourseMaterialTypeComponent],
	exports: [CrudCourseMaterialTypeComponent],
	entryComponents: [CrudCourseMaterialTypeComponent],
})
export class CrudCourseMaterialTypeModule { }

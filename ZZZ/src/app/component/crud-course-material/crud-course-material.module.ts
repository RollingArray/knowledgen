/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-06-15 12:20:45
 * @modify date 2021-06-15 12:20:45
 * @desc Crud category module
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

	declarations: [CrudCourseMaterialComponent],
	exports: [CrudCourseMaterialComponent],
	entryComponents: [CrudCourseMaterialComponent],
})
export class CrudCourseMaterialModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material assignment result module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:56:56 
 * Last modified  : 2022-07-27 18:57:37
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudCourseMaterialAssignmentResultComponent } from './crud-course-material-assignment-result.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';

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
	],

	declarations: [CrudCourseMaterialAssignmentResultComponent],
	exports: [CrudCourseMaterialAssignmentResultComponent],
	entryComponents: [CrudCourseMaterialAssignmentResultComponent],
})
export class CrudCourseMaterialAssignmentResultModule { }

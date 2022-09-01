/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material assignment result module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:56:56 
 * Last modified  : 2022-08-31 14:57:45
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
import { CourseMaterialAssignmentLeaderBoardModule } from '../course-material-assignment-leader-board/course-material-assignment-leader-board.module';
import { CourseMaterialMenuStateModule } from 'src/app/state/course-material-menu/course-material-menu.state.module';

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
		CourseMaterialAssignmentLeaderBoardModule,
		CourseMaterialMenuStateModule
	],

	declarations: [CrudCourseMaterialAssignmentResultComponent],
	exports: [CrudCourseMaterialAssignmentResultComponent],
	entryComponents: [CrudCourseMaterialAssignmentResultComponent],
})
export class CrudCourseMaterialAssignmentResultModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud assignment quiz module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 11:11:44 
 * Last modified  : 2022-07-27 18:55:27
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudAssignmentQuizComponent } from './crud-assignment-quiz.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HtmlContentToolbarModule } from '../html-content-toolbar/html-content-toolbar.module';
import { CrudQuizQuestionModule } from '../crud-quiz-question/crud-quiz-question.module';
import { CourseMaterialQuizStateModule } from 'src/app/state/course-material-quiz/course-material-quiz.state.module';
import { CourseMaterialStateModule } from 'src/app/state/course-material/course-material.state.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { EditButtonModule } from '../button/edit-button/edit-button.component.module';
import { DeleteButtonModule } from '../button/delete-button/delete-button.component.module';
import { CopyButtonModule } from '../button/copy-button/copy-button.component.module';
import { CourseMaterialAssignmentStateModule } from 'src/app/state/course-material-assignment/course-material-assignment.state.module';
import { CrudCourseMaterialAssignmentResultModule } from '../crud-course-material-assignment-result/crud-course-material-assignment-result.module';
import { AssignmentInstructionsModule } from '../assignment-instructions/assignment-instructions.module';

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
		HtmlContentToolbarModule,
		CrudQuizQuestionModule,
		CourseMaterialQuizStateModule,
		CourseMaterialStateModule,
		CourseMaterialAssignmentStateModule,
		NoDataModule,
		EditButtonModule,
		DeleteButtonModule,
		CopyButtonModule,
		CrudCourseMaterialAssignmentResultModule,
		AssignmentInstructionsModule
	],

	declarations: [CrudAssignmentQuizComponent],
	exports: [CrudAssignmentQuizComponent],
	entryComponents: [CrudAssignmentQuizComponent],
})
export class CrudAssignmentQuizModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud assignment quiz module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 11:11:44 
 * Last modified  : 2022-09-22 19:41:13
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HtmlContentToolbarModule } from '../html-content-toolbar/html-content-toolbar.module';
import { CrudQuizQuestionModule } from '../crud-quiz-question/crud-quiz-question.module';
import { CourseMaterialStateModule } from 'src/app/state/course-material/course-material.state.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { EditButtonModule } from '../button/edit-button/edit-button.component.module';
import { DeleteButtonModule } from '../button/delete-button/delete-button.component.module';
import { CopyButtonModule } from '../button/copy-button/copy-button.component.module';
import { CourseMaterialAssignmentStateModule } from 'src/app/state/course-material-assignment/course-material-assignment.state.module';
import { AssignmentInstructionsModule } from '../assignment-instructions/assignment-instructions.module';
import { ArticleSessionModule } from '../article-session/article-session.module';
import { CourseMaterialFlashCardStateModule } from 'src/app/state/course-material-flash-card/course-material-flash-card.state.module';
import { CrudFlashCardComponent } from './crud-flash-card.component';
import { CrudRevisionFlashCardModule } from '../crud-revision-flash-card/crud-revision-flash-card.module';
import { ImageHolderModule } from '../image-holder/image-holder.module';
import { CrudCourseMaterialAssignmentResultModule } from '../crud-course-material-assignment-result/crud-course-material-assignment-result.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { StartStopTimerModule } from '../start-stop-timer/start-stop-timer.module';

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
		CourseMaterialFlashCardStateModule,
		CourseMaterialStateModule,
		CourseMaterialAssignmentStateModule,
		NoDataModule,
		EditButtonModule,
		DeleteButtonModule,
		CopyButtonModule,
		CrudCourseMaterialAssignmentResultModule,
		AssignmentInstructionsModule,
		ArticleSessionModule,
		CrudRevisionFlashCardModule,
		ImageHolderModule,
		ContentLoadingModule,
		StartStopTimerModule
	],

	declarations: [CrudFlashCardComponent],
	exports: [CrudFlashCardComponent],
	entryComponents: [CrudFlashCardComponent],
})
export class CrudFlashCardModule { }

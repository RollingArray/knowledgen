/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Knowledge base article module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-08-18 16:32:55
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { KnowledgeBaseArticleComponent } from './knowledge-base-article.component';
import { SanitizedHtmlPipeModule } from 'src/app/shared/pipe/sanitized-html.pipe';
import { CrudTextDocumentModule } from '../crud-text-document/crud-text-document.module';
import { CrudAssignmentQuizModule } from '../crud-assignment-quiz/crud-assignment-quiz.module';
import { EditButtonModule } from '../button/edit-button/edit-button.component.module';
import { AssignmentPropertiesModule } from '../assignment-properties/assignment-properties.module';
import { CrudFlashCardModule } from '../crud-flash-card/crud-flash-card.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		SanitizedHtmlPipeModule,
		CrudTextDocumentModule,
		CrudAssignmentQuizModule,
		CrudFlashCardModule,
		EditButtonModule,
		AssignmentPropertiesModule,
		CrudFlashCardModule
	],

	declarations: [KnowledgeBaseArticleComponent],
	exports: [KnowledgeBaseArticleComponent],
	entryComponents: [KnowledgeBaseArticleComponent],
})
export class KnowledgeBaseArticleModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Knowledge base article module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-07-06 17:46:26
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { KnowledgeBaseArticleComponent } from './knowledge-base-article.component';
import { SanitizedHtmlPipeModule } from 'src/app/shared/pipe/sanitized-html.pipe';
import { CrudTextDocumentModule } from '../crud-text-document/crud-text-document.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		SanitizedHtmlPipeModule,
		CrudTextDocumentModule,
	],

	declarations: [KnowledgeBaseArticleComponent],
	exports: [KnowledgeBaseArticleComponent],
	entryComponents: [KnowledgeBaseArticleComponent],
})
export class KnowledgeBaseArticleModule { }

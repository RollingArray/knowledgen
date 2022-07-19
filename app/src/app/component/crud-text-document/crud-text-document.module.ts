/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud text document component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-07-19 14:04:14
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudTextDocumentComponent } from './crud-text-document.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KeywordModule } from '../keyword/keyword.component.module';
import { SanitizedHtmlPipeModule } from 'src/app/shared/pipe/sanitized-html.pipe';
import { ArticleTextDocumentStateModule } from 'src/app/state/article-text-document/article-text-document.state.module';
import { ContentImageModule } from '../content-image/content-image.module';
import { HtmlContentToolbarModule } from '../html-content-toolbar/html-content-toolbar.module';

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
		SanitizedHtmlPipeModule,
		ArticleTextDocumentStateModule,
		ContentImageModule,
		HtmlContentToolbarModule
	],

	declarations: [CrudTextDocumentComponent],
	exports: [CrudTextDocumentComponent],
	entryComponents: [CrudTextDocumentComponent],
})
export class CrudTextDocumentModule { }

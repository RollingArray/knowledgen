/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-07-15 17:59:19
 */ 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudQuizQuestionComponent } from './crud-quiz-question.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { HtmlContentToolbarModule } from '../html-content-toolbar/html-content-toolbar.module';
import { DeleteButtonModule } from '../button/delete-button/delete-button.component.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { CommonButtonModule } from '../button/common-button/common-button.component.module';
import { SearchCoreSubjectAreaTagModule } from '../search-core-subject-area-tag/search-core-subject-area-tag.module';

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
		DeleteButtonModule,
		ContentLoadingModule,
		RootStateModule,
		CommonButtonModule,
		SearchCoreSubjectAreaTagModule
	],

	declarations: [CrudQuizQuestionComponent],
	exports: [CrudQuizQuestionComponent],
	entryComponents: [CrudQuizQuestionComponent],
})
export class CrudQuizQuestionModule { }

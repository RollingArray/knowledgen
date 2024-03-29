/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material assignment result module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:56:56 
 * Last modified  : 2022-09-02 15:02:06
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
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { PanelInfoModule } from '../panel-info/panel-info.component.module';
import { CrudNextRevisionModule } from '../crud-next-revision/crud-next-revision.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { AnalysisAreaLayoutModule } from '../analysis-area-layout/analysis-area-layout.module';
import { SubjectAreaAnalysisSegmentModule } from '../subject-area-analysis-segment/subject-area-analysis-segment.module';

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
		CourseMaterialMenuStateModule,
		PanelHeaderModule,
		PanelInfoModule,
		CrudNextRevisionModule,
		ContentLoadingModule,
		AnalysisAreaLayoutModule,
		SubjectAreaAnalysisSegmentModule
	],

	declarations: [CrudCourseMaterialAssignmentResultComponent],
	exports: [CrudCourseMaterialAssignmentResultComponent],
	entryComponents: [CrudCourseMaterialAssignmentResultComponent],
})
export class CrudCourseMaterialAssignmentResultModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-09-07 12:48:53
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeleteButtonModule } from 'src/app/component/button/delete-button/delete-button.component.module';
import { ViewButtonModule } from 'src/app/component/button/view-button/view-button.component.module';
import { ContentLoadingModule } from 'src/app/component/content-loading/content-loading.module';
import { CourseMaterialLayoutModule } from 'src/app/component/course-material-layout/course-material-layout.component.module';
import { CrudLearningPathModule } from 'src/app/component/crud-learning-path/crud-learning-path.module';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CoreSubjectAreaStateModule } from 'src/app/state/core-subject-area/core-subject-area.state.module';
import { LearningPathStateModule } from 'src/app/state/learning-path/learning-path.state.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { LearningPathPage } from './learning-path.page';





const routes: Routes = [
	{
		path: '',
		component: LearningPathPage
	},
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		SharedModule,
		NoDataModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		PanelInfoModule,
		I18nModule,
		RootStateModule,
		CrudLearningPathModule,
		DeleteButtonModule,
		CourseMaterialLayoutModule,
		LearningPathStateModule,
		ViewButtonModule,
		ContentLoadingModule,
		CoreSubjectAreaStateModule,
		RouterModule.forChild(routes)
	],
	declarations: [LearningPathPage],
	providers: [

	]
})
export class LearningPathPageModule { }

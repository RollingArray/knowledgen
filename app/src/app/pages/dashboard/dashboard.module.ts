/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:05:53 
 * Last modified  : 2022-09-16 19:06:30
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AnalysisBoothModule } from "src/app/component/analysis-booth/analysis-booth.module";
import { AssignmentsScoreAnalysisModule } from "src/app/component/assignments-score-analysis/assignments-score-analysis.module";
import { CommonButtonModule } from "src/app/component/button/common-button/common-button.component.module";
import { ContentLoadingModule } from "src/app/component/content-loading/content-loading.module";
import { CourseContentCoverageModule } from "src/app/component/course-content-coverage/course-content-coverage.module";
import { CourseContentTimeCoverageModule } from "src/app/component/course-content-time-coverage/course-content-time-coverage.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { SubjectAreaStrengthAnalysisModule } from "src/app/component/subject-area-strength-analysis/subject-area-strength-analysis.module";
import { UserPeerModule } from "src/app/component/user-peer/user-peer.module";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { DashboardStateModule } from "src/app/state/dashboard/dashboard.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { DashboardPage } from "./dashboard.page";

const routes: Routes = [
	{
		path: '',
		component: DashboardPage
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
		DashboardStateModule,
		CourseContentCoverageModule,
		CourseContentTimeCoverageModule,
		AssignmentsScoreAnalysisModule,
		AnalysisBoothModule,
		ContentLoadingModule,
		PanelInfoModule,
		CommonButtonModule,
		UserPeerModule,
		SubjectAreaStrengthAnalysisModule,
		RouterModule.forChild(routes)
	],
	declarations: [DashboardPage],
	providers: [

	]
})
export class DashboardPageModule { }

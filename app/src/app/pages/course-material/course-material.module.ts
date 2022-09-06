/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-08-08 10:41:44
 */



import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonButtonModule } from "src/app/component/button/common-button/common-button.component.module";
import { DeleteButtonModule } from "src/app/component/button/delete-button/delete-button.component.module";
import { EditButtonModule } from "src/app/component/button/edit-button/edit-button.component.module";
import { ViewButtonModule } from "src/app/component/button/view-button/view-button.component.module";
import { CourseMaterialLayoutModule } from "src/app/component/course-material-layout/course-material-layout.component.module";
import { CrudCourseMaterialModule } from "src/app/component/crud-course-material/crud-course-material.module";
import { CrudLearningPathModule } from "src/app/component/crud-learning-path/crud-learning-path.module";
import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
import { KeywordModule } from "src/app/component/keyword/keyword.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CourseMaterialStateModule } from "src/app/state/course-material/course-material.state.module";
import { LearningPathStateModule } from "src/app/state/learning-path/learning-path.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { CourseMaterialPage } from "./course-material.page";

const routes: Routes = [
	{
		path: '',
		component: CourseMaterialPage
	},
	{
		path: ":courseMaterialId/articles",
		loadChildren: () => import('../course-material-details/course-material-details.module').then( m => m.CourseMaterialDetailsPageModule),
	},
	{
		path: ":courseMaterialId/articles/:articleId",
		loadChildren: () => import('../course-material-details/course-material-details.module').then( m => m.CourseMaterialDetailsPageModule),
	}
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
		CustomFieldsModule,
		I18nModule,
		CourseMaterialStateModule,
		RootStateModule,
		CrudCourseMaterialModule,
		KeywordModule,
		DeleteButtonModule,
		EditButtonModule,
		ViewButtonModule,
		CommonButtonModule,
		CrudLearningPathModule,
		CourseMaterialLayoutModule,
		LearningPathStateModule,
		RouterModule.forChild(routes)
	],
	declarations: [CourseMaterialPage],
	providers: [

	]
})
export class CourseMaterialPageModule { }

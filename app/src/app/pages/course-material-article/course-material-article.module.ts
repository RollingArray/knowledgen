
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material article page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-09-13 10:21:07
 */



import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { AssignmentPropertiesModule } from "src/app/component/assignment-properties/assignment-properties.module";
import { CommonButtonModule } from "src/app/component/button/common-button/common-button.component.module";
import { EditButtonModule } from "src/app/component/button/edit-button/edit-button.component.module";
import { ContentChangeVisibilityModule } from "src/app/component/content-change-visibility/content-change-visibility.module";
import { CrudAssignmentQuizModule } from "src/app/component/crud-assignment-quiz/crud-assignment-quiz.module";
import { CrudFlashCardModule } from "src/app/component/crud-flash-card/crud-flash-card.module";
import { CrudTextDocumentModule } from "src/app/component/crud-text-document/crud-text-document.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { SanitizedHtmlPipeModule } from "src/app/shared/pipe/sanitized-html.pipe";
import { CourseMaterialArticlePage } from "./course-material-article.page";

const routes: Routes = [
	{
		path: "",
		component: CourseMaterialArticlePage,
	}
];

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
		CrudFlashCardModule,
		PanelHeaderModule,
		PanelInfoModule,
		CommonButtonModule,
		ContentChangeVisibilityModule,
		RouterModule.forChild(routes)
	],
	declarations: [CourseMaterialArticlePage],
	providers: [

	]
})
export class CourseMaterialArticlePageModule { }

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:10:12 
 * Last modified  : 2022-08-04 20:11:06
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ArticleSessionStateModule } from "src/app/state/article-session/article-session.state.module";
import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { ArticleSessionComponent } from "./article-session.component";

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		SharedModule,
		CourseMaterialMenuStateModule,
		ArticleSessionStateModule,
		PanelHeaderModule,
		PanelInfoModule
	],

	declarations: [ArticleSessionComponent],
	exports: [ArticleSessionComponent],
	entryComponents: [ArticleSessionComponent],
})
export class ArticleSessionModule { }

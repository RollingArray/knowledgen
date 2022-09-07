/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-01-24 07:33:36
 */

import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ViewButtonModule } from "src/app/component/button/view-button/view-button.component.module";
import { CalenderModule } from "src/app/component/calender/calender.component.module";
import { ContentLoadingModule } from "src/app/component/content-loading/content-loading.module";
import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { TimePipeModule } from "src/app/shared/pipe/time.pipe";
import { RevisionStateModule } from "src/app/state/revision/Revision.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { RevisionPage } from "./revision.page";

const routes: Routes = [
	{
		path: '',
		component: RevisionPage
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
		RevisionStateModule,
		RootStateModule,
		CalenderModule,
		TimePipeModule,
		ViewButtonModule,
		ContentLoadingModule,
		RouterModule.forChild(routes)
	],
	declarations: [RevisionPage],
	providers: [
		DatePipe
	]
})
export class RevisionPageModule { }

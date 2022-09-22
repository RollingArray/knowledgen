/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Mentor mentee component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 20:17:46 
 * Last modified  : 2022-09-22 20:19:09
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { I18nModule } from "src/app/shared/module/i18n.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { AvailabilityPlannerStateModule } from "src/app/state/availability-planner/availability-planner.state.module";
import { RootStateModule } from "src/app/state/root/root.state.module";
import { AvailabilityComponentModule } from "../availability/availability.component.module";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "../no-data/no-data.component.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PanelInfoModule } from "../panel-info/panel-info.component.module";
import { MentorMenteeComponent } from "./mentor-mentee.component";




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
		 AvailabilityPlannerStateModule,
		 RootStateModule,
		 AvailabilityComponentModule,
	 ],
	 declarations: [MentorMenteeComponent],
	 exports: [MentorMenteeComponent],
	entryComponents: [MentorMenteeComponent]
	 
 })
 export class MentorMenteeComponentModule { }
 
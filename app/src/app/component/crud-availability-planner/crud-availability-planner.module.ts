/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Crud availability planner component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 19:59:56 
 * Last modified  : 2022-09-22 20:00:57
 */

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrudAvailabilityPlannerComponent } from './crud-availability-planner.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KeywordModule } from '../keyword/keyword.component.module';

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
		KeywordModule
	],
	providers:[DatePipe],
	declarations: [CrudAvailabilityPlannerComponent],
	exports: [CrudAvailabilityPlannerComponent],
	entryComponents: [CrudAvailabilityPlannerComponent],
})
export class CrudAvailabilityPlannerModule { }

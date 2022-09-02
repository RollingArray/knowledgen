/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Crud next revision module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-02 22:00:26 
 * Last modified  : 2022-09-02 22:01:59
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CrudNextRevisionComponent } from './crud-next-revision.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { PanelInfoModule } from '../panel-info/panel-info.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		TranslateModule,
		SharedModule,
		PanelHeaderModule,
		PanelInfoModule
	],

	declarations: [CrudNextRevisionComponent],
	exports: [CrudNextRevisionComponent],
	entryComponents: [CrudNextRevisionComponent],
})
export class CrudNextRevisionModule { }

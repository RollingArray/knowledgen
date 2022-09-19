/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Crud peer component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:32:06 
 * Last modified  : 2022-09-19 19:32:54
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CrudPeerComponent } from './crud-peer.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KeywordModule } from '../keyword/keyword.component.module';
import { UserPeerStateModule } from 'src/app/state/user-peer/user-peer.state.module';
import { CommonButtonModule } from '../button/common-button/common-button.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		SharedModule,
		KeywordModule,
		UserPeerStateModule,
		CommonButtonModule
	],

	declarations: [CrudPeerComponent],
	exports: [CrudPeerComponent],
	entryComponents: [CrudPeerComponent],
})
export class CrudPeerModule { }

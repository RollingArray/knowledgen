/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Account verification module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 14:25:52 
 * Last modified  : 2022-10-06 19:01:57
 */

import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountVerificationComponent } from './account-verification.component';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		I18nModule,
		RootStateModule,
		PageInfoTitleModule
	],

	declarations: [AccountVerificationComponent],
	exports: [AccountVerificationComponent],
	entryComponents: [AccountVerificationComponent]
})
export class AccountVerificationModule { }

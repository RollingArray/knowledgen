/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Sign in page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 17:23:00 
 * Last modified  : 2021-11-11 16:58:12
 */

import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignInPage } from './sign-in.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AccountVerificationModule } from 'src/app/component/account-verification/account-verification.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';

const routes: Routes = [
	{
		path: '',
		component: SignInPage
	}
];

@NgModule({
	imports: [
		IonicModule,
		RouterModule.forChild(routes),
		SharedModule,
		PageInfoTitleModule,
		I18nModule,
		RootStateModule,
		AccountVerificationModule
	],
	declarations: [SignInPage]
})
export class SignInPageModule { }

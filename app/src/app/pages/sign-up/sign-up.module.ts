/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sign up page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:17:44 
 * Last modified  : 2021-12-27 15:32:10
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { AccountVerificationModule } from 'src/app/component/account-verification/account-verification.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PageInfoTitleModule,
    AccountVerificationModule,
    I18nModule,
    RootStateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}

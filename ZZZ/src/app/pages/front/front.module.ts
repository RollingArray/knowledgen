/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Front page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:16:28 
 * Last modified  : 2021-12-26 11:17:13
 */

import { IntroModule } from './../../component/intro/intro.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrontPage } from './front.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { SelectLanguageModule } from 'src/app/component/select-language/select-language.component.module';

const routes: Routes = [
  {
    path: '',
    component: FrontPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroModule,
    I18nModule,
    SelectLanguageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrontPage]
})
export class FrontPageModule {}

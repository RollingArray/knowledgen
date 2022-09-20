/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User profile component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 08:43:51 
 * Last modified  : 2022-09-20 08:44:49
 */

import { PageInfoTitleModule } from './../page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { IonicModule } from '@ionic/angular';
import { UserProfileComponent } from './user-profile.component';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { AvatarModule } from '../avatar/avatar.component.module';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		I18nModule,
		RootStateModule,
		ContentLoadingModule,
		AvatarModule
	],
	declarations: [UserProfileComponent],
	exports: [UserProfileComponent],
	entryComponents: [UserProfileComponent],
})
export class UserProfileModule { }

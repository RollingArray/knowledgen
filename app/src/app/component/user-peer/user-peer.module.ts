/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:14:13 
 * Last modified  : 2022-09-19 19:15:07
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UserPeerComponent } from './user-peer.component';
import { PageInfoTitleModule } from '../page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CourseMaterialAssignmentLeaderBoardModule } from '../course-material-assignment-leader-board/course-material-assignment-leader-board.module';
import { CourseMaterialMenuStateModule } from 'src/app/state/course-material-menu/course-material-menu.state.module';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { PanelInfoModule } from '../panel-info/panel-info.component.module';
import { CrudNextRevisionModule } from '../crud-next-revision/crud-next-revision.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { UserPeerStateModule } from 'src/app/state/user-peer/user-peer.state.module';
import { CrudPeerModule } from '../crud-peer/crud-peer.module';
import { DeleteButtonModule } from '../button/delete-button/delete-button.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';

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
		CourseMaterialAssignmentLeaderBoardModule,
		CourseMaterialMenuStateModule,
		PanelHeaderModule,
		PanelInfoModule,
		CrudNextRevisionModule,
		ContentLoadingModule,
		UserPeerStateModule,
		CrudPeerModule,
		DeleteButtonModule,
		NoDataModule
	],

	declarations: [UserPeerComponent],
	exports: [UserPeerComponent],
	entryComponents: [UserPeerComponent],
})
export class UserPeerModule { }

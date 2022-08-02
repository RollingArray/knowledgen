/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Course material assignment leader board component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-02 08:58:52 
 * Last modified  : 2022-08-02 09:00:35
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CourseMaterialAssignmentLeaderBoardComponent } from './course-material-assignment-leader-board.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		SharedModule,
		TranslateModule
	],

	declarations: [CourseMaterialAssignmentLeaderBoardComponent],
	exports: [CourseMaterialAssignmentLeaderBoardComponent],
	entryComponents: [CourseMaterialAssignmentLeaderBoardComponent],
})
export class CourseMaterialAssignmentLeaderBoardModule { }

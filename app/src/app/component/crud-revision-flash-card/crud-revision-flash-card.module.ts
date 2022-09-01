/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud revision flash card module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-01 18:19:03 
 * Last modified  : 2022-09-01 18:20:32
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CourseMaterialFlashCardStateModule } from "src/app/state/course-material-flash-card/course-material-flash-card.state.module";
import { DeleteButtonModule } from "../button/delete-button/delete-button.component.module";
import { ContentAudioModule } from "../content-audio/content-audio.module";
import { ContentImageModule } from "../content-image/content-image.module";
import { HtmlContentToolbarModule } from "../html-content-toolbar/html-content-toolbar.module";
import { ImageHolderModule } from "../image-holder/image-holder.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { CrudRevisionFlashCardComponent } from "./crud-revision-flash-card.component";

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
		HtmlContentToolbarModule,
		DeleteButtonModule,
		CourseMaterialFlashCardStateModule,
		ContentImageModule,
		ImageHolderModule,
		ContentAudioModule
	],

	declarations: [CrudRevisionFlashCardComponent],
	exports: [CrudRevisionFlashCardComponent],
	entryComponents: [CrudRevisionFlashCardComponent],
})
export class CrudRevisionFlashCardModule { }

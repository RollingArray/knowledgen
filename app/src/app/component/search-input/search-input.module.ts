/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Search input component template module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-26 14:17:31 
 * Last modified  : 2022-09-26 14:19:59
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputComponent } from './search-input.component';
import { CommonButtonModule } from '../button/common-button/common-button.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		CommonButtonModule
	],

	declarations: [SearchInputComponent],
	exports: [SearchInputComponent],
	entryComponents: [SearchInputComponent],
})
export class SearchInputModule { }

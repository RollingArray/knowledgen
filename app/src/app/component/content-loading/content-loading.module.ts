/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Content loading module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-07 11:51:57 
 * Last modified  : 2022-09-07 11:55:18
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentLoadingComponent } from './content-loading.component';

@NgModule({
	declarations: [ContentLoadingComponent],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule
	],
	exports: [ContentLoadingComponent]
})
export class ContentLoadingModule { }

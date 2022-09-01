/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Image holder module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-01 18:12:07 
 * Last modified  : 2022-09-01 18:13:12
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageHolderComponent } from './image-holder.component';

@NgModule({
	declarations: [ImageHolderComponent],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule
	],
	exports: [ImageHolderComponent]
})
export class ImageHolderModule { }

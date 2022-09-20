/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Avatar component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 11:18:54 
 * Last modified  : 2022-09-20 11:19:32
 */	

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './avatar.component';


@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  entryComponents: [AvatarComponent]
})
export class AvatarModule {}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Panel info component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-13 09:45:15 
 * Last modified  : 2022-09-21 14:21:51
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelInfoComponent } from './panel-info.component';
import { I18nModule } from 'src/app/shared/module/i18n.module';

@NgModule({
  imports: [CommonModule, IonicModule, I18nModule],

  declarations: [PanelInfoComponent],
  exports: [PanelInfoComponent],
  entryComponents: [PanelInfoComponent]
})
export class PanelInfoModule {}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Panel info component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-13 09:45:15 
 * Last modified  : 2022-09-13 09:46:15
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
  selector: 'panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.scss'],
})
export class PanelInfoComponent extends BaseViewComponent implements OnInit {

  @Input() title = '';
  @Input() panelColor = '';
  @Input() panelIcon;
  
  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}

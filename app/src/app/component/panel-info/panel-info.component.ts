import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

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

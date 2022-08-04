import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss'],
})
export class PanelHeaderComponent extends BaseViewComponent implements OnInit {

  @Input() panelTitle;
  @Input() panelIcon;
  @Input() panelColor;

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}

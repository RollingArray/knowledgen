import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
	selector: 'panel-header',
	templateUrl: './panel-header.component.html',
	styleUrls: ['./panel-header.component.scss'],
})
export class PanelHeaderComponent extends BaseViewComponent implements OnInit
{

	/**
	   * -------------------------------------------------|
	   * @description										|
	   * @readonly properties								|
	   * -------------------------------------------------|
	   */


	/**
	  * -------------------------------------------------|
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */
	
	/**
	 * Description  of panel header component
	 */
	@Input() panelTitle = '';

	/**
	 * Input  of panel header component
	 */
	@Input() panelIcon = '';

	/**
	 * Input  of panel header component
	 */
	@Input() panelColor = '';

	/**
	 * Input  of panel header component
	 */
	@Input() fontColor = 'primary';

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	constructor(
		injector: Injector,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() { }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Panel info component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-13 09:45:15
 * Last modified  : 2022-09-21 14:28:51
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { StringKey } from 'src/app/shared/constant/string.constant';

@Component({
	selector: 'panel-info',
	templateUrl: './panel-info.component.html',
	styleUrls: ['./panel-info.component.scss'],
})
export class PanelInfoComponent extends BaseViewComponent implements OnInit {
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of panel info component
	 */
	private _showMore = true;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                        |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of panel info component
	 */
	@Input() title = '';

	/**
	 * Input  of panel info component
	 */
	@Input() panelColor = '';

	/**
	 * Input  of panel info component
	 */
	@Input() panelIcon = StringKey.ICON_INFO;

	/**
	 * Input  of panel info component
	 */
	@Input() fontClass = 'font-size-15-px';

	/**
	 * Input  of panel info component
	 */
	@Input() fontColor = 'medium';

	/**
	 * Input  of panel info component
	 */
	@Input() showMoreLess = false;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get showMore() {
		return this._showMore;
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @ViewChild Instance variable                     |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of panel info component.
	 * @param injector
	 */
	constructor(injector: Injector) {
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() {}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Private methods                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions panel info component
	 */
	toggleContentView() {
		this._showMore = !this._showMore;
	}
}

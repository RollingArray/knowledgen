/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Common button component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-08-05 09:54:35
 */

import { Component, OnInit, Output, Injector, EventEmitter, Input } from "@angular/core";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { BaseViewComponent } from "../../base/base-view.component";

@Component({
	selector: "common-button",
	templateUrl: "./common-button.component.html",
	styleUrls: ["./common-button.component.scss"],
})
export class CommonButtonComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	  * -------------------------------------------------|
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */
	@Output() event = new EventEmitter();

	/**
	 * Input  of common button component
	 */
	@Input() title = '';

	/**
	 * Input  of common button component
	 */
	@Input() icon = '';

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
	 * Gets description
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

	/**
	 * Descriptions edit button component
	 */
	onTap()
	{
		this.event.emit();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */


}
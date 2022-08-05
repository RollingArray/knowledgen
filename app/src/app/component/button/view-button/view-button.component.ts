/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary View button component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-08-05 09:48:27
 */

import { Component, OnInit, Output, Injector, EventEmitter } from "@angular/core";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { BaseViewComponent } from "../../base/base-view.component";

@Component({
	selector: "view-button",
	templateUrl: "./view-button.component.html",
	styleUrls: ["./view-button.component.scss"],
})
export class ViewButtonComponent extends BaseViewComponent implements OnInit
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

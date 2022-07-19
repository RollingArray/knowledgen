/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Copy button component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-15 12:55:08 
 * Last modified  : 2022-07-19 09:42:56
 */

import { Component, OnInit, Output, Injector, EventEmitter } from "@angular/core";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { BaseViewComponent } from "../../base/base-view.component";

@Component({
	selector: "copy-button",
	templateUrl: "./copy-button.component.html",
	styleUrls: ["./copy-button.component.scss"],
})
export class CopyButtonComponent extends BaseViewComponent implements OnInit
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

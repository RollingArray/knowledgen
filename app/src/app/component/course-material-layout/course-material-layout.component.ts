/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material layout component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-07 07:14:33 
 * Last modified  : 2022-08-07 07:27:47
 */

import { Component, OnInit, Input, Injector } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { BaseViewComponent } from "../base/base-view.component";


@Component({
	selector: "course-material-layout",
	templateUrl: "./course-material-layout.component.html",
	styleUrls: ["./course-material-layout.component.scss"],
})
export class CourseMaterialLayoutComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	/**
	 * String key of course material layout component
	 */
	readonly stringKey = StringKey;

	/**
	  * -------------------------------------------------|
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */

	/**
	 * Input  of course material layout component
	 */
	@Input() courseMaterialId = '';

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
	 * Course material$ of crud text document component
	 */
	 public courseMaterial$!: Observable<CourseMaterialModel>;

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
		private courseMaterialStateFacade: CourseMaterialStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{ 
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this.courseMaterialId);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}

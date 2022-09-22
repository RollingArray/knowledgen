/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignment instructions component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:49:32 
 * Last modified  : 2022-09-22 17:20:12
 */

import { Component, OnInit, Injector, Input} from "@angular/core";
import { Observable } from "rxjs";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'assignment-instructions',
	templateUrl: './assignment-instructions.component.html',
	styleUrls: ['./assignment-instructions.component.scss'],
})
export class AssignmentInstructionsComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud course material component
	 */
	readonly arrayKey = ArrayKey;

	/**
	 * String key of crud course material component
	 */
	readonly stringKey = StringKey;

	/**
	 * Operations enum of crud text document component
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * Course material type id enum of assignment instructions component
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Input  of assignment instructions component
	 */
	@Input() isMaterialOwner = false;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() noOfQuestions = 0;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() courseMaterialTypeId: CourseMaterialTypeIdEnum;

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
	public selectedMenuArticle$: Observable<MenuSelectModel>;
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
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

	/**
	 * Creates an instance of assignment instructions component.
	 * @param injector 
	 */
	constructor(
		injector: Injector
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}

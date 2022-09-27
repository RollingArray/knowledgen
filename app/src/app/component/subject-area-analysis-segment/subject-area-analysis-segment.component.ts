/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Subject area analysis segment component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:36:25 
 * Last modified  : 2022-09-27 21:37:03
 */

import { Component, OnInit, Injector, Input } from "@angular/core";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'subject-area-analysis-segment',
	templateUrl: './subject-area-analysis-segment.component.html',
	styleUrls: ['./subject-area-analysis-segment.component.scss'],
})
export class SubjectAreaAnalysisSegmentComponent extends BaseFormComponent implements OnInit
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
	 * Characteristics enum of article session component
	 */
	readonly characteristicsEnum = CharacteristicsEnum;

	/**
	 * Strong min limit of subject area analysis segment component
	 */
	readonly strongMinLimit = 80

	/**
	 * Weak min limit of subject area analysis segment component
	 */
	readonly weakMinLimit = 41

	/**
	 * Weak max limit of subject area analysis segment component
	 */
	readonly weakMaxLimit = 79

	/**
	 * Neutral min limit of subject area analysis segment component
	 */
	readonly neutralMinLimit = 0

	/**
	 * Neutral max limit of subject area analysis segment component
	 */
	readonly neutralMaxLimit = 40

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of subject area analysis segment component
	 */
	private _coreSubjectAreaAnalysis: CoreSubjectAreaModel[] = [];

	/**
	 * Strong subject areas of subject area analysis segment component
	 */
	private _strongSubjectAreas: CoreSubjectAreaTagModel[] = [];

	/**
	 * Weak subject areas of subject area analysis segment component
	 */
	private _weakSubjectAreas: CoreSubjectAreaTagModel[] = [];

	/**
	 * Neutral subject areas of subject area analysis segment component
	 */
	private _neutralSubjectAreas: CoreSubjectAreaTagModel[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of subject area analysis segment component
	 */
	@Input() coreSubjectAreaTags: CoreSubjectAreaTagModel[] = [];

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
	 * Gets description
	 */
	get coreSubjectAreaAnalysis()
	{
		return this._coreSubjectAreaAnalysis;
	}

	get strongSubjectAreas()
	{
		return this._strongSubjectAreas
	}

	get weakSubjectAreas()
	{
		return this._weakSubjectAreas
	}

	get neutralSubjectAreas()
	{
		return this._neutralSubjectAreas
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of subject area analysis segment component.
	 * @param injector 
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
	ngOnInit()
	{
		//
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		this.coreSubjectAreaTags.map(eachCoreSubjectAreaTag =>
			{
				
				const strongAreaPercentage = parseInt(((eachCoreSubjectAreaTag.strongAreaAnalysis / (eachCoreSubjectAreaTag.strongAreaAnalysis + eachCoreSubjectAreaTag.weakAreaAnalysis)) * 100).toFixed(2))
				if (strongAreaPercentage >= this.weakMinLimit && strongAreaPercentage <= this.weakMaxLimit)
				{
					this._weakSubjectAreas = [
						...this._weakSubjectAreas,
						eachCoreSubjectAreaTag
					];
				}
				else if (strongAreaPercentage >= this.neutralMinLimit && strongAreaPercentage <= this.neutralMaxLimit)
				{
					this._neutralSubjectAreas = [
						...this._neutralSubjectAreas,
						eachCoreSubjectAreaTag
					];
				}
				else if (strongAreaPercentage >= this.strongMinLimit)
				{
					this._strongSubjectAreas = [
						...this._strongSubjectAreas,
						eachCoreSubjectAreaTag
					];
				}
			})
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

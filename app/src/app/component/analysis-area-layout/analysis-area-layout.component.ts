/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Analysis area layout component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-27 21:29:44 
 * Last modified  : 2022-09-27 21:30:24
 */

import { Component, OnInit, Input, Injector } from "@angular/core";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { BaseFormComponent } from "../base/base-form.component";


@Component({
	selector: 'analysis-area-layout',
	templateUrl: './analysis-area-layout.component.html',
	styleUrls: ['./analysis-area-layout.component.scss'],
})
export class AnalysisAreaLayoutComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of analysis area layout component
	 */
	readonly stringKey = StringKey;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of analysis area layout component
	 */
	@Input() areaName = '';

	/**
	 * Input  of analysis area layout component
	 */
	@Input() areaInfo = '';

	/**
	 * Input  of analysis area layout component
	 */
	@Input() areaIcon = '';

	/**
	 * Input  of analysis area layout component
	 */
	@Input() subjectAreas?: CoreSubjectAreaTagModel[] = [];

	/**
	 * Input  of analysis area layout component
	 */
	@Input() progressBarColor = '';

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
	 * Creates an instance of analysis area layout component.
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

	/**
	 * Descriptions analysis area layout component
	 * @param subjectAreaTag 
	 * @returns  
	 */
	public calculatePercentage(subjectAreaTag: CoreSubjectAreaTagModel)
	{
		const factor = (subjectAreaTag.strongAreaAnalysis / (subjectAreaTag.strongAreaAnalysis + subjectAreaTag.weakAreaAnalysis));
		return parseInt((factor * 100).toFixed(2));
	}

	/**
	 * Calculates out of1
	 * @param subjectAreaTag 
	 * @returns  
	 */
	public calculateOutOf1(subjectAreaTag: CoreSubjectAreaTagModel)
	{
		const factor = (subjectAreaTag.strongAreaAnalysis / (subjectAreaTag.strongAreaAnalysis + subjectAreaTag.weakAreaAnalysis));
		return factor * 1;
	}
}

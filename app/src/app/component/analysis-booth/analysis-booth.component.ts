/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Analysis booth component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 07:40:24 
 * Last modified  : 2022-08-12 12:14:31
 */

import { Component, OnInit, Input, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleSessionStateFacade } from "src/app/state/article-session/article-session.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'analysis-booth',
	templateUrl: './analysis-booth.component.html',
	styleUrls: ['./analysis-booth.component.scss'],
})
export class AnalysisBoothComponent extends BaseFormComponent implements OnInit
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
	 * Characteristics enum of article session component
	 */
	readonly characteristicsEnum = CharacteristicsEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud assignment quiz component
	 */
	@Input() baseNumber = 0;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() lastNumber = 0;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() secondLastNumber = 0;

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
	 * Gets description
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
	 * Creates an instance of analysis booth component.
	 * @param injector 
	 * @param translateService 
	 * @param articleSessionStateFacade 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
		private articleSessionStateFacade: ArticleSessionStateFacade
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

	public analysis()
	{
		return this.articleSessionStateFacade.gapAnalysis(
			this.lastNumber,
			this.secondLastNumber,
		)
	}
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary ChildMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-23 16:19:56
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Injector, Input} from "@angular/core";
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ArrayKey } from 'src/app/shared/constant/array.constant';

@Component({
	selector: "keyword",
	templateUrl: "./keyword.component.html",
	styleUrls: ["./keyword.component.scss"],
})
export class KeywordComponent extends BaseViewComponent implements OnInit
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
	  * @description										|
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */
	@Input() context;

	private _keyWords: string[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	
	/**
	 * Description  of crud course material component
	 */
	readonly arrayKey = ArrayKey;
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */

	 get keyWords()
	 {
		 return this._keyWords;
	 }
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
	 * Creates an instance of course material page.
	 * @param injector
	 */
	constructor(
		injector: Injector
	)
	{
		super(injector);
	}

	/**
	 * on changes
	 */
	ngOnChanges() {
        
        var $text = this.context;

		const commonWords = this.arrayKey.COMMON_WORDS;
		// Convert to lowercase
		$text = $text.toLowerCase();

		// replace unnesessary chars. leave only chars, numbers and space
		$text = $text.replace(/[^\w\d ]/g, '');

		var result: string[] = $text.split(' ');

		// remove $commonWords
		result = result.filter(function (word)
		{
			return commonWords.indexOf(word) === -1;
		});

		//Unique words
		let unique = [...new Set(result)];

		// remove any white space
		unique = unique.filter(function(str) {
			return /\S/.test(str);
		});
		this._keyWords = unique;
	}
	
	/**
	 * on init
	 */
	async ngOnInit()
	{
		
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
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	 
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Search input component template component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-26 14:17:31 
 * Last modified  : 2022-09-26 14:21:41
 */

import { Component, OnInit, ViewChild, ElementRef, Injector, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StringKey } from '../../shared/constant/string.constant';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Regex } from '../../shared/constant/regex.constant';
import { TitleTypeEnum } from '../../shared/enum/title-type.enum';
import { BaseViewComponent } from '../base/base-view.component';

@Component({
	selector: 'search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent extends BaseViewComponent implements OnInit, AfterViewInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Input & Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of search input component
	 */
	@Output() emitSearchKey = new EventEmitter<string>();

	/**
	 * Output  of search input component
	 */
	@Output() emitUnSearchedKey = new EventEmitter<string>();

	/**
	 * Input  of search input component
	 */
	@Input() searchKey: string = '';

	/**
	 * Input  of search input component
	 */
	@Input() addUnsearchableEntity: boolean = false;

	/**
	 * Input  of search input component
	 */
	@Input() enableUnsearchableAddButton = false;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Title type enum of search skill component
	 */
	readonly titleTypeEnum = TitleTypeEnum;

	/**
	 * @description String key of search skill component
	 */
	readonly stringKey = StringKey;

	/**
	 * @description Determines whether valid is
	 */
	private _isValid: boolean = true;

	/**
	 * View child of search input component
	 */
	@ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Gets whether is valid
	 */
	public get isValid(): boolean
	{
		return this._isValid;
	}

	/**
	 * @description Sets whether is valid
	 */
	public set isValid(value: boolean)
	{
		this._isValid = value;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of search input component.
	 * @param injector 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
	)
	{
		super(injector);
	}

	/**
	 * @description Descriptions search skill component
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * @description after view init
	 */
	ngAfterViewInit()
	{
		this.searchOnKeyUp();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Search on key up
	 */
	private searchOnKeyUp()
	{
		fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// get value
			// tslint:disable:no-any
			map((event: any) =>
			{
				return event.target.value;
			}),
			debounceTime(500), // wait for a seconde to to send the request
			distinctUntilChanged(), //If previous query is different from current   
			takeUntil(this.unsubscribe)
		)
			.subscribe(async (search: string) =>
			{

				this.searchKey = search;

				//emit event to reload load data from network
				this.emitSearchKey.emit(search);
			});
	}

	/**
	 * @description Checks skill valid
	 * @param text 
	 */
	private async checkSKillValid(text: string)
	{
		const regx = new RegExp(Regex.NAME_PATTERN);
		if (regx.test(text))
		{
			this._isValid = true;
		} else
		{
			this._isValid = false;
		}
	}

	/**
	 * Selects un searched result
	 */
	public selectUnSearchedResult()
	{
		this.checkSKillValid(this.searchKey);

		if (this._isValid)
		{
			this.emitUnSearchedKey.emit(this.searchKey);
		}
		else
		{
			//
		}
	}
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary No data component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-23 19:33:50 
 * Last modified  : 2022-09-19 19:37:25
 */


import { Component, OnInit, Input, Injector } from '@angular/core';
import { BaseViewComponent } from '../base/base-view.component';

@Component({
	selector: 'app-no-data',
	templateUrl: './no-data.component.html',
	styleUrls: ['./no-data.component.css']
})
export class NoDataComponent extends BaseViewComponent implements OnInit
{
	/**
	 * Input  of no data component
	 */
	@Input() text: string;

	/**
	 * Input  of no data component
	 */
	@Input() courseMaterial = false;

	/**
	 * Input  of no data component
	 */
	@Input() fontColor = 'dark';

	/**
	 * Input  of no data component
	 */
	@Input() panelColor = 'white';

	/**
	 * Creates an instance of no data component.
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
}

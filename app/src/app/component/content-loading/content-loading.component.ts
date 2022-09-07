/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Content loading component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-07 11:51:57 
 * Last modified  : 2022-09-07 19:41:03
 */

import { Component, Input, OnInit } from '@angular/core';
import { StringKey } from 'src/app/shared/constant/string.constant';

@Component({
	selector: 'content-loading',
	templateUrl: './content-loading.component.html',
	styleUrls: ['./content-loading.component.scss']
})
export class ContentLoadingComponent implements OnInit {

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of parent menu component
	 */
	@Input() generalContent = false;

	/**
	 * Input  of content loading component
	 */
	@Input() gridContent = false;

	/**
	 * Input  of content loading component
	 */
	@Input() singleContent = false;

	/**
	 * Input  of content loading component
	 */
	@Input() menuContent = false;

	/**
	 * Input  of content loading component
	 */
	@Input() graphContent = false;
	
	/**
	 * Creates an instance of image holder component.
	 */
	constructor() {
		//
	}

	/**
	 * @description on init
	 */
	ngOnInit(): void {
	}
}

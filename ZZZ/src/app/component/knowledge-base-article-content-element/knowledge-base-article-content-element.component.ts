/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-12 00:57:02
 * @modify date 2021-12-12 00:57:02
 * @desc Knowledge base article content element component
 */


import { Component, OnInit, Injector, Input, AfterViewInit } from '@angular/core';
import { StringKey } from '../../shared/constant/string.constant';
import { TitleTypeEnum } from '../../shared/enum/title-type.enum';
import { ElementTypeEnum } from '../../shared/enum/element-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentModel } from '../../shared/model/content.model';
import { ContentElementModel } from 'src/app/shared/model/content-element.model';
import { BaseViewComponent } from '../base/base-view.component';


@Component({
	selector: 'knowledge-base-article-content-element',
	templateUrl: './knowledge-base-article-content-element.component.html',
	styleUrls: ['./knowledge-base-article-content-element.component.scss'],
})
export class KnowledgeBaseArticleContentElementComponent extends BaseViewComponent implements OnInit, AfterViewInit {
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Input & Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Description  of knowledge base article component
	 */
	@Input() content: ContentElementModel[] = [];

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
	 * @description Element type enum of knowledge base article content element component
	 */
	readonly elementTypeEnum = ElementTypeEnum;

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
	 * Creates an instance of knowledge base article component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
		private sanitizer: DomSanitizer
	) {
		super(injector);
		console.log(this.content);
	}

	/**
	 * @description Descriptions search skill component
	 */
	ngOnInit() {
		this.loadData();
	}

	/**
	 * @description after view init
	 */
	ngAfterViewInit() {
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Descriptions skill requirement page
	 */
	loadData() {
		//
	}

	/**
	 * @description Descriptions knowledge base article content element component
	 * @param imageName 
	 * @returns  
	 */
	public getImagePath(imageName: string)
	{
		//return `${this.stringKey.KNOWLEDGE_BASE_IMAGE_PATH}${imageName}${this.stringKey.KNOWLEDGE_BASE_IMAGE_TYPE}`
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}

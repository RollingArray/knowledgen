/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Learn more component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-05 11:29:45 
 * Last modified  : 2021-12-26 18:02:41
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/shared/constant/api-urls.constant';

@Component({
	selector: 'app-learn-more',
	templateUrl: './learn-more.component.html',
	styleUrls: ['./learn-more.component.scss'],
})
export class LearnMoreComponent extends BaseViewComponent implements OnInit, OnDestroy
{
	/**
	 * Gets year
	 */
	 get year()
	 {
		 var date = new Date();
		 return date.getFullYear();
	 }
	
	/**
	 * String key of learn more component
	 */
	readonly stringKey = StringKey;

	/**
	 * App version of learn more component
	 */
	readonly appVersion = environment.version;

	/**
	 * App environment of learn more component
	 */
	readonly appEnvironment = environment.level ? environment.level : '';

	/**
	 * Creates an instance of learn more component.
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
	ngOnInit() { }

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * Knowledges base
	 */
	async knowledgeBase()
	{
		(window as any).open(ApiUrls.HELP, "_blank");
	}
	/**
	 * Faqs learn more component
	 */
	async faq()
	{
		(window as any).open(ApiUrls.GITHUB, "_blank");
	}

	/**
	 * Tncs learn more component
	 */
	async tnc()
	{
		(window as any).open(ApiUrls.HELP_T_C, "_blank");
	}

	/**
	 * learn more component
	 */
	async pp()
	{
		(window as any).open(ApiUrls.HELP_PP, "_blank");
	}

	/**
	 * Closes modal
	 */
	closeModal() {
		// store active user
		this.dismissModal();
	}

}

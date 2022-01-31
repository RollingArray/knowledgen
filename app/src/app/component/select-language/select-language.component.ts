/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary SelectLanguage component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-26 23:12:37
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Injector } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { ArrayKey } from 'src/app/shared/constant/array.constant';

@Component({
	selector: "app-select-language",
	templateUrl: "./select-language.component.html",
	styleUrls: ["./select-language.component.scss"],
})
export class SelectLanguageComponent extends BaseViewComponent implements OnInit
{

	readonly languages = ArrayKey.LANGUAGES;
	
	constructor(
		injector: Injector,
		public translateService: TranslateService,
		private cookieService: CookieService
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
	 * Selects lang
	 * @param language 
	 */
	async selectLang(language)
	{
		this.cookieService.set(LocalStoreKey.LANGUAGE, language);
		this.translateService.use(language);
		this.dismissModal();
	}
}

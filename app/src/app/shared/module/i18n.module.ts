import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreKey } from '../constant/local-store-key.constant';

@NgModule({
	imports: [
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: translateLoaderFactory,
				deps: [HttpClient]
			}
		}),
	],
	exports: [TranslateModule]
})
export class I18nModule
{
	/**
	 * Creates an instance of i18n module.
	 * @param translate 
	 */
	constructor(translate: TranslateService, private cookieService: CookieService)
	{
		translate.addLangs(['en', 'ben']);
		const browserLang = this.cookieService.get(LocalStoreKey.LANGUAGE) || translate.getBrowserLang();
    	translate.use(browserLang.match(/en|ben/) ? browserLang : 'ben');
	}
}

/**
 * Translates loader factory
 * @param httpClient 
 * @returns  
 */
export function translateLoaderFactory(httpClient: HttpClient)
{
	return new TranslateHttpLoader(httpClient);
}
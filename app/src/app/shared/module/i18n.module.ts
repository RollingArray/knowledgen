/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary i18n module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 20:22:59 
 * Last modified  : 2022-09-22 20:23:15
 */

import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import
	{
		TranslateLoader,
		TranslateModule,
		TranslateService,
	} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ArrayKey } from '../constant/array.constant';
import { RootStateModule } from 'src/app/state/root/root.state.module';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { take } from 'rxjs/operators';

@NgModule({
	imports: [
		RootStateModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: translateLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
	exports: [TranslateModule],
})
export class I18nModule
{
	/**
	 * Gets languages
	 */
	get languages()
	{
		let languages: string[] = [];
		ArrayKey.LANGUAGES.map((eachLanguage) =>
		{
			languages = [...languages, eachLanguage.code];
		});
		return languages;
	}

	/**
	 * Creates an instance of i18n module.
	 * @param translate
	 */
	constructor(
		translate: TranslateService,
		private rootStateFacade: RootStateFacade
	)
	{
		this.rootStateFacade.preferredLanguage$
			.pipe(take(1))
			.subscribe((language) =>
			{
				translate.addLangs(this.languages);
				const browserLang = language || translate.getBrowserLang();
				//translate.use(browserLang.match(/en|ben/) ? browserLang : 'ben');
				translate.use(browserLang);
			});
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

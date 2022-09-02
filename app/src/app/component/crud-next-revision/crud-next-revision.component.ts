/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Crud next revision component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-02 22:00:26 
 * Last modified  : 2022-09-02 22:01:12
 */

import { Component, OnInit, Injector, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { ArticleRepetitionService } from "src/app/shared/service/article-Repetition.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'crud-next-revision',
	templateUrl: './crud-next-revision.component.html',
	styleUrls: ['./crud-next-revision.component.scss'],
})
export class CrudNextRevisionComponent extends BaseFormComponent implements OnInit
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
	 * Regex  of crud course material component
	 */
	readonly regex = Regex;

	/**
	 * String key of crud course material component
	 */
	readonly stringKey = StringKey;

	/**
	 * Api urls of crud course material component
	 */
	readonly apiUrls = ApiUrls;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud assignment quiz component
	 */
	@Input() spaceRepetitionDay = '';

	@Input() articleId = '';

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
	 * Creates an instance of crud course material component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade,
		private articleRepetitionService: ArticleRepetitionService,
		private loadingService: LoadingService,
		private toastService: ToastService
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
	 * @description Inits loading
	 */
	private initLoading()
	{
		// present loader
		this.translateService
			.get('loading.holdTightResult')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Submits create edit project component
	 */
	async submit()
	{
		this.initLoading();
		const model: ArticleModel = {
			articleId: '62fcb82724699', //this.articleId,
			articleRevisionDate: this.spaceRepetitionDay,
			operationType: OperationsEnum.CREATE
		};

		this.articleRepetitionService
			.crudArticleRepetition(model)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(articleModel =>
			{
				this.loadingService.dismiss();
				
				// show tost
				this.translateService
					.get('response.articleRevision')
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (data: string) =>
					{
						// success response
						this.toastService.presentToast(
							data
						);
					});
			});
	}
}

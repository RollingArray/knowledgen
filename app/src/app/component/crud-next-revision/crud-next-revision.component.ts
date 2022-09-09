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
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ResultTypeEnum } from "src/app/shared/enum/retust-type.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { ArticleRevisionService } from "src/app/shared/service/article-revision.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { RevisionStateFacade } from "src/app/state/revision/revision.state.facade";
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
	 * Result type enum of crud next revision component
	 */
	readonly resultTypeEnum = ResultTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud next revision component
	 */
	@Input() spaceRepetitionDay = '';

	/**
	 * Input  of crud next revision component
	 */
	@Input() articleId = '';

	/**
	 * Input  of crud next revision component
	 */
	@Input() resultType: ResultTypeEnum;

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
	 public modalLoadingIndicatorStatus$: Observable<boolean>;

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
		private articleRevisionService: ArticleRevisionService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private revisionStateFacade: RevisionStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;
		this.modalLoadingIndicatorStatus$.subscribe(data => console.log(data));
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
		this.rootStateFacade.startModalLoading();
		const model: ArticleModel = {
			articleId: this.articleId,
			articleRevisionDate: this.spaceRepetitionDay,
			operationType: OperationsEnum.CREATE
		};

		this.revisionStateFacade.requestAddRevision(model);
	}
}

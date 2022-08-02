/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Course material assignment leader board component component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-02 08:58:52 
 * Last modified  : 2022-08-02 09:03:14
 */

import { Component, OnInit, Injector } from "@angular/core";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { BaseFormComponent } from "../base/base-form.component";
import { CourseMaterialAssignmentStateFacade } from 'src/app/state/course-material-assignment/course-material-assignment.state.facade';
import { CourseMaterialAssignmentLeaderBoardModel } from "src/app/shared/model/course-material-assignment-leader-board.model";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";

@Component({
	selector: 'course-material-assignment-leader-board',
	templateUrl: './course-material-assignment-leader-board.component.html',
	styleUrls: ['./course-material-assignment-leader-board.component.scss'],
})
export class CourseMaterialAssignmentLeaderBoardComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material assignment leader board component
	 */
	private _courseMaterialAssignmentLeaderBoard: CourseMaterialAssignmentLeaderBoardModel[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	public get courseMaterialAssignmentLeaderBoard()
	{
		return this._courseMaterialAssignmentLeaderBoard;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of course material assignment leader board component.
	 * @param injector 
	 * @param courseMaterialAssignmentStateFacade 
	 */
	constructor(
		injector: Injector,
		private courseMaterialAssignmentStateFacade: CourseMaterialAssignmentStateFacade
	)
	{
		super(injector);

		// get act upon curd model from store
		this.courseMaterialAssignmentStateFacade.operationCourseMaterialAssignment$.subscribe(
			data =>
			{
				this.sortRewardByDescendingOrder(data);
			}
		);
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
	 * Sorts reward by descending order
	 * @param data 
	 */
	 private sortRewardByDescendingOrder(data: CourseMaterialAssignmentResultModel)
	 {
		 if (data.assignmentLeaderBoard.data.length > 0)
		 {
			 let leaderBoard = data.assignmentLeaderBoard.data;
 
			 this._courseMaterialAssignmentLeaderBoard = [...leaderBoard].sort(function (a, b)
			 {
				 return b.articleAssignmentCompletionReward - a.articleAssignmentCompletionReward;
			 });
		 }
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
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}

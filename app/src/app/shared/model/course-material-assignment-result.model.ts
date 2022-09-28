/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment result model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 09:46:23 
 * Last modified  : 2022-08-04 20:13:04
 */

import { OperationsEnum } from "../enum/operations.enum";
import { ArticleSessionModel } from "./article-session.model";
import { BaseModel } from "./base.model";
import { CoreSubjectAreaTagModel } from "./core-subject-area-tag.model";
import { CourseMaterialAssignmentLeaderBoardModel } from "./course-material-assignment-leader-board.model";

export interface CourseMaterialAssignmentResultModel extends BaseModel
{
    articleId?: string;
    articleAssignmentCompletionTime?: string;
    articleAssignmentCompletionReward?: number;
    articleAssignmentTotalNoOfQuestions?: number;
    articleAssignmentTotalNoOfCorrectAnswers?: number;
    assignmentLeaderBoard?: {
        success: boolean,
        data: CourseMaterialAssignmentLeaderBoardModel[]
    }
    sessionTime?: {
        success: boolean,
        data: ArticleSessionModel
    },
    coreSubjectAreaTagAnalysis?: CoreSubjectAreaTagModel[];
    operationType?: OperationsEnum;
}

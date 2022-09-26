/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 13:54:40 
 * Last modified  : 2022-07-19 20:57:48
 */

import { OperationsEnum } from "../enum/operations.enum";
import { QuizTypeEnum } from "../enum/quiz-type.enum";
import { BaseModel } from "./base.model";
import { CoreSubjectAreaTagModel } from "./core-subject-area-tag.model";
import { CourseMaterialQuizAnswerModel } from "./course-material-quiz-answer.model";

export interface CourseMaterialQuizModel extends BaseModel, CoreSubjectAreaTagModel
{
    articleId?: string;
    courseMaterialId?: string;
    questionId?: string;
    question?: string;
    quizType?: QuizTypeEnum;
    options?: CourseMaterialQuizAnswerModel[];
    isCorrectAnswerMapped?: boolean;
    operationType?: OperationsEnum;
}

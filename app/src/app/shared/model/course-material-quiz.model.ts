/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 13:54:40 
 * Last modified  : 2022-07-13 19:17:52
 */

import { OperationsEnum } from "../enum/operations.enum";
import { QuizTypeEnum } from "../enum/quiz-type.enum";
import { BaseModel } from "./base.model";
import { CourseMaterialQuizAnswerModel } from "./course-material-quiz-answer.model";

export interface CourseMaterialQuizModel extends BaseModel
{
    articleId?: string;
    courseMaterialId?: string;
    questionId?: string;
    question?: string;
    quizType?: QuizTypeEnum;
    options?: CourseMaterialQuizAnswerModel[];
    operationType?: OperationsEnum;
}

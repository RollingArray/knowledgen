/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard student model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:08:58 
 * Last modified  : 2022-08-12 20:09:20
 */



import { BaseModel } from "./base.model"
import { UserModel } from "./user.model"

export interface DashboardStudentModel extends BaseModel, UserModel
{
	studySessions: {
		totalStudySessions: number,
		totalCurrentMonthStudySessions: number,
		totalPreviousMonthStudySessions: number
	},
	sessionAssignments: {
		totalAssessments: number,
		totalCurrentMonthAssessments: number,
		totalPreviousMonthAssessments: number,
		quizAssessment: {
			totalQuizAssessments: number,
			totalCurrentMonthQuizAssessments: number,
			totalPreviousMonthQuizAssessments: number
		},
		dragContentAssessment: {
			totalDragContentAssessments: number,
			totalCurrentMonthDragContentAssessments: number,
			totalPreviousMonthDragContentAssessments: number
		},
		fillBlankAssessment: {
			totalFillBlankAssessments: number,
			totalCurrentMonthFillBlankAssessments: number,
			totalPreviousMonthFillBlankAssessments: number
		}
	},
	assignmentsScoreAnalysis: {
		totalGoodScore: number,
		totalAverageScore: number,
		totalPoorScore: number
	},
	courseContentCoverageOverTime: {
		month: string,
		contentCoverage: number
	}[],
	courseContentTimeCoverageOverTime: {
		month: string,
		contentTimeCoverage: number
	}[]
}

/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard student state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:11:17 
 * Last modified  : 2022-09-21 17:49:22
 */


import { DashboardStudentModel } from 'src/app/shared/model/dashboard-student.model';

/**
 * Dashboard student state model
 */
export interface DashboardStudentStateModel extends DashboardStudentModel { }

/**
 * @description Initial student state model initial state
 */
export const INITIAL_DASHBOARD_STUDENT_STATE: DashboardStudentStateModel = {
    studyPoints: 0,
    studySessions: {
        totalStudySessions: 0,
        totalCurrentMonthStudySessions: 0,
        totalPreviousMonthStudySessions: 0
    },
    sessionAssignments: {
        totalAssessments: 0,
        totalCurrentMonthAssessments: 0,
        totalPreviousMonthAssessments: 0,
        quizAssessment: {
            totalQuizAssessments: 0,
            totalCurrentMonthQuizAssessments: 0,
            totalPreviousMonthQuizAssessments: 0
        },
        dragContentAssessment: {
            totalDragContentAssessments: 0,
            totalCurrentMonthDragContentAssessments: 0,
            totalPreviousMonthDragContentAssessments: 0
        },
        fillBlankAssessment: {
            totalFillBlankAssessments: 0,
            totalCurrentMonthFillBlankAssessments: 0,
            totalPreviousMonthFillBlankAssessments: 0
        },
        textDocumentAssessment: {
			totalTextDocumentAssessments: 0,
			totalCurrentMonthTextDocumentAssessments: 0,
			totalPreviousMonthTextDocumentAssessments: 0
		},
		
		flashCardAssessment: {
			totalFlashCardAssessments: 0,
			totalCurrentMonthFlashCardAssessments: 0,
			totalPreviousMonthFlashCardAssessments: 0
		}
    },
    assignmentsScoreAnalysis: {
        totalGoodScore: 0,
        totalAverageScore: 0,
        totalPoorScore: 0
    },
    courseContentCoverageOverTime: [],
    courseContentTimeCoverageOverTime: []
};
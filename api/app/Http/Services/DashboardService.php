<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use App\Http\Interfaces\DashboardServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\User;

class DashboardService implements DashboardServiceInterface
{    
    /**
     * Return data structure service interface
     *
     * @var mixed
     */
    protected $returnDataStructureServiceInterface;

    protected $courseMaterialAssignmentResultServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface,
        CourseMaterialAssignmentResultServiceInterface $courseMaterialAssignmentResultServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
        $this->courseMaterialAssignmentResultServiceInterface = $courseMaterialAssignmentResultServiceInterface;
	}

    /**
     * Get student dashboard
     *
     * @param  mixed $userId
     * @return mixed
     */
    public function getStudentDashboard($userId){
        $tempRows = array();
        $studySessionsRows = array();

        $studySessions = $this->courseMaterialAssignmentResultServiceInterface->getAllSession($userId);
        //$tempRows['study_sessions'] = $studySessions;
        
        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($studySessions);
    }

    /**
     * Get teacher dashboard
     *
     * @param  mixed $userId
     * @return mixed
     */
    public function getTeacherDashboard($userId){
        $tempRows = array();
        $studySessionsRows = array();

        $studySessions = $this->courseMaterialAssignmentResultServiceInterface->getAllSession($userId);
        //$tempRows['study_sessions'] = $studySessions;
        
        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($studySessions);
    }
}
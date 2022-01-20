<?php

namespace App\Http\Services;

use App\Http\Interfaces\ReturnDataStructureServiceInterface;

class ReturnDataStructureService implements ReturnDataStructureServiceInterface
{  
        
    /**
     * generateKeyValueStructure
     *
     * @param  mixed $data
     * @return void
     */
    public function generateKeyValueStructure($data)
    {
        $tempRows = array();
        foreach ($data as $key => $value) {
            $tempRows[$key] = $value;
        }

        return $tempRows;
    }
    
    /**
     * generateServiceReturnDataStructure
     *
     * @param  mixed $passedData
     * @return void
     */
    public function generateServiceReturnDataStructure($passedData)
    {
        $responseData = array();

        //echo "$passedData".json_encode($passedData);

        if ($passedData) {
            $responseData['success'] = true;
            $responseData['data'] = $passedData;
        } else {
            $responseData['success'] = false;
        }


        return $responseData;
    }
}

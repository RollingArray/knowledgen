<?php

namespace App\Http\Interfaces;

Interface ReturnDataStructureServiceInterface
{
    public function generateKeyValueStructure($data);

    public function generateServiceReturnDataStructure($passedData);
}
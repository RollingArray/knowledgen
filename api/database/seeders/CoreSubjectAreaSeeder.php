<?php

namespace Database\Seeders;

use App\Models\CoreSubjectAreaModel;
use Illuminate\Database\Seeder;

class CoreSubjectAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subjectAreas = array(
            "Anthropology",
            "Archaeology",
            "History",
            "Linguistics and languages",
            "Philosophy",
            "Religion",
            "Culinary arts",
            "Literature",
            "Performing arts",
            "Visual arts",
            "Economics",
            "Geography",
            "Ethnic and cultural studies",
            "Gender and sexuality studies",
            "Organizational studies",
            "Political science",
            "Psychology",
            "Sociology",
            "Biology",
            "Chemistry",
            "Earth sciences",
            "Physics",
            "Space sciences",
            "Astronomy",
            "Computer sciences",
            "Logic",
            "Mathematics",
            "Pure mathematics",
            "Applied mathematics",
            "Statistics",
            "Systems science",
            "Agriculture",
            "Architecture and design",
            "Business",
            "Divinity",
            "Journalism, media studies and communication",
            "Law",
            "Library and museum studies",
            "Medicine",
            "Military sciences",
            "Public administration",
            "Public policy",
            "Social work",
            "Transportation"
        );

        foreach($subjectAreas as $option){
            CoreSubjectAreaModel::create([
                'subject_area_id' => uniqid(),
                'subject_area_name' => $option
            ]);
        }
    }
}

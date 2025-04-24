'use client';
import { useState } from 'react';
import SchoolAssessmentSteps from '@/components/selfAssessment/SchoolAssessmentSteps';
import { NavBar } from '@/components/navigation/NavBar';

export default function SelfAssessment() {

    return (
        <>
            {/* <NavBar /> */}
            {/* <main className="min-h-screen bg-gray-50 py-10"> */}
                <SchoolAssessmentSteps />
            {/* </main> */}
        </>
    );
}
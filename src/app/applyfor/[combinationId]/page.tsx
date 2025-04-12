import SchoolAssessmentSteps from '@/components/selfAssessment/SchoolAssessmentSteps';
import { NavBar } from '@/components/navigation/NavBar';

export default function SelfAssessment() {

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <SchoolAssessmentSteps />
            </main>
        </>
    );
}
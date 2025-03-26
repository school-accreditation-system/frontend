'use client';

interface ProvisionalResultsProps {
    overallScore: number;
    ranking: string;
    decision: string;
    accreditationYears: number;
}

export function ProvisionalResults({
    overallScore = 45,
    ranking,
    decision,
    accreditationYears,
}: ProvisionalResultsProps) {
    return (
        <div className="p-6 bg-white shadow-md rounded-md space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">Provisional Results</h2>
            <div className="text-lg">
                <p>
                    <span className="font-medium">Overall Score:</span> {overallScore.toFixed(2)}%
                </p>
                <p>
                    <span className="font-medium">Provisional Ranking:</span> {ranking}
                </p>
                <p>
                    <span className="font-medium">Provisional Decision:</span> {decision}
                </p>
                <p>
                    <span className="font-medium">Provisional Accreditation Years:</span> {accreditationYears}
                </p>
            </div>
        </div>
    );
} 
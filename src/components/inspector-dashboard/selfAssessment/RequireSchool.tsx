"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSchool } from "@/components/auth/SchoolContext.tsx";
import { School, Loader2 } from "lucide-react";

interface RequireSchoolProps {
    children: React.ReactNode;
    fallback?: React.ReactNode; // Optional: what to show if no school
}

export const RequireSchool = ({ children, fallback }: RequireSchoolProps) => {
    const { school, openSchoolDialog } = useSchool();

    useEffect(() => {
        if (!school) {
            openSchoolDialog();
        }
    }, [school, openSchoolDialog]);

    if (!school) {
        return (
            fallback || (
                <div className="flex flex-col items-center justify-center min-h-[40vh] py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <School className="w-8 h-8 text-primary" />
                        <span className="text-xl font-semibold text-primary">Select Your School</span>
                    </div>
                    <div className="text-gray-600 mb-4 text-center max-w-md">
                        You must select a school to access this page. Please use the dialog to choose your school.
                    </div>
                    <Loader2 className="animate-spin text-primary w-6 h-6" />
                </div>
            )
        );
    }

    return <>{children}</>;
};
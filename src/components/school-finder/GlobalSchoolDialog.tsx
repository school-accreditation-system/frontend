// src/components/school/GlobalSchoolDialog.tsx
"use client";
import { SchoolFinderDialog } from "@/components/school-finder";
import { useSchool } from "@/components/auth/SchoolContext.tsx";

export default function GlobalSchoolDialog() {
    const { schoolDialogOpen, closeSchoolDialog, setSchool } = useSchool();
    return (
        <SchoolFinderDialog
            isOpen={schoolDialogOpen}
            onOpenChange={open => (open ? undefined : closeSchoolDialog())}
            onSchoolSelect={setSchool}
            title="Select your school"
            description="We need to know which school you are applying for."
        />
    );
}
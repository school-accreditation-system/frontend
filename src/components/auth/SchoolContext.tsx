"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { School } from "@/types/school.ts";

interface SchoolContextType {
    school: School | null;
    setSchool: (school: School) => void;
    clearSchool: () => void;
    schoolDialogOpen: boolean;
    openSchoolDialog: () => void;
    closeSchoolDialog: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider = ({ children }: { children: ReactNode }) => {
    const [school, setSchoolState] = useState<School | null>(null);
    const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("selectedSchool");
        if (stored) setSchoolState(JSON.parse(stored));
    }, []);

    const setSchool = (school: School) => {
        setSchoolState(school);
        localStorage.setItem("selectedSchool", JSON.stringify(school));
        setSchoolDialogOpen(false);
    };

    const clearSchool = () => {
        setSchoolState(null);
        localStorage.removeItem("selectedSchool");
    };

    const openSchoolDialog = () => setSchoolDialogOpen(true);
    const closeSchoolDialog = () => setSchoolDialogOpen(false);

    return (
        <SchoolContext.Provider
            value={{
                school,
                setSchool,
                clearSchool,
                schoolDialogOpen,
                openSchoolDialog,
                closeSchoolDialog,
            }}
        >
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchool = () => {
    const ctx = useContext(SchoolContext);
    if (!ctx) throw new Error("useSchool must be used within a SchoolProvider");
    return ctx;
};
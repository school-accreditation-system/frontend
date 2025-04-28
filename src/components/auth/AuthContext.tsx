"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface School {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    school: School | null;
    setSchool: (school: School) => void;
    clearSchool: () => void;
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [school, setSchoolState] = useState<School | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        const storedToken = localStorage.getItem("authToken");
        const storedSchool = localStorage.getItem("selectedSchool");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        if (storedSchool) {
            setSchoolState(JSON.parse(storedSchool));
        }
    }, []);

    const login = (user: AuthUser, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setSchoolState(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        localStorage.removeItem("selectedSchool");
    };

    const setSchool = (school: School) => {
        setSchoolState(school);
        localStorage.setItem("selectedSchool", JSON.stringify(school));
    };

    const clearSchool = () => {
        setSchoolState(null);
        localStorage.removeItem("selectedSchool");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token && !!school,
                school,
                setSchool,
                clearSchool,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AccreditationCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    colorScheme: {
        background: string;
        iconBackground: string;
        iconColor: string;
        border: string;
        buttonBackground: string;
        buttonText: string;
        buttonHover: string;
    };
}

export const AccreditationCard = ({
    title,
    description,
    icon,
    onClick,
    colorScheme
}: AccreditationCardProps) => {
    return (
        <div
            className={`flex flex-col h-full rounded-xl p-6 transition-all duration-300 ${colorScheme.background} ${colorScheme.border} border shadow-sm hover:shadow-md transform hover:-translate-y-1`}
        >
            <div className="flex items-start mb-4">
                <div className={`p-3 rounded-lg ${colorScheme.iconBackground} ${colorScheme.iconColor}`}>
                    {icon}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>

            <p className="text-gray-600 mb-6 flex-grow">{description}</p>

            <button
                onClick={onClick}
                className={`mt-auto w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-medium transition-colors ${colorScheme.buttonBackground} ${colorScheme.buttonText} hover:${colorScheme.buttonHover}`}
            >
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
            </button>
        </div>
    );
};
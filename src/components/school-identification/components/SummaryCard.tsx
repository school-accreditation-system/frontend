'use client';

import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  count: number;
  className?: string;
  textColor?: string;
}

export const SummaryCard = ({
  title,
  count,
  className = "",
  textColor = "text-blue-600"
}: SummaryCardProps) => {
  return (
    <div className={`bg-white p-3 rounded-md shadow-sm border border-gray-100 ${className}`}>
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`text-xl font-bold ${textColor}`}>{count}</p>
    </div>
  );
}; 
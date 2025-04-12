// src/components/common/SchoolSearchCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { SchoolDTO } from '@/hooks/useSchool';
import { cn } from '@/lib/utils';


export const SchoolSearchCard = ({
  school,
  isSelected,
  onSelect,
}: {   
  school: SchoolDTO;
  isSelected: boolean;
  onSelect: (school: SchoolDTO) => void;
}) => {
  return (
    <Card
      key={school.id}
      className={cn(
        "cursor-pointer transition-all border hover:shadow-md gap-2 md:p-1",
        isSelected ? "border-primary bg-blue-50/50" : "border-gray-200 hover:border-primary/40"
      )}
      onClick={() => onSelect(school)}
    >
      <CardHeader className="px-3 sm:p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
            {school.schoolName + " " + (school.schoolCode ? `(${school.schoolCode})` : "")}
          </CardTitle>
          {isSelected && (
            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          )}
        </div>
        <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
          {school.village}
        </CardDescription>
        <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-x-4">
          {school.email && <p>📧 {school.email}</p>}
          {school.phone && <p>📞 {school.phone}</p>}
          {school.website && <p>🌐 {school.website}</p>}
          {school.province && school.district && (
            <p>📍 {school.district}, {school.province}</p>
          )}
        </div>
      </CardHeader>
      <CardFooter className="px-3 sm:p-4 flex gap-1.5 sm:gap-2 flex-wrap border-t border-gray-100">
        {school.schoolIdentification && (
          <Badge variant="outline" className="text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            School ID
          </Badge>
        )}
        {school.selfAssessment && (
          <Badge variant="outline" className="text-xs sm:text-sm bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            Self Assessment
          </Badge>
        )}
        {school.hasOrdinaryLevel && (
          <Badge variant="outline" className="text-xs sm:text-sm bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
            O-Level
          </Badge>
        )}
        {school.hasAdvancedLevel && (
          <Badge variant="outline" className="text-xs sm:text-sm bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
            A-Level
          </Badge>
        )}
        {school.hasBoardingStatus && (
          <Badge variant="outline" className="text-xs sm:text-sm bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100">
            Boarding
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
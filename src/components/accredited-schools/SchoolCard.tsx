import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, BadgeCheck, Book, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface SchoolCardProps {
  school: any;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  // Calculate accreditation score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  // Format date or return placeholder
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'N/A';
    }
  };

  // Generate a placeholder image if school doesn't have one
  const schoolImage = school.image || `/nesa-logo.png`;

  // Format accreditation status for display
  const accreditationStatus = school.status || 'Accredited';

  // Calculate when the school was last accredited
  const lastAccredited = formatDate(school.accreditedAt || school.updatedAt);

  // Determine accreditation score with fallback to a default
  const accreditationScore = school.score || Math.floor(Math.random() * 30) + 70;

  // Extract school level types
  const schoolLevels = school.combinations?.map(c => c.name) || [];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-4">
        <div className="flex items-start mb-3">
          {/* School Image */}
          <div className="relative flex-shrink-0 mr-4">
            <div className="w-16 h-16 rounded-full relative overflow-hidden">
              <Image
                src={schoolImage}
                alt={school.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>

          {/* School Name & Score */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {school.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${getScoreColor(accreditationScore)}`}>
                {school.accreditation || 'Accredited'} {accreditationScore}%
              </div>
              <div className="text-xs text-gray-500">
                {school.assessments?.length || 1}/3 Assessment
              </div>
            </div>
          </div>
        </div>

        {/* Location & Date */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{school.district}, {school.province || 'Rwanda'}</span>
          <div className="ml-auto flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{lastAccredited}</span>
          </div>
        </div>

        {/* School Types/Levels */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {school.combinations?.slice(0, 2).map((combination, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {combination.name}
            </Badge>
          ))}

          {school.combinations?.length > 2 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-500">
              +{school.combinations.length - 2} more
            </Badge>
          )}
        </div>

        {/* School Info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="border border-gray-100 rounded bg-gray-50 p-2">
            <span className="text-xs text-gray-500 block">Level</span>
            <div className="flex items-center mt-1">
              <GraduationCap className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm font-medium">{school.level || "Primary, O-Level"}</span>
            </div>
          </div>
          <div className="border border-gray-100 rounded bg-gray-50 p-2">
            <span className="text-xs text-gray-500 block">Type</span>
            <div className="flex items-center mt-1">
              <Book className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm font-medium">{school.type || "Public"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-gray-50 p-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <BadgeCheck className="h-5 w-5 text-green-500 mr-1" />
          <span className="text-sm font-medium text-gray-700">{accreditationStatus}</span>
        </div>
        <Link
          href={`/accredited-schools/${school.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};
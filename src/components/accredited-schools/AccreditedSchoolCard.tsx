'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AccreditedSchoolCardProps {
  school: any;
}

export function AccreditedSchoolCard({ school }: AccreditedSchoolCardProps) {
  // Calculate match percentage based on accreditation level or other criteria
  const getMatchPercentage = () => {
    if (school.accreditationLevel === 'full') return 90;
    if (school.accreditationLevel === 'partial') return 60;
    if (school.accreditationLevel === 'provisional') return 50;
    return 10; // Default for schools with issues
  };
  
  const matchPercentage = getMatchPercentage();
  
  // Determine badge color based on match percentage
  const getBadgeColor = () => {
    if (matchPercentage >= 80) return 'bg-green-100 text-green-800';
    if (matchPercentage >= 50) return 'bg-yellow-100 text-yellow-800'; 
    return 'bg-red-100 text-red-800';
  };
  
  // Format location string
  const locationString = `${school.district || ''}, ${school.province || 'Rwanda'}`;
  
  // Format last updated time
  const formattedDate = school.updatedAt 
    ? new Date(school.updatedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric' 
      })
    : '10 hours ago';
    
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      {/* Card Header with Image and Basic Info */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* School Image/Avatar */}
          <div className="relative rounded-full overflow-hidden h-16 w-16 flex-shrink-0">
            {school.photoUrl ? (
              <Image
                src={school.photoUrl}
                alt={school.name}
                layout="fill"
                objectFit="cover"
                className="bg-gray-200"
              />
            ) : (
              <div className="bg-blue-100 h-full w-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            )}
          </div>
          
          {/* School Basic Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{school.name}</h3>
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor()}`}>
                Matched {matchPercentage}%
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-2">
              {school.assessmentStatus || "3/3 Assessment"} {/* Default value */}
              <span className="inline-block ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                {matchPercentage}%
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span>{locationString}</span>
              
              <span className="mx-1 text-gray-300">•</span>
              
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skills/Combinations Section */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {school.combinations?.slice(0, 3).map((combination, index) => (
            <span 
              key={`${school.id}-combo-${index}`}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
            >
              {combination.name}
            </span>
          ))}
          
          {(school.combinations?.length || 0) > 3 && (
            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
              +{school.combinations.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* School Type and Level */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">School Type</span>
            <span className={`px-2 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full`}>
              {school.type || "Public"}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Level</span>
            <span className={`px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full`}>
              {school.level || "Primary"}
            </span>
          </div>
        </div>
      </div>
      
      {/* Card Footer with Button */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <Link href={`/accredited-schools/${school.id}`} passHref>
          <Button 
            variant="ghost"
            className="w-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-between"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
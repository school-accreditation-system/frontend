import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AccreditedSchool } from '@/types/accredited-schools';
import { Building, Calendar, Phone, Mail, Globe, MapPin, Star, Award, FileCheck, ShieldCheck, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';


export const SchoolCard = ({ school, className }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Date formatter utility with fallback
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (error) {
      return 'Date not available';
    }
  };

  // Get status styles based on accreditation status
  const getStatusStyles = (status: string) => {
    const isFullyAccredited = status?.toLowerCase() === 'fully accredited';
    return {
      container: cn(
        "relative px-5 py-3 text-white",
        isFullyAccredited 
          ? "bg-gradient-to-r from-emerald-600 to-emerald-500" 
          : "bg-gradient-to-r from-amber-600 to-amber-500"
      ),
      badge: cn(
        "px-2.5 py-1 text-xs font-medium rounded-full",
        isFullyAccredited 
          ? "bg-emerald-700/20 text-emerald-50" 
          : "bg-amber-700/20 text-amber-50"
      )
    };
  };

  // Status badge color handler
  const getStatusIcon = (status: string) => {
    if (!status) return null;
    
    switch(status.toLowerCase()) {
      case 'fully accredited':
        return <Award className="h-3.5 w-3.5 mr-1.5" />;
      case 'provisionally accredited':
        return <FileCheck className="h-3.5 w-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Certificate Button */}
      <div className="absolute -top-2 -right-2 z-10">
        <Button 
          size="sm"
          className={cn(
            "rounded-full p-0 w-12 h-12 shadow-lg",
            school.accreditationStatus?.toLowerCase() === 'fully accredited' 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-amber-500 hover:bg-amber-600",
          )}
          onClick={() => setShowCertificate(!showCertificate)}
        >
          <ShieldCheck className="h-5 w-5 text-white" />
        </Button>
      </div>

      <Card className={cn(
        "overflow-hidden border border-gray-200 rounded-xl bg-white flex flex-col relative",
        className
      )}>
        {/* Status Banner */}
        <div className={getStatusStyles(school.accreditationStatus).container}>
          <div className="flex items-center justify-between">
            <div>
              <Badge className={getStatusStyles(school.accreditationStatus).badge}>
                {school.accreditationStatus?.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Award className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-50 h-8 w-8" />
        </div>
        
        {/* School header */}
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center min-w-0">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0 border border-blue-200">
                <Building className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                  {school.name || 'Unnamed School'}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-400" />
                  {school.address || 'Address not available'}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        
        {/* Accreditation dates section */}
        <div className="px-5 py-3 bg-gray-50 border-y border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-2 flex-shrink-0 border border-blue-100">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Last Accredited</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(school.lastAccreditationDate)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-2 flex-shrink-0 border border-blue-100">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Next Review</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(school.nextReviewDate)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-3 pb-2 px-5 flex-grow flex flex-col">
          <div className="space-y-3 flex-grow">
            {/* Accreditation badges */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 border border-blue-200">
                  <Star className="h-3.5 w-3.5" />
                </span>
                Accredited For
              </h4>
              <div className="flex flex-wrap gap-1.5 ml-8">
                {(school.accreditationFields && school.accreditationFields.length > 0) ? (
                  <>
                    {school.accreditationFields.map((field, index) => (
                      <div key={field.id || index}>
                        <Badge 
                          className={field.color || "bg-blue-50 text-blue-600 border-blue-100 text-xs py-1 px-2.5 rounded-md hover:bg-blue-100 transition-colors"}
                          variant="outline"
                        >
                          {(field.id || 'FIELD').toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 italic">No accreditation fields available</p>
                )}
              </div>
            </div>
            
            {/* Contact information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 border border-blue-200">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                Contact Information
              </h4>
              <div className="space-y-2 ml-8">
                <p className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                  <Mail className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 group-hover:text-blue-600" />
                  <span className="truncate group-hover:underline">{school.email || 'contact@school.edu'}</span>
                </p>
                <p className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                  <Phone className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 group-hover:text-blue-600" />
                  <span className="group-hover:underline">{school.phone || '(555) 123-4567'}</span>
                </p>
                <p className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                  <Globe className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 group-hover:text-blue-600" />
                  <span className="truncate group-hover:underline">{school.website || 'www.schoolwebsite.edu'}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 p-0 mt-auto">
          <div className="w-full">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white font-medium h-12 rounded-none flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              View School Details
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
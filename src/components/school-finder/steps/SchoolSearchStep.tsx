'use client';

import React, { useState, useEffect } from 'react';
import { Search, Building, School as SchoolIcon, Check, ArrowRight, Mail, AlertTriangle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { School, SchoolSearchStepProps } from '../types';
import { schoolsData } from '@/constants/schoolsData';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const SchoolSearchStep: React.FC<SchoolSearchStepProps> = ({
  onSchoolSelect,
  onStartVerification,
  closeDialog
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  
  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setFilteredSchools([]);
      return;
    }
    
    // TODO: Change this when school search is implemented from the backend
    const results = schoolsData.filter(school => 
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredSchools(results);
  }, [searchQuery]);
  
  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setVerificationError('');
  };
  
  const handleContinue = () => {
    if (!selectedSchool) return;
    
    // Set verifying state to show loading
    setIsVerifying(true);
    
    // TODO: Change this when email verification is implemented from the backend
    setTimeout(() => {
      // Simulate API call to send verification code
      try {
        // Check if the school has an email
        if (!selectedSchool.email) {
          setVerificationError("This school doesn't have a registered email address. Please contact support.");
          setIsVerifying(false);
          return;
        }
        
        // Move to the OTP verification step
        onStartVerification(selectedSchool.email, selectedSchool);
        setIsVerifying(false);
      } catch (error) {
        setVerificationError("Failed to send verification code. Please try again later.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Find Your School</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Enter your school name or email to search</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-primary/60" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter school name or email"
          className="pl-9 sm:pl-10 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-xl border-primary/20 focus:border-primary/50 shadow-sm"
        />
      </div>

      <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
        {searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
          <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm sm:text-base text-blue-700">Please enter at least 3 characters to search</p>
          </div>
        )}

        {searchQuery.trim().length === 0 && (
          <Card className="border-0 shadow-none bg-blue-50/50 p-4 sm:p-6">
            <CardContent className="p-0 flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
                <SchoolIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <p className="text-center text-sm sm:text-base text-muted-foreground">
                Search for your school by name or address to begin
              </p>
              <div className="flex items-center text-xs sm:text-sm text-primary/80 mt-3 sm:mt-4 gap-1.5 sm:gap-2 flex-wrap justify-center">
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary text-white font-medium">1</span>
                <span>Search School</span>
                <span className="text-gray-300 mx-1 sm:mx-2">•</span>
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 text-gray-500 font-medium">2</span>
                <span className="text-gray-400">Verify Email</span>
                <span className="text-gray-300 mx-1 sm:mx-2">•</span>
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 text-gray-500 font-medium">3</span>
                <span className="text-gray-400">Enter Code</span>
              </div>
            </CardContent>
          </Card>
        )}

        {searchQuery.trim().length >= 3 && filteredSchools.length === 0 && (
          <Card className="overflow-hidden border-0 shadow-md">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="bg-blue-100 inline-flex p-3 sm:p-4 rounded-full mx-auto">
                  <Building className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg">No schools found</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We couldn't find any schools matching "{searchQuery}"
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3 pt-2">
                  <Link href="/register-school" className="block">
                    <Button 
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-4 sm:px-6 py-2 rounded-lg"
                      size="default"
                    >
                      Register New School
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <a 
                      href="mailto:support@schoolsystem.gov.rw?subject=School%20Not%20Found" 
                      className="text-primary hover:underline text-xs sm:text-sm inline-flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredSchools.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-xs sm:text-sm text-primary font-medium flex items-center">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Found {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} matching your search
            </div>
            
            <div className="space-y-2 sm:space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredSchools.map(school => (
                <Card 
                  key={school.id}
                  className={cn(
                    "cursor-pointer transition-all border hover:shadow-md gap-2 md:p-1",
                    selectedSchool?.id === school.id 
                      ? "border-primary bg-blue-50/50" 
                      : "border-gray-200 hover:border-primary/40"
                  )}
                  onClick={() => handleSchoolSelect(school)}
                >
                  <CardHeader className="px-3 sm:p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">{school.name}</CardTitle>
                      {selectedSchool?.id === school.id && (
                        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">{school.address}</CardDescription>
                    <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-x-4">
                      {school.email && (
                        <p>📧 {school.email}</p>
                      )}
                      {school.phone && (
                        <p>📞 {school.phone}</p>
                      )}
                      {school.website && (
                        <p>🌐 {school.website}</p>
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
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {selectedSchool && (
              <div 
                role="alert" 
                className="relative w-full rounded-lg border px-4 py-3 text-sm bg-blue-50 border-blue-100 mb-2"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium tracking-tight text-sm sm:text-base text-blue-800">
                      Email Verification Required
                    </div>
                    <div className="text-xs sm:text-sm text-blue-700">
                      For security reasons, we'll send a verification code to: {' '}
                      <strong>{selectedSchool.email}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {verificationError && (
              <div 
                role="alert" 
                className="relative w-full rounded-lg border px-4 py-3 text-sm bg-red-50 border-red-200 mb-2"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 text-xs sm:text-sm text-red-700">
                    {verificationError}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 mt-2 border-t">
              <Link href="/register-school" className="order-2 sm:order-1">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 text-gray-700"
                  size="default"
                >
                  Register New School
                </Button>
              </Link>
              
              <Button 
                onClick={handleContinue} 
                disabled={!selectedSchool || isVerifying}
                className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:cursor-pointer hover:bg-primary/90 gap-2 text-white px-4 sm:px-6"
                size="default"
              >
                {isVerifying ? (
                  <>Sending verification code...</>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0077cc;
        }
      `}</style>
    </div>
  );
}; 
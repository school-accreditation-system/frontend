import React from 'react';
import { SchoolRegistrationForm } from '@/components/school-registration/SchoolRegistrationForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';

export default function RegisterSchoolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New School</h1>
          <p className="text-muted-foreground">
            Please provide your school details to register in our system
          </p>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">School Information</CardTitle>
            <CardDescription>
              Fill in the details below to register your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SchoolRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ProcessedSchool } from '@/types/accredited-schools';
import { Award, Building, Mail, Phone, Star } from 'lucide-react';
import { formatDate, generateColorFromString } from './utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SchoolCard = ({ 
  school, 
  className 
}: { 
  school: ProcessedSchool, 
  className?: string
}) => { 
  return (
    <div className="relative">
      {/* Certificate Button */}
      <div className="absolute -top-2 -right-2 z-10">
      </div>

      <Card className={cn(
        "overflow-hidden border border-gray-200 rounded-xl bg-white flex flex-col relative",
        className
      )}>
        {/* Status Banner */}
        <div className="relative px-5 py-3 text-white bg-gradient-to-r from-primary to-secondary">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="px-2.5 py-1 text-xs font-medium rounded-full text-blue-50">
                ACCREDITED
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
                <CardTitle className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                  {school.name || 'Unnamed School'}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-3 pb-2 px-5 flex-grow flex flex-col">
          <div className="space-y-4 flex-grow">
            {/* Accreditation badges */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 border border-blue-200">
                  <Star className="h-3.5 w-3.5" />
                </span>
                Accredited Combinations
              </h4>
              <div className="flex flex-wrap gap-1.5 ml-8">
                {(school.combinations && school.combinations.length > 0) ? (
                  <TooltipProvider>
                    {school.combinations.map((combination, index) => {
                      const colorClasses = generateColorFromString(combination.name);
                      return (
                        <div key={`${combination.name}-${index}`} className="mb-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                className="text-xs py-1 px-2.5 rounded-md hover:opacity-90 transition-colors cursor-pointer"
                                variant="outline"
                                style={{
                                  backgroundColor: colorClasses.bg,
                                  color: colorClasses.text,
                                  borderColor: colorClasses.border
                                }}
                              >
                                {combination.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{`${combination?.fullName && combination?.fullName}-${combination?.name}`} was accreddited on {formatDate(combination?.accreditationDate)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      );
                    })}
                  </TooltipProvider>
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
                {school.email && (
                  <p className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                    <Mail className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 group-hover:text-blue-600" />
                    <span className="truncate group-hover:underline">{school.email}</span>
                  </p>
                )}
                {school.phoneNumber && (
                  <p className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                    <Phone className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 group-hover:text-blue-600" />
                    <span className="group-hover:underline">{school.phoneNumber}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 p-0 mt-auto">
          {/* <div className="w-full">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white font-medium h-12 rounded-none flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              View School Details
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div> */}
        </CardFooter>
      </Card>
    </div>
  );
};
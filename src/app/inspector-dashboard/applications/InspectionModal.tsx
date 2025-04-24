import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InspectionModal = ({ isModalOpen, setIsModalOpen, handleSchoolIdentification, handleSelfAssessment }) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">Start Inspection</DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Choose the type of inspection you want to perform
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={handleSchoolIdentification}
            className="h-24 flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-600 text-blue-800 border border-blue-300"
            variant="outline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
              <path d="M2 22v-4h4"></path>
              <path d="M2.5 12.5l7-7a2.121 2.121 0 0 1 3 0l7 7"></path>
              <path d="M14 6v4h4"></path>
              <path d="M5 10v10"></path>
              <path d="M19 10v10"></path>
              <path d="M5 14h14"></path>
              <path d="M5 18h14"></path>
            </svg>
            <span>School Identification</span>
          </Button>
          
          <Button 
            onClick={handleSelfAssessment}
            className="h-24 flex flex-col items-center justify-center bg-green-100 hover:bg-green-500 text-green-800 border border-green-300"
            variant="outline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span>Self Assessment</span>
          </Button>
        </div>
        
        <DialogFooter className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionModal;
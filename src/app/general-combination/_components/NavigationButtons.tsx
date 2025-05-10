"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const NavigationButtons = ({ onBack, onSubmit, isSubmitting, isDisabled }) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        disabled={isSubmitting}
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        variant={isDisabled ? "outline" : "default"}
        className={
          isDisabled
            ? "bg-gray-300 text-gray-500"
            : "bg-primary hover:bg-primary/90"
        }
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </span>
        ) : (
          "Submit Registration"
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;

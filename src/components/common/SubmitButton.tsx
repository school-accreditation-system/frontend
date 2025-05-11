"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText?: string;
  className?: string;
  showArrow?: boolean;
}

export const SubmitButton = ({
  isSubmitting,
  text,
  loadingText = "Submitting...",
  className = "w-full md:w-auto md:min-w-[200px] hover:cursor-pointer bg-primary hover:hover:bg-primary/90 text-white",
  showArrow = true,
}: SubmitButtonProps) => {
  return (
    <Button type="submit" className={className} disabled={isSubmitting}>
      {isSubmitting ? (
        loadingText
      ) : (
        <>
          {text}
          {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
        </>
      )}
    </Button>
  );
};

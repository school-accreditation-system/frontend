"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const FormActions = ({ onBack, isSubmitting }) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-between pt-6">
      <button
        type="button"
        onClick={handleBack}
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition disabled:opacity-50"
        disabled={isSubmitting}
      >
        Back
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </button>
    </div>
  );
};
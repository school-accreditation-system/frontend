"use client";
import React from 'react';

const loading = () => {
  return (
    <div className="min-h-screen bg-primary p-6 flex flex-col">
      {/* Header Skeleton */}
      <div className="max-w-7xl w-full mx-auto mb-8">
        <div className="h-10 w-64 bg-white/20 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-full max-w-md bg-white/20 rounded-md animate-pulse"></div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 flex-grow">
        {/* Left Panel */}
        <div className="w-full md:w-1/3 bg-white/10 rounded-lg p-4 flex flex-col">
          <div className="h-8 w-32 bg-white/20 rounded-md animate-pulse mb-6"></div>
          
          {/* List Items */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center mb-4">
              <div className="h-6 w-6 rounded-full bg-white/20 animate-pulse mr-3"></div>
              <div className="h-6 w-full bg-white/20 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Right Panel */}
        <div className="w-full md:w-2/3 bg-white/10 rounded-lg p-4 flex flex-col">
          <div className="h-8 w-48 bg-white/20 rounded-md animate-pulse mb-6"></div>
          
          {/* Search Bar */}
          <div className="h-10 w-full bg-white/20 rounded-md animate-pulse mb-6"></div>
          
          {/* Table Skeleton */}
          <div className="flex flex-col flex-grow">
            {/* Table Header */}
            <div className="flex border-b border-white/20 pb-2 mb-3">
              <div className="h-6 w-12 bg-white/20 rounded-md animate-pulse mr-4"></div>
              <div className="h-6 w-32 bg-white/20 rounded-md animate-pulse mr-4 flex-grow"></div>
              <div className="h-6 w-24 bg-white/20 rounded-md animate-pulse mr-4"></div>
              <div className="h-6 w-24 bg-white/20 rounded-md animate-pulse"></div>
            </div>
            
            {/* Table Rows */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex py-3 border-b border-white/10">
                <div className="h-6 w-12 bg-white/20 rounded-md animate-pulse mr-4"></div>
                <div className="h-6 w-32 bg-white/20 rounded-md animate-pulse mr-4 flex-grow"></div>
                <div className="h-6 w-24 bg-white/20 rounded-md animate-pulse mr-4"></div>
                <div className="h-6 w-24 bg-white/20 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Pagination Skeleton */}
          <div className="flex justify-between mt-6">
            <div className="h-8 w-20 bg-white/20 rounded-md animate-pulse"></div>
            <div className="flex">
              <div className="h-8 w-8 bg-white/20 rounded-md animate-pulse mr-2"></div>
              <div className="h-8 w-8 bg-white/20 rounded-md animate-pulse mr-2"></div>
              <div className="h-8 w-8 bg-white/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer loading Indicator */}
      <div className="max-w-7xl w-full mx-auto mt-8 flex justify-center items-center">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-white rounded-full mr-1 animate-bounce"></div>
          <div className="h-4 w-4 bg-white rounded-full mr-1 animate-bounce delay-150"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce delay-300"></div>
          <div className="ml-3 text-white font-medium">loading...</div>
        </div>
      </div>
    </div>
  );
};

export default loading;
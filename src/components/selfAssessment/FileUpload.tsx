'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { AlertCircle, FileCheck, Loader2, Upload, X } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

export interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  name: string;
  value?: File | string | null;
  label?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isUploading?: boolean;
  progress?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
}

export const FileUpload = ({
  onFileChange,
  name,
  value,
  label = 'Upload Document',
  description = 'Drag and drop your file here',
  errorMessage,
  isRequired = false,
  isUploading = false,
  progress = 0,
  maxSizeMB = 5,
  acceptedTypes,
  className = '',
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(value instanceof File ? value : null);
  const [error, setError] = useState<string | null>(errorMessage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    processFile(selectedFile);
  };

  // Process and validate the file
  const processFile = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }

    // Check file type if acceptedTypes is provided
    if (acceptedTypes && acceptedTypes.length > 0) {
      const fileType = selectedFile.type;
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      // Check if the file type or extension is in the accepted types
      const isAccepted = acceptedTypes.some(type => 
        type === fileType || type === fileExtension || type.includes('*')
      );
      
      if (!isAccepted) {
        setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
        return;
      }
    }

    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size: ${maxSizeMB}MB`);
      return;
    }

    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;
    processFile(droppedFile);
  };

  // Handle click on the upload area
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file removal
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileChange(null);
  };

  // Determine accept attribute value for the input
  const acceptAttribute = acceptedTypes && acceptedTypes.length > 0 ? acceptedTypes.join(',') : undefined;
  
  // Get a user-friendly display of accepted file types
  const getAcceptedTypesDisplay = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return 'All files';
    }
    return acceptedTypes.map(type => {
      if (type.startsWith('.')) {
        return type.substring(1).toUpperCase();
      } else if (type.includes('/')) {
        return type.split('/')[1];
      }
      return type;
    }).join(', ');
  };

  return (
    <Card className={`mt-4 ${className} ${error ? 'border-red-300' : ''}`}>
      <CardContent className="p-4">
        <CardTitle className="text-base mb-1">{label}{isRequired && <span className="text-red-500 ml-1">*</span>}</CardTitle>
        <CardDescription className="text-xs mb-3">{description}</CardDescription>
        
        {/* Error message */}
        {error && (
          <Alert variant="destructive" className="mb-4 py-2 border-red-300 bg-red-50 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm ml-2">{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}
            ${file ? 'bg-gray-50' : ''}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptAttribute}
            onChange={handleFileChange}
            name={name}
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary mb-2 animate-spin" />
              <p className="text-sm font-medium">Uploading...</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          ) : file ? (
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-green-50 text-green-600">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">
                {getAcceptedTypesDisplay()} (Max: {maxSizeMB}MB)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
"use client";

import React from "react";

export const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  disabled = false,
  children 
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    {children || (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
      />
    )}
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);
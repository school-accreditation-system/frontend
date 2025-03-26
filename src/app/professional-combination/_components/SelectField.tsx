// components/forms/school/SelectField.jsx
"use client";

import React from "react";
import { FormField } from "./FormField";

export const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  disabled = false,
  options = []
}) => (
  <FormField label={label} name={name} error={error}>
    <select
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
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </FormField>
);

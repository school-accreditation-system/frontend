# School Identification Components

This directory contains components for the school identification process.

## Directory Structure

```
/school-identification
  /componets     -component use in heere
  /context       - Context providers for form state
  /hooks         - Custom hooks
  /steps         - Step-based form components
  /types         - TypeScript types and schemas
```

## Custom Hooks

### useLocationForm

Located in `/hooks/useLocationForm.ts`, this hook manages the location form state, validation, and API interactions for the `LocationDetailsForm` component.

#### Usage

```tsx
const {
  form,                    // React Hook Form instance
  isAtSchool,              // Boolean flag for "at school" checkbox
  isGettingLocation,       // Loading state for geolocation
  locationError,           // Error message from geolocation
  availableDistricts,      // Available districts for selected province
  availableSectors,        // Available sectors for selected district
  availableCells,          // Available cells for selected sector
  availableVillages,       // Available villages for selected cell
  onFieldChange,           // Handler for field changes
  handleIsAtSchoolChange,  // Handler for checkbox changes
  hasFieldError,           // Helper to check if a field has validation errors
  stepErrors,              // Errors from the form context
  getAllProvinces          // Function to get all provinces
} = useLocationForm({
  formData,                // Current form data from context
  updateFormData,          // Function to update form data
  formErrors               // Current form errors from context
});
```

#### Features

- Manages cascading dropdowns for Rwanda administrative divisions
- Handles geolocation for automatically filling GPS coordinates
- Provides error handling and validation
- Synchronizes form state with the global context
- Implements field-level validation with error highlighting 

### useStudentInfoForm

Located in `/hooks/useStudentInfoForm.ts`, this hook manages the student information form state, validation, and calculations for the `StudentInfoForm` component.

#### Usage

```tsx
const {
  form,                    // React Hook Form instance
  totalStudents,           // Function to calculate total number of students
  onFieldChange,           // Handler for field changes
  hasFieldError,           // Helper to check if a field has validation errors
  stepErrors               // Errors from the form context
} = useStudentInfoForm({
  formData,                // Current form data from context
  updateFormData,          // Function to update form data
  formErrors               // Current form errors from context
});
```

#### Features

- Manages form state for student count information
- Calculates total number of students automatically
- Provides error handling and validation
- Synchronizes form state with the global context
- Implements field-level validation with error highlighting 
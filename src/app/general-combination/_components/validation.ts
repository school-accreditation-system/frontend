export const validateField = (name, value, validators) => {
    const validator = validators[name];
    if (!validator) return null;
    
    const error = validator(value);
    return error;
  };
  
  export const validateForm = (formData, validators) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field], validators);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });
    
    return { isValid, errors };
  };
  
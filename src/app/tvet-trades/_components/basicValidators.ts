export const required = value => 
    !value || value.trim() === '' ? 'This field is required' : null;
  
  export const minLength = (min) => value => 
    value && value.length < min ? `Must be at least ${min} characters` : null;
  
  export const isInteger = value => 
    value && !/^\d+$/.test(value) ? 'Must be a whole number' : null;
  
  export const minValue = (min) => value => 
    value && Number(value) < min ? `Must be at least ${min}` : null;
  
  export const maxValue = (max) => value => 
    value && Number(value) > max ? `Must not exceed ${max}` : null;
  
  export const composeValidators = (...validators) => value => 
    validators.reduce((error, validator) => error || validator(value), null);
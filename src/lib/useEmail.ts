"use client"

import { useState, useEffect } from 'react';

/**
 * Custom hook to retrieve and manage the selected school email
 * with both synchronous initial load and asynchronous updates
 * @returns {[string|null, function]} - Email value and setter function
 */
const useEmail = () => {
  // Try to get the initial value synchronously - this will work on re-renders
  let initialValue = null;
  
  // Only run this code on the client side
  if (typeof window !== 'undefined') {
    try {
      initialValue = localStorage.getItem("selectedSchoolEmail");
    } catch (e) {
      console.error("Error accessing localStorage synchronously:", e);
    }
  }
  
  // Initialize state with the value we got synchronously
  const [email, setEmailState] = useState(initialValue);
  
  // This effect ensures the value is correctly loaded after mounting
  useEffect(() => {
    // Skip if we already have a value
    if (email !== null) return;
    
    try {
      const storedEmail = localStorage.getItem("selectedSchoolEmail");
      console.log("Email loaded in useEffect:", storedEmail);
      
      if (storedEmail !== null && storedEmail !== email) {
        setEmailState(storedEmail);
      }
    } catch (err) {
      console.error("Error accessing localStorage in effect:", err);
    }
  }, [email]);
  
  // Update function that updates both state and localStorage
  const setEmail = (newEmail) => {
    try {
      if (newEmail) {
        localStorage.setItem("selectedSchoolEmail", newEmail);
        console.log("Email saved to localStorage:", newEmail);
      } else {
        localStorage.removeItem("selectedSchoolEmail");
        console.log("Email removed from localStorage");
      }
      
      setEmailState(newEmail);
    } catch (err) {
      console.error("Error updating localStorage:", err);
    }
  };
  
  return email;
};

export default useEmail;
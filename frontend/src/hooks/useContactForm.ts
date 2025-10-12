/**
 * useContactForm Hook
 * Reusable hook for handling contact form submissions
 */

import { useState } from "react";
import { contactService } from "@/services/contact.service";
import { ApiError } from "@/services/api.service";
import type { ContactFormData } from "@/types/contact.types";

export interface UseContactFormOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  validatePhone?: boolean;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  error: string | null;
  handleChange: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  resetForm: () => void;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  jobTitle: "",
  jobDetails: "",
};

/**
 * Reusable hook for contact form management
 */
export const useContactForm = (options: UseContactFormOptions = {}): UseContactFormReturn => {
  const { onSuccess, onError, validatePhone = true } = options;

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle field change
   */
  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  /**
   * Validate form data
   */
  const validateForm = (): string | null => {
    // Check required fields
    if (!formData.name.trim()) {
      return "Name is required";
    }

    if (!formData.email.trim()) {
      return "Email is required";
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      return "Company name is required";
    }

    if (!formData.country.trim()) {
      return "Country is required";
    }

    if (!formData.jobTitle.trim()) {
      return "Job title is required";
    }

    if (!formData.jobDetails.trim()) {
      return "Project details are required";
    }

    // Validate phone number if provided and validation is enabled
    if (validatePhone && formData.phone) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        return "Phone number must be exactly 10 digits";
      }
    }

    // Check field lengths
    if (formData.name.length < 3 || formData.name.length > 20) {
      return "Name must be 3-20 characters in length";
    }

    if (formData.company.length < 2 || formData.company.length > 30) {
      return "Company name must be 2-30 characters in length";
    }

    if (formData.country.length < 2 || formData.country.length > 30) {
      return "Country must be 2-30 characters in length";
    }

    if (formData.jobTitle.length < 2 || formData.jobTitle.length > 30) {
      return "Job title must be 2-30 characters in length";
    }

    if (formData.jobDetails.length < 10 || formData.jobDetails.length > 50000) {
      return "Project details must be between 10 and 50,000 characters";
    }

    return null;
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      onError?.(validationError);
      return false;
    }

    setIsSubmitting(true);

    try {
      // Submit form data to backend
      await contactService.createContact(formData);

      // Reset form on success
      resetForm();

      // Call success callback
      onSuccess?.();

      return true;
    } catch (err) {
      console.error("Contact form submission error:", err);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (err instanceof ApiError) {
        errorMessage = err.message;

        // Handle validation errors from backend
        if (err.errors && err.errors.length > 0) {
          const validationMessages = err.errors
            .map((error: any) => error.msg || error.message)
            .join(", ");
          errorMessage = validationMessages || errorMessage;
        }
      }

      setError(errorMessage);
      onError?.(errorMessage);

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  };
};

export default useContactForm;

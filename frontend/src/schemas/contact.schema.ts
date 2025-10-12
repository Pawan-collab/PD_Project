/**
 * Contact Form Validation Schema
 * Using Yup to match backend express-validator rules
 */

import * as yup from 'yup';

/**
 * Contact form validation schema
 * Matches the backend validation rules in contactRoutes.js
 */
export const contactFormSchema = yup.object().shape({
  // Name validation: 3-20 characters, required
  name: yup
    .string()
    .required('Name is mandatory')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must not exceed 20 characters')
    .trim(),

  // Email validation: valid email format, required
  email: yup
    .string()
    .required('Email is mandatory')
    .email('Provide a valid email address')
    .trim(),

  // Phone validation: exactly 10 digits, required
  phone: yup
    .string()
    .required('Phone number is mandatory')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .length(10, 'Phone number must be exactly ten (10) digits'),

  // Company name validation: 2-30 characters, required
  company: yup
    .string()
    .required('Company name is mandatory')
    .min(2, 'Company name must be at least 2 characters')
    .max(30, 'Company name must not exceed 30 characters')
    .trim(),

  // Country validation: 2-30 characters, required
  country: yup
    .string()
    .required('Country is mandatory')
    .min(2, 'Country must be at least 2 characters')
    .max(30, 'Country must not exceed 30 characters')
    .trim(),

  // Job title validation: 2-30 characters, required
  jobTitle: yup
    .string()
    .required('Job title is mandatory')
    .min(2, 'Job title must be at least 2 characters')
    .max(30, 'Job title must not exceed 30 characters')
    .trim(),

  // Message/Job details validation: 10-50000 characters, required
  jobDetails: yup
    .string()
    .required('Message is mandatory')
    .min(10, 'Message must be at least 10 characters')
    .max(50000, 'Message must not exceed 50,000 characters')
    .trim(),
});

/**
 * Type inference from the schema
 */
export type ContactFormValues = yup.InferType<typeof contactFormSchema>;

/**
 * Default values for the form
 */
export const contactFormDefaultValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  country: '',
  jobTitle: '',
  jobDetails: '',
};

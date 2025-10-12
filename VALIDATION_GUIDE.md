# Contact Form Validation Guide

## Overview

The contact form now uses **React Hook Form** with **Yup validation** that exactly matches the backend validation rules. This provides:

- ✅ Real-time validation feedback
- ✅ Frontend validation matching backend rules
- ✅ Type-safe form handling
- ✅ Better UX with field-level error messages
- ✅ Automatic form state management

## Validation Rules

All validation rules match the backend express-validator configuration:

### Field Validation Rules

| Field | Required | Min Length | Max Length | Additional Rules |
|-------|----------|------------|------------|------------------|
| **Name** | Yes | 3 | 20 | Text only, trimmed |
| **Email** | Yes | - | - | Valid email format |
| **Phone** | Yes | 10 | 10 | Exactly 10 digits |
| **Company** | Yes | 2 | 30 | Text, trimmed |
| **Country** | Yes | 2 | 30 | Text, trimmed |
| **Job Title** | Yes | 2 | 30 | Text, trimmed |
| **Message** | Yes | 10 | 50,000 | Text, trimmed |

### Validation Messages

| Error | Message |
|-------|---------|
| Name too short | "Name must be at least 3 characters" |
| Name too long | "Name must not exceed 20 characters" |
| Name missing | "Name is mandatory" |
| Email invalid | "Provide a valid email address" |
| Email missing | "Email is mandatory" |
| Phone wrong length | "Phone number must be exactly 10 digits" |
| Phone missing | "Phone number is mandatory" |
| Company too short | "Company name must be at least 2 characters" |
| Company too long | "Company name must not exceed 30 characters" |
| Company missing | "Company name is mandatory" |
| Country missing | "Country is mandatory" |
| Job title missing | "Job title is mandatory" |
| Message too short | "Message must be at least 10 characters" |
| Message too long | "Message must not exceed 50,000 characters" |
| Message missing | "Message is mandatory" |

## Implementation

### 1. Yup Validation Schema

Location: [frontend/src/schemas/contact.schema.ts](frontend/src/schemas/contact.schema.ts)

```typescript
import * as yup from 'yup';

export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is mandatory')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must not exceed 20 characters')
    .trim(),

  email: yup
    .string()
    .required('Email is mandatory')
    .email('Provide a valid email address')
    .trim(),

  phone: yup
    .string()
    .required('Phone number is mandatory')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .length(10, 'Phone number must be exactly ten (10) digits'),

  company: yup
    .string()
    .required('Company name is mandatory')
    .min(2, 'Company name must be at least 2 characters')
    .max(30, 'Company name must not exceed 30 characters')
    .trim(),

  country: yup
    .string()
    .required('Country is mandatory')
    .min(2, 'Country must be at least 2 characters')
    .max(30, 'Country must not exceed 30 characters')
    .trim(),

  jobTitle: yup
    .string()
    .required('Job title is mandatory')
    .min(2, 'Job title must be at least 2 characters')
    .max(30, 'Job title must not exceed 30 characters')
    .trim(),

  jobDetails: yup
    .string()
    .required('Message is mandatory')
    .min(10, 'Message must be at least 10 characters')
    .max(50000, 'Message must not exceed 50,000 characters')
    .trim(),
});
```

### 2. Contact Page Implementation

Location: [frontend/src/pages/Contact.tsx](frontend/src/pages/Contact.tsx)

```typescript
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactFormSchema, type ContactFormValues } from "@/schemas/contact.schema";

const Contact = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await contactService.createContact(data);
      toast({ title: "Success!" });
      reset();
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};
```

### 3. Form Fields with Validation

#### Text Input Example
```typescript
<div className="space-y-2">
  <Label htmlFor="name">Full Name *</Label>
  <Input
    id="name"
    {...register("name")}
    placeholder="Enter your full name"
    disabled={isSubmitting}
    className={errors.name ? "border-red-500" : ""}
  />
  {errors.name && (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle className="w-4 h-4" />
      {errors.name.message}
    </p>
  )}
</div>
```

#### Select Input Example
```typescript
<Controller
  name="country"
  control={control}
  render={({ field }) => (
    <Select
      value={field.value}
      onValueChange={field.onChange}
      disabled={isSubmitting}
    >
      <SelectTrigger className={errors.country ? "border-red-500" : ""}>
        <SelectValue placeholder="Select your country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
/>
{errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
```

## Reusable Hook

### useContactFormRHF Hook

Location: [frontend/src/hooks/useContactFormRHF.ts](frontend/src/hooks/useContactFormRHF.ts)

```typescript
import { useContactFormRHF } from '@/hooks/useContactFormRHF';

const MyComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    onSubmit
  } = useContactFormRHF({
    onSuccess: (data) => {
      toast({ title: "Success!" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error, variant: "destructive" });
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
};
```

## Validation Behavior

### When Validation Occurs

1. **On Blur** (default): Field validates when user leaves the field
2. **On Submit**: All fields validate when form is submitted
3. **After First Submit**: Fields re-validate on change

### Error Display

- Red border on invalid fields
- Error message with icon below field
- Prevents form submission if invalid
- Backend validation as fallback

## Testing Validation

### Test Case 1: Empty Fields
1. Open contact form
2. Click submit without filling any fields
3. **Expected**: All fields show "is mandatory" errors

### Test Case 2: Name Too Short
1. Enter "Jo" (2 characters)
2. Tab to next field
3. **Expected**: "Name must be at least 3 characters"

### Test Case 3: Name Too Long
1. Enter more than 20 characters
2. Tab to next field
3. **Expected**: "Name must not exceed 20 characters"

### Test Case 4: Invalid Email
1. Enter "notanemail"
2. Tab to next field
3. **Expected**: "Provide a valid email address"

### Test Case 5: Invalid Phone
1. Enter "123" (less than 10 digits)
2. Tab to next field
3. **Expected**: "Phone number must be exactly 10 digits"

### Test Case 6: Message Too Short
1. Enter "Hi" (2 characters)
2. Tab to next field
3. **Expected**: "Message must be at least 10 characters"

### Test Case 7: Valid Form
1. Fill all fields with valid data:
   - Name: "John Doe" (8 chars)
   - Email: "john@example.com"
   - Phone: "1234567890" (10 digits)
   - Company: "Acme Corp" (9 chars)
   - Country: Select from dropdown
   - Job Title: "CEO" (3 chars)
   - Message: "I need help with AI integration for my business" (48 chars)
2. Click submit
3. **Expected**: Form submits successfully, shows success toast

## Backend vs Frontend Validation

### Double Validation Approach

1. **Frontend (Yup)**:
   - Instant feedback
   - Better UX
   - Prevents unnecessary API calls
   - Same rules as backend

2. **Backend (Express-Validator)**:
   - Security layer
   - Handles edge cases
   - Prevents malicious submissions
   - Final validation authority

### Example Flow

```
User fills form
   ↓
Frontend validation (Yup) ✓
   ↓
Submit to API
   ↓
Backend validation (Express) ✓
   ↓
Save to database
   ↓
Success response
```

If frontend validation fails:
```
User fills form
   ↓
Frontend validation (Yup) ✗
   ↓
Show error message
(No API call made)
```

If backend validation fails:
```
User fills form
   ↓
Frontend validation (Yup) ✓
   ↓
Submit to API
   ↓
Backend validation (Express) ✗
   ↓
Return 422 error with details
   ↓
Display backend error messages
```

## Error Handling

### Frontend Validation Errors
```typescript
{errors.name && (
  <p className="text-sm text-red-500">
    {errors.name.message}
  </p>
)}
```

### Backend Validation Errors
```typescript
catch (error) {
  if (error instanceof ApiError) {
    if (error.errors && error.errors.length > 0) {
      const messages = error.errors
        .map((err: any) => err.msg || err.message)
        .join(", ");
      toast({
        title: "Validation Error",
        description: messages,
        variant: "destructive"
      });
    }
  }
}
```

## Benefits

### User Experience
- ✅ Instant feedback on errors
- ✅ Clear, helpful error messages
- ✅ Visual indicators (red borders, icons)
- ✅ Prevents invalid submissions
- ✅ Form remembers values during validation

### Developer Experience
- ✅ Type-safe form handling
- ✅ Reusable validation schema
- ✅ Consistent validation rules
- ✅ Easy to maintain and update
- ✅ Well-documented with examples

### Code Quality
- ✅ Single source of truth for validation
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Testable validation logic
- ✅ Separation of concerns
- ✅ TypeScript support

## Files Created/Modified

### New Files
1. `frontend/src/schemas/contact.schema.ts` - Yup validation schema
2. `frontend/src/hooks/useContactFormRHF.ts` - React Hook Form hook
3. `VALIDATION_GUIDE.md` - This documentation

### Modified Files
1. `frontend/src/pages/Contact.tsx` - Updated to use React Hook Form
2. `frontend/package.json` - Added yup dependency

### Preserved Files
1. `frontend/src/hooks/useContactForm.ts` - Original hook (backward compatibility)
2. `frontend/src/services/contact.service.ts` - No changes needed
3. `backend/routes/contactRoutes.js` - Backend validation unchanged

## Migration from Old Hook

If you're using the old `useContactForm` hook:

### Old Way (Manual State Management)
```typescript
const {
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  error
} = useContactForm();

<input
  value={formData.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

### New Way (React Hook Form)
```typescript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  onSubmit
} = useContactFormRHF();

<input {...register("name")} />
{errors.name && <span>{errors.name.message}</span>}
```

## Summary

- ✅ **Installed**: Yup validation library
- ✅ **Created**: Validation schema matching backend
- ✅ **Updated**: Contact page with React Hook Form
- ✅ **Added**: Reusable RHF hook
- ✅ **Tested**: Build successful, no errors
- ✅ **Documented**: Complete validation guide

The contact form now has robust, user-friendly validation that matches the backend rules exactly! 🎉

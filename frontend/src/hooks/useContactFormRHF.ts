/**
 * useContactFormRHF Hook (React Hook Form version)
 * Reusable hook for handling contact form submissions with React Hook Form and Yup validation
 */

import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactService } from "@/services/contact.service";
import { ApiError } from "@/services/api.service";
import { contactFormSchema, contactFormDefaultValues, type ContactFormValues } from "@/schemas/contact.schema";

export interface UseContactFormRHFOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  defaultValues?: Partial<ContactFormValues>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
}

export interface UseContactFormRHFReturn extends UseFormReturn<ContactFormValues> {
  onSubmit: (data: ContactFormValues) => Promise<void>;
}

/**
 * Reusable hook for contact form management with React Hook Form and Yup validation
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, control, formState: { errors, isSubmitting }, onSubmit } = useContactFormRHF({
 *   onSuccess: (data) => toast({ title: "Success!" }),
 *   onError: (error) => toast({ title: "Error", description: error }),
 * });
 *
 * return (
 *   <form onSubmit={handleSubmit(onSubmit)}>
 *     <input {...register("name")} />
 *     {errors.name && <span>{errors.name.message}</span>}
 *     <button type="submit" disabled={isSubmitting}>Submit</button>
 *   </form>
 * );
 * ```
 */
export const useContactFormRHF = (
  options: UseContactFormRHFOptions = {}
): UseContactFormRHFReturn => {
  const {
    onSuccess,
    onError,
    defaultValues,
    mode = "onBlur"
  } = options;

  // Initialize React Hook Form with Yup validation
  const formMethods = useForm<ContactFormValues>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: defaultValues || contactFormDefaultValues,
    mode,
  });

  /**
   * Handle form submission
   */
  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    try {
      // Submit form data to backend
      const result = await contactService.createContact(data);

      // Reset form on success
      formMethods.reset();

      // Call success callback
      onSuccess?.(result);
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

      // Call error callback
      onError?.(errorMessage);
    }
  };

  return {
    ...formMethods,
    onSubmit,
  };
};

export default useContactFormRHF;

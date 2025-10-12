/**
 * Contact Form Example Component
 * Demonstrates how to use the reusable contact form hook
 *
 * This component can be reused anywhere in the application where
 * you need a contact form (e.g., modals, sidebars, dedicated pages)
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { useToast } from "@/hooks/use-toast";

interface ContactFormExampleProps {
  onSuccess?: () => void;
  className?: string;
}

/**
 * Reusable Contact Form Component
 * Uses the useContactForm hook for all logic and API integration
 */
export const ContactFormExample = ({ onSuccess, className = "" }: ContactFormExampleProps) => {
  const { toast } = useToast();

  // Use the reusable contact form hook
  const {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  } = useContactForm({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your request has been submitted successfully.",
      });
      onSuccess?.();
    },
    onError: (errorMessage) => {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const countries = [
    "United Kingdom", "United States", "Canada", "Australia", "Germany",
    "France", "Netherlands", "Sweden", "Norway", "Denmark", "Other"
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Show error alert if there's an error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your full name"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Enter your company name"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleChange("country", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Enter your job title"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobDetails">Project Details *</Label>
        <Textarea
          id="jobDetails"
          value={formData.jobDetails}
          onChange={(e) => handleChange("jobDetails", e.target.value)}
          placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
          rows={6}
          disabled={isSubmitting}
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Request
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactFormExample;

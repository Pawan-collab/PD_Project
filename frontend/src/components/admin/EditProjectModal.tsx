/**
 * Edit Project Modal Component
 * Form for editing existing projects with validation
 */

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { projectService, Project } from "@/services/project.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

// Project icons matching backend enum
const ICONS = ["Brain", "Zap", "MessageSquare", "Lightbulb", "Cog", "Shield", "Globe", "Users"];

// Duration options matching backend
const DURATIONS = [
  "1 Month",
  "2 Month",
  "3 Month",
  "4 Month",
  "5 Month",
  "6 Month",
  "7 Month",
  "8 Month",
  "9 Month",
  "10 Month",
  "11 Month",
  "1 Year",
  "1 and Half Year",
  "2 Years",
];

// Team size options matching backend
const TEAM_SIZES = Array.from({ length: 20 }, (_, i) => `${i + 1} specialists`);

// Badge options
const BADGES = ["none", "Popular", "Featured", "New", "Enterprise"];

// Color options
const COLORS = ["primary", "secondary", "accent"];

// Process options
const PROCESSES = ["Completed", "Ongoing"];

// Validation schema matching project.model.js
const projectSchema = yup.object().shape({
  icon: yup
    .string()
    .required("Icon is required")
    .oneOf(ICONS, "Invalid icon"),
  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(300, "Company name must be at most 300 characters")
    .trim(),
  title: yup
    .string()
    .required("Title is required")
    .trim(),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters"),
  duration: yup
    .string()
    .required("Duration is required")
    .oneOf(DURATIONS, "Invalid duration"),
  team_size: yup
    .string()
    .required("Team size is required")
    .oneOf(TEAM_SIZES, "Invalid team size"),
  key_results: yup
    .array()
    .of(yup.string().trim())
    .default([]),
  technologies_used: yup
    .array()
    .of(yup.string().trim())
    .default([]),
  badge: yup
    .string()
    .oneOf(BADGES, "Invalid badge")
    .default(""),
  color: yup
    .string()
    .oneOf(COLORS, "Invalid color")
    .default("primary"),
  process: yup
    .string()
    .oneOf(PROCESSES, "Invalid process")
    .default("Completed"),
  date: yup
    .array()
    .of(yup.string())
    .default([]),
  isActive: yup.boolean().default(true),
});

type ProjectFormData = yup.InferType<typeof projectSchema>;

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSuccess?: () => void;
}

export default function EditProjectModal({
  open,
  onOpenChange,
  project,
  onSuccess,
}: EditProjectModalProps) {
  const { toast } = useToast();
  const [keyResultInput, setKeyResultInput] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      icon: "",
      company_name: "",
      title: "",
      description: "",
      duration: "",
      team_size: "",
      key_results: [],
      technologies_used: [],
      badge: "none",
      color: "primary",
      process: "Completed",
      date: [],
      isActive: true,
    },
  });

  const keyResults = watch("key_results") || [];
  const technologiesUsed = watch("technologies_used") || [];
  const isActive = watch("isActive");

  // Load project data when modal opens
  useEffect(() => {
    if (project && open) {
      reset({
        icon: project.icon,
        company_name: project.company_name,
        title: project.title,
        description: project.description,
        duration: project.duration,
        team_size: project.team_size,
        key_results: project.key_results || [],
        technologies_used: project.technologies_used || [],
        badge: project.badge || "none",
        color: project.color,
        process: project.process,
        date: project.date || [],
        isActive: project.isActive,
      });
    }
  }, [project, open, reset]);

  const handleAddKeyResult = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyResultInput.trim()) {
      e.preventDefault();
      const newResult = keyResultInput.trim();
      if (!keyResults.includes(newResult)) {
        setValue("key_results", [...keyResults, newResult]);
        setKeyResultInput("");
      }
    }
  };

  const handleRemoveKeyResult = (resultToRemove: string) => {
    setValue(
      "key_results",
      keyResults.filter((result) => result !== resultToRemove)
    );
  };

  const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && technologyInput.trim()) {
      e.preventDefault();
      const newTech = technologyInput.trim();
      if (!technologiesUsed.includes(newTech)) {
        setValue("technologies_used", [...technologiesUsed, newTech]);
        setTechnologyInput("");
      }
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setValue(
      "technologies_used",
      technologiesUsed.filter((tech) => tech !== techToRemove)
    );
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (!project) return;

    try {
      setIsSubmitting(true);

      // Convert "none" badge back to empty string for backend
      const submitData = {
        ...data,
        badge: data.badge === "none" ? "" : data.badge,
      };

      await projectService.updateProject(project._id, submitData as any);

      toast({
        title: "Project Updated Successfully!",
        description: `Project "${data.title}" has been updated.`,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error updating project:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error instanceof ApiError) {
        errorMessage = error.message;

        // Handle validation errors from backend
        if (error.errors && error.errors.length > 0) {
          const validationMessages = error.errors
            .map((err) => (err as { msg?: string; message?: string }).msg || (err as { msg?: string; message?: string }).message)
            .join(", ");
          errorMessage = validationMessages || errorMessage;
        }
      }

      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the project details. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon */}
            <div className="space-y-2">
              <Label htmlFor="icon">
                Icon <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="icon"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.icon ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICONS.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">
                Color <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company_name">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company_name"
              placeholder="Enter company name"
              {...register("company_name")}
              className={errors.company_name ? "border-red-500" : ""}
            />
            {errors.company_name && (
              <p className="text-sm text-red-500">{errors.company_name.message}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter project title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Project description (10-2000 characters)"
              rows={4}
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">
                Duration <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.duration ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATIONS.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <Label htmlFor="team_size">
                Team Size <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="team_size"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.team_size ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.team_size && (
                <p className="text-sm text-red-500">{errors.team_size.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Process */}
            <div className="space-y-2">
              <Label htmlFor="process">
                Process Status <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="process"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select process" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROCESSES.map((process) => (
                        <SelectItem key={process} value={process}>
                          {process}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Badge */}
            <div className="space-y-2">
              <Label htmlFor="badge">Badge (Optional)</Label>
              <Controller
                name="badge"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {BADGES.map((badge) => (
                        <SelectItem key={badge} value={badge}>
                          {badge === "none" ? "None" : badge}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Key Results */}
          <div className="space-y-2">
            <Label htmlFor="key_results">Key Results</Label>
            <Input
              id="key_results"
              placeholder="Type a key result and press Enter"
              value={keyResultInput}
              onChange={(e) => setKeyResultInput(e.target.value)}
              onKeyDown={handleAddKeyResult}
            />
            {keyResults.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keyResults.map((result, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {result}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveKeyResult(result)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Press Enter to add a key result
            </p>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2">
            <Label htmlFor="technologies_used">Technologies Used</Label>
            <Input
              id="technologies_used"
              placeholder="Type a technology and press Enter"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
              onKeyDown={handleAddTechnology}
            />
            {technologiesUsed.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologiesUsed.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Press Enter to add a technology
            </p>
          </div>

          {/* Is Active */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isActive">Active Project</Label>
              <p className="text-sm text-muted-foreground">
                Make this project visible to users
              </p>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

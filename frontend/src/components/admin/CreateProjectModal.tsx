/**
 * Create Project Modal Component
 * Form for creating new projects with validation
 */

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
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
import { projectService, ProjectFormData } from "@/services/project.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

// Constants matching backend model exactly
const ICONS = ["Brain", "Zap", "MessageSquare", "Lightbulb", "Cog", "Shield", "Globe", "Users"];

const DURATIONS = [
  "1 Month", "2 Month", "3 Month", "4 Month", "5 Month", "6 Month",
  "7 Month", "8 Month", "9 Month", "10 Month", "11 Month",
  "1 Year", "1 and Half Year", "2 Years"
];

const TEAM_SIZES = [
  "1 specialists", "2 specialists", "3 specialists", "4 specialists",
  "5 specialists", "6 specialists", "7 specialists", "8 specialists",
  "9 specialists", "10 specialists", "11 specialists", "12 specialists",
  "13 specialists", "14 specialists", "15 specialists", "16 specialists",
  "17 specialists", "18 specialists", "19 specialists", "20 specialists"
];

const BADGES = ["none", "Popular", "Featured", "New", "Enterprise"];
const COLORS = ["primary", "secondary", "accent"];
const PROCESSES = ["Completed", "Ongoing"];

// Validation schema matching backend requirements
const schema = yup.object({
  icon: yup.string().required("Icon is required").oneOf(ICONS),
  company_name: yup.string().required("Company name is required").min(2).max(300).trim(),
  title: yup.string().required("Title is required").trim(),
  description: yup.string().required("Description is required").min(10).max(2000),
  duration: yup.string().required("Duration is required").oneOf(DURATIONS),
  team_size: yup.string().required("Team size is required").oneOf(TEAM_SIZES),
  key_results: yup.array().of(yup.string()).default([]),
  technologies_used: yup.array().of(yup.string()).default([]),
  badge: yup.string().oneOf(BADGES).default("none"),
  color: yup.string().oneOf(COLORS).default("primary"),
  process: yup.string().oneOf(PROCESSES).default("Completed"),
  date: yup.array().of(yup.string()).default([]),
  isActive: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateProjectModal({ open, onOpenChange, onSuccess }: Props) {
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
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

  const handleAddKeyResult = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyResultInput.trim()) {
      e.preventDefault();
      if (!keyResults.includes(keyResultInput.trim())) {
        setValue("key_results", [...keyResults, keyResultInput.trim()]);
        setKeyResultInput("");
      }
    }
  };

  const handleRemoveKeyResult = (item: string) => {
    setValue("key_results", keyResults.filter((r) => r !== item));
  };

  const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && technologyInput.trim()) {
      e.preventDefault();
      if (!technologiesUsed.includes(technologyInput.trim())) {
        setValue("technologies_used", [...technologiesUsed, technologyInput.trim()]);
        setTechnologyInput("");
      }
    }
  };

  const handleRemoveTechnology = (item: string) => {
    setValue("technologies_used", technologiesUsed.filter((t) => t !== item));
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Convert "none" badge back to empty string for backend
      const submitData = {
        icon: data.icon,
        company_name: data.company_name,
        title: data.title,
        description: data.description,
        duration: data.duration,
        team_size: data.team_size,
        key_results: data.key_results || [],
        technologies_used: data.technologies_used || [],
        badge: data.badge === "none" ? "" : data.badge,
        color: data.color,
        process: data.process,
        date: data.date || [],
        isActive: data.isActive,
      } as ProjectFormData;

      await projectService.createProject(submitData);

      toast({
        title: "Project Created!",
        description: `"${data.title}" has been created successfully.`,
      });

      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Create project error:", error);

      let errorMessage = "Failed to create project. Please try again.";
      if (error instanceof ApiError) {
        errorMessage = error.message;
        if (error.errors && error.errors.length > 0) {
          const messages = error.errors.map((e) => {
            const err = e as { msg?: string; message?: string };
            return err.msg || err.message;
          }).join(", ");
          errorMessage = messages || errorMessage;
        }
      }

      toast({
        title: "Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isSubmitting && onOpenChange(val)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Fill in the project details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Icon & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon <span className="text-red-500">*</span></Label>
              <Controller
                name="icon"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.icon ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICONS.map((icon) => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.icon && <p className="text-sm text-red-500">{errors.icon.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color <span className="text-red-500">*</span></Label>
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
            <Label htmlFor="company_name">Company Name <span className="text-red-500">*</span></Label>
            <Input
              {...register("company_name")}
              placeholder="Enter company name"
              className={errors.company_name ? "border-red-500" : ""}
            />
            {errors.company_name && <p className="text-sm text-red-500">{errors.company_name.message}</p>}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
            <Input
              {...register("title")}
              placeholder="Enter project title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              {...register("description")}
              placeholder="Project description (10-2000 characters)"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          {/* Duration & Team Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration <span className="text-red-500">*</span></Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATIONS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="team_size">Team Size <span className="text-red-500">*</span></Label>
              <Controller
                name="team_size"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.team_size ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.team_size && <p className="text-sm text-red-500">{errors.team_size.message}</p>}
            </div>
          </div>

          {/* Process & Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="process">Status <span className="text-red-500">*</span></Label>
              <Controller
                name="process"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROCESSES.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

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
                      {BADGES.map((b) => (
                        <SelectItem key={b} value={b}>{b === "none" ? "None" : b}</SelectItem>
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
              placeholder="Type and press Enter to add"
              value={keyResultInput}
              onChange={(e) => setKeyResultInput(e.target.value)}
              onKeyDown={handleAddKeyResult}
            />
            {keyResults.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keyResults.map((result, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {result}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveKeyResult(result)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies_used">Technologies Used</Label>
            <Input
              placeholder="Type and press Enter to add"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
              onKeyDown={handleAddTechnology}
            />
            {technologiesUsed.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologiesUsed.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Is Active */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isActive">Active Project</Label>
              <p className="text-sm text-muted-foreground">Make this project visible to users</p>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

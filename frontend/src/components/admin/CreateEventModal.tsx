/**
 * Create Event Modal Component
 * Form for creating new events with validation
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
import { eventService, EventFormData } from "@/services/event.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

// Constants matching backend model
const EVENT_KINDS = ["upcoming", "past"] as const;
const EVENT_STATUSES = ["confirmed", "hosting", "tentative"] as const;

// Validation schema matching backend requirements
const schema = yup.object({
  kind: yup.string().required("Event kind is required").oneOf([...EVENT_KINDS]),
  title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters").max(150, "Title must not exceed 150 characters").trim(),
  type: yup.string().required("Event type is required").trim(),
  date: yup.string().required("Date is required").trim(),
  time: yup.string().trim().default(""),
  location: yup.string().required("Location is required").trim(),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters").max(2000, "Description must not exceed 2000 characters"),
  audience: yup.string().trim().default(""),
  status: yup.string().oneOf([...EVENT_STATUSES]).default("confirmed"),
  topics: yup.array().of(yup.string()).default([]),
  outcome: yup.string().trim().default(""),
  published: yup.boolean().default(true),
  featured: yup.boolean().default(false),
  isActive: yup.boolean().default(true),
  order: yup.number().default(0),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateEventModal({ open, onOpenChange, onSuccess }: Props) {
  const { toast } = useToast();
  const [topicInput, setTopicInput] = useState("");
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
      kind: "upcoming",
      title: "",
      type: "",
      date: "",
      time: "",
      location: "",
      description: "",
      audience: "",
      status: "confirmed",
      topics: [],
      outcome: "",
      published: true,
      featured: false,
      isActive: true,
      order: 0,
    },
  });

  const topics = watch("topics") || [];

  const handleAddTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && topicInput.trim()) {
      e.preventDefault();
      if (!topics.includes(topicInput.trim())) {
        setValue("topics", [...topics, topicInput.trim()]);
        setTopicInput("");
      }
    }
  };

  const handleRemoveTopic = (item: string) => {
    setValue("topics", topics.filter((t) => t !== item));
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const submitData: EventFormData = {
        kind: data.kind,
        title: data.title,
        type: data.type,
        date: data.date,
        time: data.time || "",
        location: data.location,
        description: data.description,
        audience: data.audience || "",
        status: data.status,
        topics: data.topics || [],
        outcome: data.outcome || "",
        published: data.published,
        featured: data.featured,
        isActive: data.isActive,
        order: data.order || 0,
      };

      await eventService.createEvent(submitData);

      toast({
        title: "Event Created!",
        description: `"${data.title}" has been created successfully.`,
      });

      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Create event error:", error);

      let errorMessage = "Failed to create event. Please try again.";
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
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the event details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Kind & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kind">Event Kind <span className="text-red-500">*</span></Label>
              <Controller
                name="kind"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.kind ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select event kind" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.kind && <p className="text-sm text-red-500">{errors.kind.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="hosting">Hosting</SelectItem>
                      <SelectItem value="tentative">Tentative</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
            <Input
              {...register("title")}
              placeholder="Enter event title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Event Type <span className="text-red-500">*</span></Label>
            <Input
              {...register("type")}
              placeholder="e.g., Workshop, Conference, Webinar"
              className={errors.type ? "border-red-500" : ""}
            />
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
              <Input
                {...register("date")}
                type="date"
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time (Optional)</Label>
              <Input
                {...register("time")}
                type="time"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Input
              {...register("location")}
              placeholder="Enter event location"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              {...register("description")}
              placeholder="Event description (10-2000 characters)"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          {/* Audience */}
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (Optional)</Label>
            <Input
              {...register("audience")}
              placeholder="e.g., Developers, Students, Professionals"
            />
          </div>

          {/* Topics */}
          <div className="space-y-2">
            <Label htmlFor="topics">Topics (Optional)</Label>
            <Input
              placeholder="Type and press Enter to add"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleAddTopic}
            />
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((topic, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {topic}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTopic(topic)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <Label htmlFor="outcome">Expected Outcome (Optional)</Label>
            <Textarea
              {...register("outcome")}
              placeholder="What do you expect attendees to gain from this event?"
              rows={3}
            />
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order (Optional)</Label>
            <Input
              {...register("order")}
              type="number"
              placeholder="0"
            />
          </div>

          {/* Switches */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">Make this event visible to the public</p>
              </div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured</Label>
                <p className="text-sm text-muted-foreground">Feature this event prominently</p>
              </div>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Active Event</Label>
                <p className="text-sm text-muted-foreground">Make this event active</p>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
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
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

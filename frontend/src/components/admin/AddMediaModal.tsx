/**
 * Add Media Modal Component
 * Form for uploading new gallery items with validation
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
import { Loader2, X, Image as ImageIcon, Upload } from "lucide-react";
import { galleryService, GalleryCategory } from "@/services/gallery.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

// Validation schema matching gallery model
const gallerySchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be at most 120 characters")
    .trim(),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(Object.values(GalleryCategory), "Invalid category"),
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters")
    .max(2000, "Content must be at most 2000 characters")
    .trim(),
  date: yup
    .date()
    .required("Date is required")
    .typeError("Please enter a valid date"),
  location: yup
    .string()
    .max(120, "Location must be at most 120 characters")
    .trim(),
  published: yup.boolean().default(true),
  featured: yup.boolean().default(false),
  imageUrl: yup
    .string()
    .required("Image URL is required")
    .url("Please enter a valid URL")
    .trim(),
});

type GalleryFormData = yup.InferType<typeof gallerySchema>;

interface AddMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AddMediaModal({
  open,
  onOpenChange,
  onSuccess,
}: AddMediaModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: "",
      category: GalleryCategory.CONFERENCE,
      content: "",
      date: new Date(),
      location: "",
      published: true,
      featured: false,
      media_type: "image",
      imageUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");
  const mediaType = watch("media_type");
  const published = watch("published");
  const featured = watch("featured");

  // Handle image URL input
  const handleImageUrlChange = (url: string) => {
    setValue("imageUrl", url, { shouldValidate: true });
    if (url) {
      setImagePreview(url); // Use URL as preview
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: GalleryFormData) => {
    try {
      setIsSubmitting(true);
      await galleryService.createGallery(data);

      toast({
        title: "Media Uploaded Successfully!",
        description: `"${data.title}" has been added to the gallery.`,
      });

      reset();
      setImagePreview(null);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error uploading media:", error);

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
        title: "Upload Failed",
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
      setImagePreview(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Media to Gallery</DialogTitle>
          <DialogDescription>
            Add a new image to your gallery. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Media Type Selection */}
          <div className="space-y-2">
            <Label>Media Type <span className="text-red-500">*</span></Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="image"
                  checked={mediaType === "image"}
                  onChange={(e) => setValue("media_type", e.target.value as any)}
                  className="w-4 h-4"
                />
                <span>Image</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="video"
                  checked={mediaType === "video"}
                  onChange={(e) => setValue("media_type", e.target.value as any)}
                  className="w-4 h-4"
                />
                <span>Video (YouTube)</span>
              </label>
            </div>
          </div>

          {/* Media URL Input */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              {mediaType === "video" ? "YouTube Video URL" : "Image URL"} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder={
                mediaType === "video"
                  ? "https://www.youtube.com/watch?v=..."
                  : "https://example.com/image.jpg"
              }
              value={imageUrl || ""}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              className={errors.imageUrl ? "border-red-500" : ""}
              autoComplete="off"
            />
            <p className="text-sm text-muted-foreground">
              {mediaType === "video"
                ? "Enter a YouTube video URL"
                : "Enter a direct link to an image (supports JPG, PNG, GIF, WebP)"}
            </p>
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}

            {/* Media Preview */}
            {imageUrl && (
              <div className="relative border-2 border-border rounded-lg overflow-hidden mt-4">
                {mediaType === "video" ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${imageUrl.includes("youtube.com") || imageUrl.includes("youtu.be") ? imageUrl.split("v=")[1]?.split("&")[0] || imageUrl.split("/").pop() : ""}`}
                      title="YouTube video preview"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = "";
                        target.style.display = "none";
                      }}
                    />
                    {imageUrl && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
                        {imageUrl}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter title (3-120 characters)"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GalleryCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Enter description (10-2000 characters)"
              rows={4}
              {...register("content")}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Date and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">
                Date <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    id="date"
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className={errors.date ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="Enter location"
                {...register("location")}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Published and Featured */}
          <div className="space-y-4">
            {/* Published Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="published" className="text-base font-semibold cursor-pointer">
                  Published
                </Label>
                <p className="text-sm text-muted-foreground">
                  {published ? "This item will be visible in the gallery" : "This item will be hidden"}
                </p>
              </div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base font-semibold cursor-pointer">
                  Featured
                </Label>
                <p className="text-sm text-muted-foreground">
                  {featured ? "This item will be highlighted" : "Mark as featured to highlight"}
                </p>
              </div>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
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
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

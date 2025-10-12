/**
 * Edit Media Modal Component
 * Edit existing gallery items with validation
 */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, X, Image as ImageIcon } from "lucide-react";
import {
  galleryService,
  Gallery,
  GalleryCategory,
  GalleryFormData,
} from "@/services/gallery.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

interface EditMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery | null;
  onSuccess: () => void;
}

const gallerySchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must not exceed 120 characters")
    .trim(),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(Object.values(GalleryCategory), "Invalid category"),
  content: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters")
    .trim(),
  date: yup.date().required("Event date is required"),
  location: yup
    .string()
    .max(120, "Location must not exceed 120 characters")
    .trim(),
  published: yup.boolean().default(true),
  featured: yup.boolean().default(false),
  imageUrl: yup
    .string()
    .url("Please enter a valid URL")
    .trim(),
});

export default function EditMediaModal({
  open,
  onOpenChange,
  gallery,
  onSuccess,
}: EditMediaModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GalleryFormData>({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      published: true,
      featured: false,
    },
  });

  const published = watch("published");
  const featured = watch("featured");
  const imageUrl = watch("imageUrl");
  const mediaType = watch("media_type");

  // Pre-populate form when gallery changes
  useEffect(() => {
    if (gallery && open) {
      const dateValue = gallery.date
        ? new Date(gallery.date).toISOString().split("T")[0]
        : "";

      // Check if image_path is a URL (external image)
      const isExternalImage = gallery.image_path?.startsWith('http://') || gallery.image_path?.startsWith('https://');
      const currentImageUrl = isExternalImage ? gallery.image_path : "";

      reset({
        title: gallery.title,
        category: gallery.category,
        content: gallery.content,
        date: dateValue as any,
        location: gallery.location || "",
        published: gallery.published,
        featured: gallery.featured,
        media_type: gallery.media_type || "image",
        imageUrl: currentImageUrl,
      });

      // Set existing image preview
      if (gallery.image_path) {
        setImagePreview(galleryService.getImageUrl(gallery.image_path));
      }
    }
  }, [gallery, open, reset]);

  const handleImageUrlChange = (url: string) => {
    setValue("imageUrl", url, { shouldValidate: true });
    if (url) {
      setImagePreview(url); // Use URL as preview
    } else {
      setImagePreview(
        gallery?.image_path ? galleryService.getImageUrl(gallery.image_path) : null
      );
    }
  };

  const onSubmit = async (data: GalleryFormData) => {
    if (!gallery) return;

    try {
      setIsSubmitting(true);

      await galleryService.updateGallery(gallery._id, data);

      toast({
        title: "Gallery Updated Successfully!",
        description: `"${data.title}" has been updated.`,
      });

      reset();
      setImagePreview(null);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating gallery:", error);

      let errorMessage = "Failed to update gallery item. Please try again.";
      if (error instanceof ApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
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
      setImagePreview(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Media</DialogTitle>
          <DialogDescription>
            Update gallery item details. Leave image empty to keep existing image.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Media Type Selection */}
          <div className="space-y-2">
            <Label>Media Type</Label>
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
              {mediaType === "video" ? "YouTube Video URL" : "Image URL"} (Optional - leave empty to keep current)
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
              className={errors.imageUrl ? "border-destructive" : ""}
              autoComplete="off"
            />
            <p className="text-sm text-muted-foreground">
              {mediaType === "video"
                ? "Enter a new YouTube video URL"
                : "Enter a new image URL to replace the current"}
            </p>
            {errors.imageUrl && (
              <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
            )}

            {/* Media Preview */}
            {imagePreview && (
              <div className="relative border-2 border-border rounded-lg overflow-hidden mt-4">
                {mediaType === "video" && imageUrl ? (
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
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter gallery title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Category and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue("category", value as any)}
                defaultValue={gallery?.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(GalleryCategory).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">
                Event Date <span className="text-destructive">*</span>
              </Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date.message}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter event location (optional)"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Enter gallery description"
              rows={5}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make this gallery item visible to the public
                </p>
              </div>
              <Switch
                id="published"
                checked={published}
                onCheckedChange={(checked) => setValue("published", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured</Label>
                <p className="text-sm text-muted-foreground">
                  Show this item in featured sections
                </p>
              </div>
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setValue("featured", checked)}
              />
            </div>
          </div>

          <DialogFooter>
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
                "Update Gallery"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Edit Article Modal Component
 * Form for editing existing articles with validation
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
import { articleService, Article } from "@/services/article.service";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/services/api.service";

// Categories from article model
const CATEGORIES = [
  "Industry Insights",
  "Technical Guide",
  "Business Strategy",
  "AI Ethics",
  "Workplace Innovation",
  "Healthcare AI",
  "Leadership",
];

// Validation schema matching article.model.js
const articleSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters")
    .trim(),
  summary: yup
    .string()
    .required("Summary is required")
    .min(30, "Summary must be at least 30 characters")
    .max(300, "Summary must be at most 300 characters")
    .trim(),
  content: yup
    .string()
    .required("Content is required")
    .min(100, "Content must be at least 100 characters"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(CATEGORIES, "Invalid category"),
  tags: yup
    .array()
    .of(yup.string().trim())
    .max(8, "You can assign at most 8 tags")
    .default([]),
  author_name: yup
    .string()
    .required("Author name is required")
    .min(2, "Author name must be at least 2 characters")
    .max(60, "Author name must be at most 60 characters")
    .trim(),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "Invalid status")
    .default("draft"),
  is_featured: yup.boolean().default(false),
  featured_badge_text: yup
    .string()
    .max(40, "Badge text must be at most 40 characters")
    .default("Featured Article"),
  seo_title: yup
    .string()
    .max(70, "SEO title must be at most 70 characters")
    .trim(),
  seo_description: yup
    .string()
    .max(160, "SEO description must be at most 160 characters")
    .trim(),
});

type ArticleFormData = yup.InferType<typeof articleSchema>;

interface EditArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
  onSuccess?: () => void;
}

export default function EditArticleModal({
  open,
  onOpenChange,
  article,
  onSuccess,
}: EditArticleModalProps) {
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: yupResolver(articleSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      tags: [],
      author_name: "",
      status: "draft",
      is_featured: false,
      featured_badge_text: "Featured Article",
      seo_title: "",
      seo_description: "",
    },
  });

  const tags = watch("tags") || [];
  const isFeatured = watch("is_featured");

  // Load article data when modal opens
  useEffect(() => {
    if (article && open) {
      reset({
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: article.category,
        tags: article.tags || [],
        author_name: article.author_name,
        status: article.status,
        is_featured: article.is_featured,
        featured_badge_text: article.featured_badge_text,
        seo_title: article.seo_title || "",
        seo_description: article.seo_description || "",
      });
    }
  }, [article, open, reset]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag) && tags.length < 8) {
        setValue("tags", [...tags, newTag]);
        setTagInput("");
      } else if (tags.length >= 8) {
        toast({
          title: "Maximum Tags Reached",
          description: "You can only add up to 8 tags.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (data: ArticleFormData) => {
    if (!article) return;

    try {
      setIsSubmitting(true);
      await articleService.updateArticle(article._id, data as any);

      toast({
        title: "Article Updated Successfully!",
        description: `Your article "${data.title}" has been updated.`,
      });

      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error updating article:", error);

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
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>
            Update the article details. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter article title (5-150 characters)"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">
              Summary <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="summary"
              placeholder="Brief summary of the article (30-300 characters)"
              rows={3}
              {...register("summary")}
              className={errors.summary ? "border-red-500" : ""}
            />
            {errors.summary && (
              <p className="text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Full article content (minimum 100 characters)"
              rows={10}
              {...register("content")}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Author Name */}
          <div className="space-y-2">
            <Label htmlFor="author_name">
              Author Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="author_name"
              placeholder="Enter author name (2-60 characters)"
              {...register("author_name")}
              className={errors.author_name ? "border-red-500" : ""}
            />
            {errors.author_name && (
              <p className="text-sm text-red-500">{errors.author_name.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Max 8)</Label>
            <Input
              id="tags"
              placeholder="Type tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            {errors.tags && (
              <p className="text-sm text-red-500">{errors.tags.message}</p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Featured Article */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured">Featured Article</Label>
                <p className="text-sm text-muted-foreground">
                  Mark this article as featured
                </p>
              </div>
              <Controller
                name="is_featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="is_featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {isFeatured && (
              <div className="space-y-2">
                <Label htmlFor="featured_badge_text">Featured Badge Text</Label>
                <Input
                  id="featured_badge_text"
                  placeholder="e.g., Featured Article, Editor's Pick"
                  {...register("featured_badge_text")}
                  className={errors.featured_badge_text ? "border-red-500" : ""}
                />
                {errors.featured_badge_text && (
                  <p className="text-sm text-red-500">
                    {errors.featured_badge_text.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* SEO Fields */}
          <div className="space-y-4 border rounded-lg p-4">
            <h3 className="font-semibold">SEO Settings (Optional)</h3>

            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                placeholder="SEO optimized title (max 70 characters)"
                {...register("seo_title")}
                className={errors.seo_title ? "border-red-500" : ""}
              />
              {errors.seo_title && (
                <p className="text-sm text-red-500">{errors.seo_title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">SEO Description</Label>
              <Textarea
                id="seo_description"
                placeholder="SEO meta description (max 160 characters)"
                rows={2}
                {...register("seo_description")}
                className={errors.seo_description ? "border-red-500" : ""}
              />
              {errors.seo_description && (
                <p className="text-sm text-red-500">
                  {errors.seo_description.message}
                </p>
              )}
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
                  Updating...
                </>
              ) : (
                "Update Article"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

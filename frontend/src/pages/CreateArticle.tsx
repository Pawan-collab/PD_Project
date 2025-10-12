/**
 * Create Article Page
 * Form for creating new articles with full article model support
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  PenTool,
  Send,
  Loader2,
  AlertCircle,
  FileText,
  Tag,
  Star,
  Eye,
  BookOpen,
  User,
} from "lucide-react";
import { articleService, ArticleCategory, ArticleStatus, type ArticleFormData } from "@/services/article.service";
import { ApiError } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";

// Yup validation schema based on backend article model
const articleSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  summary: yup
    .string()
    .required("Summary is required")
    .min(30, "Summary must be at least 30 characters")
    .max(300, "Summary must be at most 300 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(100, "Content must be at least 100 characters"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      Object.values(ArticleCategory),
      "Please select a valid category"
    ),
  author_name: yup
    .string()
    .required("Author name is required")
    .min(2, "Author name must be at least 2 characters")
    .max(60, "Author name must be at most 60 characters"),
  tags: yup
    .array()
    .of(yup.string())
    .max(8, "You can add at most 8 tags")
    .optional(),
  status: yup
    .string()
    .oneOf(Object.values(ArticleStatus))
    .optional(),
  is_featured: yup
    .boolean()
    .optional(),
  featured_badge_text: yup
    .string()
    .max(40, "Badge text must be at most 40 characters")
    .optional(),
  seo_title: yup
    .string()
    .max(70, "SEO title must be at most 70 characters")
    .optional(),
  seo_description: yup
    .string()
    .max(160, "SEO description must be at most 160 characters")
    .optional(),
});

type ArticleFormValues = yup.InferType<typeof articleSchema>;

const CreateArticle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ArticleFormValues>({
    resolver: yupResolver(articleSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: ArticleCategory.INDUSTRY_INSIGHTS,
      author_name: "",
      tags: [],
      status: ArticleStatus.DRAFT,
      is_featured: false,
      featured_badge_text: "Featured Article",
      seo_title: "",
      seo_description: "",
    },
  });

  const category = watch("category");
  const status = watch("status");
  const is_featured = watch("is_featured");
  const content = watch("content");
  const summary = watch("summary");
  const tags = watch("tags") || [];
  const seo_description = watch("seo_description");

  const onSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    try {
      const newArticle = await articleService.createArticle(data as ArticleFormData);

      toast({
        title: "Article Created Successfully!",
        description: `Your article "${data.title}" has been ${data.status === ArticleStatus.PUBLISHED ? "published" : "saved as draft"}.`,
      });

      // Navigate to articles list
      navigate("/admin/articles");
    } catch (error) {
      console.error("Article creation error:", error);

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
        title: "Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: ArticleCategory.INDUSTRY_INSIGHTS, label: "Industry Insights", icon: "💼" },
    { value: ArticleCategory.TECHNICAL_GUIDE, label: "Technical Guide", icon: "🔧" },
    { value: ArticleCategory.BUSINESS_STRATEGY, label: "Business Strategy", icon: "📊" },
    { value: ArticleCategory.AI_ETHICS, label: "AI Ethics", icon: "⚖️" },
    { value: ArticleCategory.WORKPLACE_INNOVATION, label: "Workplace Innovation", icon: "💡" },
    { value: ArticleCategory.HEALTHCARE_AI, label: "Healthcare AI", icon: "🏥" },
    { value: ArticleCategory.LEADERSHIP, label: "Leadership", icon: "👔" },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 8 && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()], { shouldValidate: true });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue("tags", tags.filter(tag => tag !== tagToRemove), { shouldValidate: true });
  };

  const contentCount = content?.length || 0;
  const summaryCount = summary?.length || 0;
  const seoDescCount = seo_description?.length || 0;

  const wordCount = content?.trim().split(/\s+/).filter(w => w).length || 0;
  const estimatedReadTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <PenTool className="w-4 h-4 mr-2" />
              Content Creation
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight font-space">Create New Article</h1>
            <p className="text-muted-foreground mt-1">
              Write and publish professional articles with full SEO support
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="border-primary/50 bg-primary/5">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            Fill in all required fields. Articles can be saved as drafts or published immediately.
            SEO fields are optional but recommended for better discoverability.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Content Card */}
          <Card className="glass-surface border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-space">Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Article Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a compelling article title..."
                  {...register("title")}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  5-150 characters. Make it engaging and descriptive.
                </p>
              </div>

              {/* Summary Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="summary" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Summary <span className="text-destructive">*</span>
                  </Label>
                  <span className={`text-xs ${summaryCount < 30 || summaryCount > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {summaryCount} / 300 characters
                  </span>
                </div>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of your article (30-300 characters)..."
                  rows={3}
                  {...register("summary")}
                  className={errors.summary ? "border-destructive" : ""}
                />
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      summaryCount > 300 ? 'bg-destructive' :
                      summaryCount >= 30 ? 'bg-primary' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((summaryCount / 300) * 100, 100)}%` }}
                  />
                </div>
                {errors.summary && (
                  <p className="text-sm text-destructive">{errors.summary.message}</p>
                )}
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">
                    Article Content <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{contentCount} characters</span>
                    <span>•</span>
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{estimatedReadTime} min read</span>
                  </div>
                </div>
                <Textarea
                  id="content"
                  placeholder="Write your article content here... (minimum 100 characters)"
                  rows={16}
                  {...register("content")}
                  className={errors.content ? "border-destructive" : ""}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Write clear and engaging content. Minimum 100 characters required.
                </p>
              </div>

              {/* Category and Author Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Field */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <span>{option.icon}</span>
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>

                {/* Author Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="author_name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Author Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="author_name"
                    placeholder="Enter author name..."
                    {...register("author_name")}
                    className={errors.author_name ? "border-destructive" : ""}
                  />
                  {errors.author_name && (
                    <p className="text-sm text-destructive">{errors.author_name.message}</p>
                  )}
                </div>
              </div>

              {/* Tags Field */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags (Optional, max 8)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    disabled={tags.length >= 8}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || tags.length >= 8}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {errors.tags && (
                  <p className="text-sm text-destructive">{errors.tags.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO & Settings Card */}
          <Card className="glass-surface border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-space">SEO & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SEO Title */}
              <div className="space-y-2">
                <Label htmlFor="seo_title">SEO Title (Optional)</Label>
                <Input
                  id="seo_title"
                  placeholder="Optimized title for search engines (max 70 chars)..."
                  {...register("seo_title")}
                  className={errors.seo_title ? "border-destructive" : ""}
                />
                {errors.seo_title && (
                  <p className="text-sm text-destructive">{errors.seo_title.message}</p>
                )}
              </div>

              {/* SEO Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="seo_description">SEO Description (Optional)</Label>
                  <span className={`text-xs ${seoDescCount > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {seoDescCount} / 160 characters
                  </span>
                </div>
                <Textarea
                  id="seo_description"
                  placeholder="Meta description for search engines (max 160 chars)..."
                  rows={3}
                  {...register("seo_description")}
                  className={errors.seo_description ? "border-destructive" : ""}
                />
                {errors.seo_description && (
                  <p className="text-sm text-destructive">{errors.seo_description.message}</p>
                )}
              </div>

              {/* Status Selection */}
              <div className="space-y-2">
                <Label htmlFor="status">Publication Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ArticleStatus.DRAFT}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span>Draft</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={ArticleStatus.PUBLISHED}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Published</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={ArticleStatus.ARCHIVED}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                            <span>Archived</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="space-y-0.5">
                  <Label htmlFor="is_featured" className="text-base font-semibold cursor-pointer flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Featured Article
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {is_featured ? "This article will be highlighted as featured" : "Mark as featured to highlight this article"}
                  </p>
                </div>
                <Switch
                  id="is_featured"
                  checked={is_featured}
                  onCheckedChange={(checked) => setValue("is_featured", checked, { shouldValidate: true })}
                />
              </div>

              {/* Featured Badge Text */}
              {is_featured && (
                <div className="space-y-2">
                  <Label htmlFor="featured_badge_text">Featured Badge Text</Label>
                  <Input
                    id="featured_badge_text"
                    placeholder="Featured Article"
                    {...register("featured_badge_text")}
                    className={errors.featured_badge_text ? "border-destructive" : ""}
                  />
                  {errors.featured_badge_text && (
                    <p className="text-sm text-destructive">{errors.featured_badge_text.message}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/articles")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-primary hover:shadow-glow group"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {status === ArticleStatus.PUBLISHED ? "Publishing..." : "Saving..."}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  {status === ArticleStatus.PUBLISHED ? "Publish Article" : "Save Article"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateArticle;

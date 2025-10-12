/**
 * Article Preview Modal Component
 * Displays article details in a preview format
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  User,
  BookOpen,
  Eye,
  Heart,
  Tag,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Article } from "@/services/article.service";

interface ArticlePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
}

export default function ArticlePreviewModal({
  open,
  onOpenChange,
  article,
}: ArticlePreviewModalProps) {
  if (!article) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Article Preview</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusColor(article.status)}>
                  {article.status.toUpperCase()}
                </Badge>
                <Badge variant="outline">{article.category}</Badge>
                {article.is_featured && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    {article.featured_badge_text}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                {article.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </div>

            <Separator />

            {/* Metadata Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Author</p>
                  <p className="font-medium">{article.author_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(article.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Read Time</p>
                  <p className="font-medium">{article.read_time_minutes} min</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Word Count</p>
                  <p className="font-medium">{article.word_count.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {article.published_at && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-green-600" />
                <p className="text-muted-foreground">
                  Published on <span className="font-medium text-foreground">{formatDate(article.published_at)}</span>
                </p>
              </div>
            )}

            <Separator />

            {/* Engagement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{article.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{article.likes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{article.engaged_sessions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Engaged</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(article.time_spent_seconds / 60)}m
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Content Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Content</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {article.content}
                </p>
              </div>
            </div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* SEO Section */}
            {(article.seo_title || article.seo_description) && (
              <>
                <Separator />
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold">SEO Information</h3>
                  {article.seo_title && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">SEO Title</p>
                      <p className="text-sm font-medium">{article.seo_title}</p>
                    </div>
                  )}
                  {article.seo_description && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">SEO Description</p>
                      <p className="text-sm">{article.seo_description}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Article ID and Slug */}
            <Separator />
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <span className="font-medium">Article ID:</span> {article._id}
              </p>
              <p>
                <span className="font-medium">Slug:</span> {article.slug}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span> {formatDate(article.updatedAt)}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

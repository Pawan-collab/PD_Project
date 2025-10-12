/**
 * Article Detail Page
 * Displays full article content with engagement features
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Eye,
  ThumbsUp,
  Share2,
  BookOpen,
  Tag,
  Loader2,
  Heart,
} from "lucide-react";
import { articleService, Article } from "@/services/article.service";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setIsLoading(true);
      const data = await articleService.getArticleBySlug(articleSlug);
      setArticle(data);

      // Increment view count
      await articleService.incrementView(data._id);

      // Fetch related articles from the same category
      const relatedData = await articleService.getArticlesByCategory(data.category);
      // Filter out current article and limit to 3
      const filtered = relatedData
        .filter((a) => a._id !== data._id)
        .slice(0, 3);
      setRelatedArticles(filtered);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load article.";
      toast({
        title: "Article Not Found",
        description: errorMessage,
        variant: "destructive",
      });
      setTimeout(() => navigate("/articles"), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!article || isLiking) return;

    try {
      setIsLiking(true);
      if (hasLiked) {
        await articleService.unlikeArticle(article._id);
        setArticle({ ...article, likes: article.likes - 1 });
        setHasLiked(false);
        toast({
          title: "Unliked",
          description: "Article removed from your likes.",
        });
      } else {
        await articleService.likeArticle(article._id);
        setArticle({ ...article, likes: article.likes + 1 });
        setHasLiked(true);
        toast({
          title: "Liked!",
          description: "Thank you for your feedback.",
        });
      }
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Unable to update like status.",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Article link copied to clipboard.",
      });
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

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!article) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/articles">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/articles")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/20 text-primary">
              {article.category}
            </Badge>
            {article.is_featured && (
              <Badge className="ml-2 bg-gradient-primary text-primary-foreground">
                {article.featured_badge_text}
              </Badge>
            )}
            <h1 className="text-4xl font-space font-bold tracking-tight">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">{article.author_name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(article.published_at || article.createdAt)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.read_time_minutes} min read
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {article.views.toLocaleString()} views
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant={hasLiked ? "default" : "outline"}
              onClick={handleLike}
              disabled={isLiking}
              className="group"
            >
              {isLiking ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Heart className={`h-4 w-4 mr-2 ${hasLiked ? "fill-current" : ""}`} />
              )}
              {article.likes.toLocaleString()}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Separator />

        {/* Article Content */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Tag className="h-4 w-4" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Author Info */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{article.author_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Expert author contributing insights on AI and technology
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-space font-bold">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle._id}
                  className="group hover-lift glass-surface border-border/50"
                >
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="outline" className="w-fit border-primary/20 text-primary">
                      {relatedArticle.category}
                    </Badge>
                    <Link to={`/articles/${relatedArticle.slug}`}>
                      <h3 className="font-semibold group-hover:gradient-text transition-colors cursor-pointer line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedArticle.summary}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {relatedArticle.read_time_minutes} min
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {relatedArticle.views.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-space font-bold mb-4">
              Enjoyed this article?
            </h2>
            <p className="mb-6 text-primary-foreground/90">
              Explore more insights or get in touch with our experts to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles">
                <Button variant="secondary" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  More Articles
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ArticleDetail;

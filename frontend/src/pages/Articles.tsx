import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Eye,
  ThumbsUp,
  Sparkles,
  BookOpen,
  Users,
  Loader2,
} from "lucide-react";
import {
  articleService,
  Article,
  ArticleCategory,
} from "@/services/article.service";
import { useToast } from "@/hooks/use-toast";

const Articles = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Articles");

  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const [publishedData, featuredData] = await Promise.all([
        articleService.getPublishedArticles(),
        articleService.getFeaturedArticles(),
      ]);
      setArticles(publishedData);
      setFeaturedArticles(featuredData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch articles.";
      toast({
        title: "Failed to Load Articles",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  // Categories from ArticleCategory enum
  const categories = [
    "All Articles",
    ArticleCategory.INDUSTRY_INSIGHTS,
    ArticleCategory.TECHNICAL_GUIDE,
    ArticleCategory.BUSINESS_STRATEGY,
    ArticleCategory.AI_ETHICS,
    ArticleCategory.WORKPLACE_INNOVATION,
    ArticleCategory.HEALTHCARE_AI,
    ArticleCategory.LEADERSHIP,
  ];

  // Filter articles by category
  const filteredArticles =
    selectedCategory === "All Articles"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // Get featured article based on selected category
  // If "All Articles" - show first featured article or newest article
  // If category selected - show newest article from that category (featured or not)
  const getFeaturedArticle = () => {
    if (selectedCategory === "All Articles") {
      // Show featured articles first, then fall back to newest article
      return featuredArticles[0] || articles[0];
    } else {
      // Show newest article from the selected category
      const categoryArticles = articles.filter(
        (article) => article.category === selectedCategory
      );

      // Sort by published_at or createdAt (newest first)
      const sortedArticles = categoryArticles.sort((a, b) => {
        const dateA = new Date(a.published_at || a.createdAt).getTime();
        const dateB = new Date(b.published_at || b.createdAt).getTime();
        return dateB - dateA; // Newest first
      });

      return sortedArticles[0];
    }
  };

  const featuredArticle = getFeaturedArticle();

  // Get unique authors from articles
  const uniqueAuthors = Array.from(
    new Set(articles.map((article) => article.author_name))
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Knowledge Hub
            </Badge>
            <h1 className="text-3xl font-space font-bold">
              Insights & Articles
            </h1>
            <p className="text-muted-foreground">
              Expert analysis and practical guidance on AI implementation and
              workplace transformation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Categories
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Authors
            </Button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="hover:shadow-md transition-all"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : featuredArticle ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-space font-bold">
                {selectedCategory === "All Articles"
                  ? "Featured Article"
                  : `Latest in ${selectedCategory}`}
              </h2>
              <Badge className="bg-gradient-primary text-primary-foreground">
                {selectedCategory === "All Articles"
                  ? featuredArticle.featured_badge_text || "Featured"
                  : "Newest"}
              </Badge>
            </div>

            <Card className="hover-lift glass-surface border-border/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-4 border-primary/20 text-primary"
                      >
                        {featuredArticle.category}
                      </Badge>
                      <Link to={`/articles/${featuredArticle.slug}`}>
                        <h3 className="text-2xl font-bold mb-4 leading-tight hover:gradient-text transition-colors cursor-pointer">
                          {featuredArticle.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredArticle.author_name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(
                          featuredArticle.published_at ||
                            featuredArticle.createdAt
                        )}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredArticle.read_time_minutes} min read
                      </div>
                    </div>

                    <Link to={`/articles/${featuredArticle.slug}`}>
                      <Button className="bg-gradient-primary hover:shadow-glow group mt-6">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Article Stats</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Views
                          </div>
                          <span className="font-medium">
                            {featuredArticle.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Likes
                          </div>
                          <span className="font-medium">
                            {featuredArticle.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Card className="bg-gradient-primary p-6 text-primary-foreground border-0">
                      <h4 className="font-semibold mb-2">Stay Updated</h4>
                      <p className="text-sm text-primary-foreground/90 mb-4">
                        Get the latest AI insights delivered to your inbox.
                      </p>
                      <Button variant="secondary" size="sm" className="w-full">
                        Subscribe to Newsletter
                      </Button>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">
              {selectedCategory === "All Articles"
                ? "Latest Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <Badge variant="outline">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "Article" : "Articles"}
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Articles Found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All Articles"
                  ? "No articles have been published yet."
                  : `No articles found in the ${selectedCategory} category.`}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card
                  key={article._id}
                  className="group hover-lift glass-surface border-border/50"
                >
                  <CardHeader>
                    <Badge
                      variant="outline"
                      className="w-fit mb-3 border-primary/20 text-primary"
                    >
                      {article.category}
                    </Badge>
                    <Link to={`/articles/${article.slug}`}>
                      <CardTitle className="text-lg group-hover:gradient-text transition-colors cursor-pointer line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {article.author_name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.published_at || article.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.read_time_minutes} min
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {article.likes.toLocaleString()}
                        </div>
                      </div>

                      <Link to={`/articles/${article.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group p-0 h-auto"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Authors Section */}
        {uniqueAuthors.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-space font-bold">
              Our Expert Authors
            </h2>
            <p className="text-muted-foreground">
              Meet the thought leaders behind our insights - industry experts
              with decades of combined experience in AI, technology, and
              business transformation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {uniqueAuthors.map((authorName, index) => {
                const authorArticlesCount = articles.filter(
                  (article) => article.author_name === authorName
                ).length;
                return (
                  <Card
                    key={index}
                    className="text-center hover-lift glass-surface border-border/50"
                  >
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold mb-1 text-sm">
                        {authorName}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        {authorArticlesCount}{" "}
                        {authorArticlesCount === 1 ? "article" : "articles"}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Ready to Apply These{" "}
              <span className="gradient-text">Insights?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Transform theory into practice. Contact our experts to discuss how
              these insights can be applied to your specific business challenges
              and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  Discuss Your Needs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button variant="outline" size="lg" className="hover-lift">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Articles;

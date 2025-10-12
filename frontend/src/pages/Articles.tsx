import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, Eye, ThumbsUp, Sparkles, BookOpen, Users } from "lucide-react";

const Articles = () => {
  const featuredArticle = {
    title: "The Future of AI in Workplace Transformation: A 2024 Perspective",
    excerpt: "As we advance deeper into 2024, artificial intelligence continues to reshape how we work, collaborate, and innovate. This comprehensive analysis explores the latest trends, challenges, and opportunities in AI-powered workplace transformation.",
    author: "Dr. Sarah Mitchell",
    date: "August 15, 2024",
    readTime: "12 min read",
    category: "Industry Insights",
    views: "2,850",
    likes: "156",
    featured: true
  };

  const articles = [
    {
      title: "Implementing AI Virtual Assistants: A Step-by-Step Guide",
      excerpt: "Learn how to successfully integrate AI virtual assistants into your organization with our proven methodology and best practices.",
      author: "James Thompson",
      date: "July 28, 2024",
      readTime: "8 min read",
      category: "Technical Guide",
      views: "1,950",
      likes: "89"
    },
    {
      title: "ROI Analysis: Measuring the Impact of AI Solutions",
      excerpt: "A comprehensive framework for evaluating the return on investment of AI implementations, with real-world case studies and metrics.",
      author: "Michael Rodriguez",
      date: "July 15, 2024",
      readTime: "10 min read",
      category: "Business Strategy",
      views: "1,650",
      likes: "124"
    },
    {
      title: "Ethical AI Development: Principles and Practices",
      excerpt: "Exploring the fundamental principles of ethical AI development and how to implement responsible AI practices in your organization.",
      author: "Dr. Emily Chen",
      date: "June 30, 2024",
      readTime: "15 min read",
      category: "AI Ethics",
      views: "2,100",
      likes: "187"
    },
    {
      title: "The Evolution of Employee Experience in the AI Era",
      excerpt: "How artificial intelligence is transforming employee experience and what organizations need to know to stay competitive.",
      author: "Dr. Sarah Mitchell",
      date: "June 12, 2024",
      readTime: "9 min read",
      category: "Workplace Innovation",
      views: "1,800",
      likes: "102"
    },
    {
      title: "Machine Learning in Manufacturing: Real-World Applications",
      excerpt: "Discover how machine learning is revolutionizing manufacturing processes through predictive maintenance, quality control, and optimization.",
      author: "James Thompson",
      date: "May 25, 2024",
      readTime: "11 min read",
      category: "Industry Applications",
      views: "1,450",
      likes: "76"
    },
    {
      title: "Building Trust in AI Systems: A Leadership Perspective",
      excerpt: "Key strategies for leaders to build organizational trust in AI systems and drive successful digital transformation initiatives.",
      author: "Michael Rodriguez",
      date: "May 8, 2024",
      readTime: "7 min read",
      category: "Leadership",
      views: "1,320",
      likes: "93"
    },
    {
      title: "Natural Language Processing in Healthcare: Opportunities and Challenges",
      excerpt: "An in-depth look at how NLP is transforming healthcare delivery and the challenges organizations face in implementation.",
      author: "Dr. Emily Chen",
      date: "April 20, 2024",
      readTime: "13 min read",
      category: "Healthcare AI",
      views: "2,200",
      likes: "145"
    },
    {
      title: "Scaling AI Solutions: From Pilot to Production",
      excerpt: "Best practices and common pitfalls when scaling AI solutions from initial pilots to full production deployments.",
      author: "James Thompson",
      date: "April 5, 2024",
      readTime: "9 min read",
      category: "Implementation",
      views: "1,750",
      likes: "108"
    }
  ];

  const categories = [
    "All Articles", "Industry Insights", "Technical Guide", "Business Strategy", 
    "AI Ethics", "Workplace Innovation", "Healthcare AI", "Leadership"
  ];

  const authors = [
    {
      name: "Dr. Sarah Mitchell",
      role: "CEO & AI Strategy Expert",
      articles: 15,
      expertise: "AI Strategy, Workplace Transformation"
    },
    {
      name: "James Thompson",
      role: "CTO & Technical Lead",
      articles: 12,
      expertise: "Machine Learning, System Architecture"
    },
    {
      name: "Dr. Emily Chen",
      role: "Head of AI Research",
      articles: 18,
      expertise: "NLP, AI Ethics, Research"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Customer Success",
      articles: 10,
      expertise: "Business Strategy, Implementation"
    }
  ];

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
            <h1 className="text-3xl font-space font-bold">Insights & Articles</h1>
            <p className="text-muted-foreground">
              Expert analysis and practical guidance on AI implementation and workplace transformation.
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
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="hover:shadow-md transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">Featured Article</h2>
            <Badge className="bg-gradient-primary text-primary-foreground">
              Most Popular
            </Badge>
          </div>

          <Card className="hover-lift glass-surface border-border/50">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
                      {featuredArticle.category}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4 leading-tight hover:gradient-text transition-colors cursor-pointer">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredArticle.readTime}
                    </div>
                  </div>

                  <Button className="bg-gradient-primary hover:shadow-glow group">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
                        <span className="font-medium">{featuredArticle.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Likes
                        </div>
                        <span className="font-medium">{featuredArticle.likes}</span>
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

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">Latest Articles</h2>
            <Button variant="outline" size="sm">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-3 border-primary/20 text-primary">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg group-hover:gradient-text transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {article.likes}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Authors Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-space font-bold">Our Expert Authors</h2>
          <p className="text-muted-foreground">
            Meet the thought leaders behind our insights - industry experts with decades 
            of combined experience in AI, technology, and business transformation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <Card key={index} className="text-center hover-lift glass-surface border-border/50">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{author.role}</p>
                  <div className="text-xs text-muted-foreground mb-3">
                    {author.articles} articles published
                  </div>
                  <div className="text-xs bg-muted/30 px-3 py-1 rounded-full">
                    {author.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Ready to Apply These <span className="gradient-text">Insights?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Transform theory into practice. Contact our experts to discuss how these insights 
              can be applied to your specific business challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
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
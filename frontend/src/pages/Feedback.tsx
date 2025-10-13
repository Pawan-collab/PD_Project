import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Quote,
  Building,
  MapPin,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  Target,
  MessageSquare,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ApiError } from "@/services/api.service";
import {
  feedbackService,
  type Feedback,
  type FeedbackFormData as FeedbackFormDataType,
} from "@/services/feedback.service";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Yup validation schema based on backend requirements
const feedbackSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must contain at least 3 characters")
    .max(50, "Name must contain no more than 50 characters"),
  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(30, "Company name must be no more than 30 characters"),
  job_title: yup
    .string()
    .required("Job title is required")
    .min(2, "Job title must be at least 2 characters")
    .max(30, "Job title must be no more than 30 characters"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be a minimum of 0")
    .max(5, "Rating must be a maximum of 5")
    .typeError("Rating must be a number"),
  comment: yup
    .string()
    .required("Feedback is required")
    .min(10, "Feedback must be at least 10 characters long")
    .max(500, "Feedback must be no longer than 500 characters"),
});

type FeedbackFormData = yup.InferType<typeof feedbackSchema>;

const Feedback = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: yupResolver(feedbackSchema),
  });

  // Fetch approved feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const approvedFeedbacks = await feedbackService.getApprovedFeedbacks();
        setFeedbacks(approvedFeedbacks);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        const errorMessage =
          err instanceof ApiError ? err.message : "Failed to load feedbacks";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      await feedbackService.createFeedback(data);

      toast({
        title: "Feedback Submitted Successfully!",
        description:
          "Thank you for your feedback! It will appear on this page after our team reviews and approves it.",
      });
      reset();
      setSelectedRating(0);
    } catch (error) {
      console.error("Feedback submission error:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error instanceof ApiError) {
        errorMessage = error.message;

        // Handle validation errors from backend
        if (error.errors && error.errors.length > 0) {
          const validationMessages = error.errors
            .map(
              (err) =>
                (err as { msg?: string; message?: string }).msg ||
                (err as { msg?: string; message?: string }).message
            )
            .join(", ");
          errorMessage = validationMessages || errorMessage;
        }
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating, { shouldValidate: true });
  };

  // Calculate statistics from real data
  const calculateStats = () => {
    if (feedbacks.length === 0) {
      return {
        averageRating: 0,
        totalFeedbacks: 0,
        fiveStarCount: 0,
      };
    }

    const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / feedbacks.length;
    const fiveStarCount = feedbacks.filter((fb) => fb.rating === 5).length;

    return {
      averageRating: averageRating.toFixed(1),
      totalFeedbacks: feedbacks.length,
      fiveStarCount,
    };
  };

  const stats = calculateStats();
  const testimonials = [
    {
      quote:
        "AI_SOLUTIONS transformed our manufacturing operations completely. The AI virtual assistant reduced our downtime by 40% and improved our overall efficiency dramatically. The team's expertise and support throughout the implementation was exceptional.",
      author: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechCorp Industries",
      location: "Manchester, UK",
      industry: "Manufacturing",
      rating: 5,
      project: "AI Virtual Assistant Implementation",
      results: "40% reduction in downtime, $2.1M annual savings",
    },
    {
      quote:
        "The rapid prototyping solution helped us launch our new product line 6 months ahead of schedule. The AI-powered development process was incredibly efficient and cost-effective. Highly recommend their services.",
      author: "Michael Rodriguez",
      role: "Product Director",
      company: "Innovation Labs",
      location: "London, UK",
      industry: "Technology",
      rating: 5,
      project: "Rapid Prototyping Platform",
      results: "6 months faster time-to-market, 50% cost reduction",
    },
    {
      quote:
        "Outstanding support throughout our digital transformation journey. The healthcare AI solution has improved our patient processing speed by 60% and enhanced diagnostic accuracy significantly. The team understood our unique challenges perfectly.",
      author: "Dr. Emily Watson",
      role: "Digital Strategy Lead",
      company: "MedCare Solutions",
      location: "Edinburgh, UK",
      industry: "Healthcare",
      rating: 5,
      project: "Healthcare Digital Transformation",
      results: "60% faster patient processing, 85% diagnostic accuracy",
    },
    {
      quote:
        "The financial automation system has revolutionized our loan processing. We've seen a 75% improvement in processing speed and virtually eliminated manual errors. The ROI was evident within the first quarter.",
      author: "James Thompson",
      role: "Operations Manager",
      company: "SecureBank Ltd",
      location: "Birmingham, UK",
      industry: "Finance",
      rating: 5,
      project: "Financial Services Automation",
      results: "75% faster processing, 90% error reduction",
    },
    {
      quote:
        "The customer experience platform has been a game-changer for our retail operations. Customer satisfaction increased by 35% and our sales conversions improved by 25%. The AI recommendations are incredibly accurate.",
      author: "Lisa Anderson",
      role: "Customer Experience Director",
      company: "ShopSmart Chain",
      location: "Liverpool, UK",
      industry: "Retail",
      rating: 5,
      project: "Customer Experience Platform",
      results: "35% higher satisfaction, 25% conversion boost",
    },
    {
      quote:
        "The educational AI tutor system has transformed how our students learn. We've seen a 45% improvement in learning outcomes and our teachers can now focus on more strategic educational initiatives.",
      author: "David Miller",
      role: "Head of Technology",
      company: "EduFuture Academy",
      location: "Newcastle, UK",
      industry: "Education",
      rating: 5,
      project: "AI Tutor System",
      results: "45% better learning outcomes, 30% teacher workload reduction",
    },
  ];

  const statsData = [
    {
      icon: Star,
      value: stats.averageRating > 0 ? `${stats.averageRating}/5` : "—",
      label: "Average Rating",
      description:
        stats.totalFeedbacks > 0
          ? `Based on ${stats.totalFeedbacks} client ${
              stats.totalFeedbacks === 1 ? "review" : "reviews"
            }`
          : "Awaiting first reviews",
    },
    {
      icon: Award,
      value: `${stats.fiveStarCount}`,
      label: "5-Star Reviews",
      description:
        stats.totalFeedbacks > 0
          ? "Clients who gave us top ratings"
          : "Top-rated testimonials",
    },
    {
      icon: Users,
      value: `${stats.totalFeedbacks}`,
      label: "Total Feedbacks",
      description:
        stats.totalFeedbacks > 0
          ? "Approved client testimonials"
          : "Growing collection of reviews",
    },
    {
      icon: TrendingUp,
      value:
        stats.totalFeedbacks > 0
          ? `${((stats.fiveStarCount / stats.totalFeedbacks) * 100).toFixed(
              0
            )}%`
          : "—",
      label: "Excellence Rate",
      description:
        stats.totalFeedbacks > 0
          ? "Percentage of 5-star reviews"
          : "Quality benchmark metric",
    },
  ];

  const industryRatings = [
    { industry: "Manufacturing", rating: 4.9, projects: 12 },
    { industry: "Healthcare", rating: 4.8, projects: 8 },
    { industry: "Finance", rating: 5.0, projects: 6 },
    { industry: "Retail", rating: 4.9, projects: 10 },
    { industry: "Education", rating: 4.7, projects: 5 },
    { industry: "Technology", rating: 4.8, projects: 9 },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-primary text-primary" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h1 className="text-3xl font-space font-bold">Client Feedback</h1>
            <p className="text-muted-foreground">
              Real testimonials from real businesses across diverse industries.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 hover-lift glass-surface border-border/50"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">
              What Our Clients Say
            </h2>
            <Badge className="bg-gradient-primary text-primary-foreground">
              {isLoading ? "Loading..." : `${feedbacks.length} Reviews`}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Read authentic feedback from organizations that have transformed
            their operations with our AI solutions and achieved remarkable
            results.
          </p>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">
                Loading feedbacks...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          )}

          {/* Empty State */}
          {!isLoading && !error && feedbacks.length === 0 && (
            <Card className="p-12 text-center glass-surface border-border/50">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Approved Feedbacks Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Submitted feedbacks are currently being reviewed by our team.
              </p>
              <p className="text-sm text-muted-foreground">
                Be among the first to share your experience with us! Your
                feedback will be displayed here after approval.
              </p>
            </Card>
          )}

          {/* Feedbacks Display */}
          {!isLoading && !error && feedbacks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {feedbacks.map((feedback) => (
                <Card
                  key={feedback._id}
                  className="group hover-lift glass-surface border-border/50"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        {feedback.company_name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <blockquote className="text-lg leading-relaxed">
                        "{feedback.comment}"
                      </blockquote>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-t pt-6 border-border/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{feedback.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {feedback.job_title}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground mt-4">
                        <div>
                          <p className="font-medium text-foreground">Company</p>
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {feedback.company_name}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Submitted:
                          </p>
                          <p>
                            {new Date(feedback.submitted_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Rating:</span>
                          <span className="text-lg font-bold gradient-text">
                            {feedback.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Industry Ratings */}
        {/* <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-space font-bold mb-6 text-center">Ratings by Industry</h2>
            <p className="text-muted-foreground text-center mb-8">
              See how we perform across different industries and the number of successful 
              projects we've completed in each sector.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryRatings.map((item, index) => (
                <Card key={index} className="text-center hover-lift glass-surface border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{item.industry}</h3>
                    
                    <div className="flex justify-center mb-3">
                      {renderStars(Math.floor(item.rating))}
                    </div>
                    
                    <div className="text-2xl font-bold gradient-text mb-2">{item.rating}/5</div>
                    <div className="text-sm text-muted-foreground">
                      Based on {item.projects} completed projects
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Case Study CTA */}
        <div className="text-center space-y-6 py-24">
          <h2 className="text-2xl font-space font-bold">
            Detailed Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Want to learn more about how these results were achieved? Explore
            our detailed case studies and see the complete transformation
            journey.
          </p>
          <Link to="/projects">
            <Button className="bg-gradient-primary hover:shadow-glow group">
              View Case Studies
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feedback Form Section */}
        <Card className="glass-surface border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-space font-bold">
                Share Your Feedback
              </CardTitle>
            </div>
            <p className="text-muted-foreground mb-3">
              We value your opinion! Share your experience working with us and
              help others make informed decisions.
            </p>
            <Alert className="border-primary/50 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                All feedback submissions are reviewed by our team before being
                published to ensure quality and authenticity.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Job Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="job_title">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="job_title"
                    placeholder="e.g., Chief Technology Officer"
                    {...register("job_title")}
                    className={errors.job_title ? "border-destructive" : ""}
                  />
                  {errors.job_title && (
                    <p className="text-sm text-destructive">
                      {errors.job_title.message}
                    </p>
                  )}
                </div>

                {/* Company Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="company_name">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company_name"
                    placeholder="Enter your company name"
                    {...register("company_name")}
                    className={errors.company_name ? "border-destructive" : ""}
                  />
                  {errors.company_name && (
                    <p className="text-sm text-destructive">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>

                {/* Rating Field */}
                <div className="space-y-2">
                  <Label htmlFor="rating">
                    Your Rating <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 cursor-pointer transition-colors ${
                            star <= selectedRating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedRating > 0
                        ? `${selectedRating} / 5`
                        : "Click to rate"}
                    </span>
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-destructive">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-2">
                <Label htmlFor="comment">
                  Your Feedback <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience with our services... (10-500 characters)"
                  rows={6}
                  {...register("comment")}
                  className={errors.comment ? "border-destructive" : ""}
                />
                {errors.comment && (
                  <p className="text-sm text-destructive">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-primary hover:shadow-glow group"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Feedback
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Ready to Create Your{" "}
              <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients who have transformed
              their operations with AI Solutions. Let's discuss how we can help
              you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  Start Your Project
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

export default Feedback;

import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote, Building, MapPin, TrendingUp, Award, Users, Sparkles, Target } from "lucide-react";

const Feedback = () => {
  const testimonials = [
    {
      quote: "AI_SOLUTIONS transformed our manufacturing operations completely. The AI virtual assistant reduced our downtime by 40% and improved our overall efficiency dramatically. The team's expertise and support throughout the implementation was exceptional.",
      author: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechCorp Industries",
      location: "Manchester, UK",
      industry: "Manufacturing",
      rating: 5,
      project: "AI Virtual Assistant Implementation",
      results: "40% reduction in downtime, $2.1M annual savings"
    },
    {
      quote: "The rapid prototyping solution helped us launch our new product line 6 months ahead of schedule. The AI-powered development process was incredibly efficient and cost-effective. Highly recommend their services.",
      author: "Michael Rodriguez",
      role: "Product Director",
      company: "Innovation Labs",
      location: "London, UK",
      industry: "Technology",
      rating: 5,
      project: "Rapid Prototyping Platform",
      results: "6 months faster time-to-market, 50% cost reduction"
    },
    {
      quote: "Outstanding support throughout our digital transformation journey. The healthcare AI solution has improved our patient processing speed by 60% and enhanced diagnostic accuracy significantly. The team understood our unique challenges perfectly.",
      author: "Dr. Emily Watson",
      role: "Digital Strategy Lead",
      company: "MedCare Solutions",
      location: "Edinburgh, UK",
      industry: "Healthcare",
      rating: 5,
      project: "Healthcare Digital Transformation",
      results: "60% faster patient processing, 85% diagnostic accuracy"
    },
    {
      quote: "The financial automation system has revolutionized our loan processing. We've seen a 75% improvement in processing speed and virtually eliminated manual errors. The ROI was evident within the first quarter.",
      author: "James Thompson",
      role: "Operations Manager",
      company: "SecureBank Ltd",
      location: "Birmingham, UK",
      industry: "Finance",
      rating: 5,
      project: "Financial Services Automation",
      results: "75% faster processing, 90% error reduction"
    },
    {
      quote: "The customer experience platform has been a game-changer for our retail operations. Customer satisfaction increased by 35% and our sales conversions improved by 25%. The AI recommendations are incredibly accurate.",
      author: "Lisa Anderson",
      role: "Customer Experience Director",
      company: "ShopSmart Chain",
      location: "Liverpool, UK",
      industry: "Retail",
      rating: 5,
      project: "Customer Experience Platform",
      results: "35% higher satisfaction, 25% conversion boost"
    },
    {
      quote: "The educational AI tutor system has transformed how our students learn. We've seen a 45% improvement in learning outcomes and our teachers can now focus on more strategic educational initiatives.",
      author: "David Miller",
      role: "Head of Technology",
      company: "EduFuture Academy",
      location: "Newcastle, UK",
      industry: "Education",
      rating: 5,
      project: "AI Tutor System",
      results: "45% better learning outcomes, 30% teacher workload reduction"
    }
  ];

  const stats = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      description: "Based on 50+ client reviews"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Projects completed successfully"
    },
    {
      icon: Award,
      value: "95%",
      label: "Client Satisfaction",
      description: "Would recommend us to others"
    },
    {
      icon: Users,
      value: "85%",
      label: "Repeat Business",
      description: "Clients returning for new projects"
    }
  ];

  const industryRatings = [
    { industry: "Manufacturing", rating: 4.9, projects: 12 },
    { industry: "Healthcare", rating: 4.8, projects: 8 },
    { industry: "Finance", rating: 5.0, projects: 6 },
    { industry: "Retail", rating: 4.9, projects: 10 },
    { industry: "Education", rating: 4.7, projects: 5 },
    { industry: "Technology", rating: 4.8, projects: 9 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-primary text-primary' : 'text-muted-foreground'
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
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              All Reviews
            </Button>
            <Button variant="outline" size="sm">
              <Building className="w-4 h-4 mr-2" />
              By Industry
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover-lift glass-surface border-border/50">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">What Our Clients Say</h2>
            <Badge className="bg-gradient-primary text-primary-foreground">
              Latest Reviews
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Read authentic feedback from organizations that have transformed their operations 
            with our AI solutions and achieved remarkable results.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-primary text-primary-foreground">
                      {testimonial.industry}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <blockquote className="text-lg leading-relaxed">
                      "{testimonial.quote}"
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
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mt-4">
                      <div>
                        <p className="font-medium text-foreground">{testimonial.company}</p>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Project:</p>
                        <p>{testimonial.project}</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg mt-4">
                      <h4 className="font-semibold text-sm mb-1">Key Results:</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.results}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Ratings */}
        <Card className="glass-surface border-border/50">
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
        </Card>

        {/* Case Study CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-space font-bold">Detailed Case Studies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Want to learn more about how these results were achieved? 
            Explore our detailed case studies and see the complete transformation journey.
          </p>
          <Link to="/projects">
            <Button className="bg-gradient-primary hover:shadow-glow group">
              View Case Studies
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Ready to Create Your <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients who have transformed their operations 
              with AI Solutions. Let's discuss how we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
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
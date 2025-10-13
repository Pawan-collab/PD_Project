import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Zap,
  Shield,
  Lightbulb,
  Cog,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  solutionService,
  Solution as SolutionModel,
} from "@/services/solution.service";

const Solutions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location]);
  const [solutions, setSolutions] = useState<SolutionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Map backend icon string to lucide icon component
  const ICON_MAP: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    Brain,
    Zap,
    Shield,
    Lightbulb,
    Cog,
    MessageSquare,
  };

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await solutionService.getActiveSolutions();
        setSolutions(data);
      } catch (err) {
        // Let page show empty state; more robust error UI could be added
        console.error("Failed to fetch solutions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
    // existing hash scroll behavior
  }, []);

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description:
        "We analyze your current processes and identify optimization opportunities through comprehensive assessment.",
    },
    {
      step: "02",
      title: "Solution Design",
      description:
        "Custom AI solutions tailored to your specific business objectives and technical requirements.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Agile development with continuous testing ensures robust and reliable solution delivery.",
    },
    {
      step: "04",
      title: "Deployment & Support",
      description:
        "Seamless deployment with ongoing support and optimization for maximum performance.",
    },
  ];

  const stats = [
    { value: "500+", label: "Solutions Deployed" },
    { value: "98.7%", label: "Client Satisfaction" },
    { value: "300%", label: "Average ROI" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <AppLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Transform Your Business with
            <span className="block gradient-text">Intelligent Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive suite of AI solutions designed to
            revolutionize your operations, enhance productivity, and drive
            unprecedented growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 hover-lift glass-surface border-border/50"
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">
              Our Solution Portfolio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From AI assistants to automation platforms, we offer comprehensive
              solutions tailored to your industry and business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => {
              const Icon = ICON_MAP[solution.icon] || Brain;
              const status = solution.isActive ? "live" : "beta";
              const pricing = solution.pricing || "Contact Us";

              return (
                <Card
                  key={solution._id}
                  id={solution._id}
                  className="group hover-lift glass-surface border-border/50 relative overflow-hidden scroll-mt-24"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {solution.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {solution.badge}
                          </Badge>
                        )}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            status === "live" ? "bg-accent" : "bg-secondary"
                          }`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:gradient-text transition-all">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {solution.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{pricing}</span>
                        <Badge
                          variant="outline"
                          className={
                            status === "live"
                              ? "border-accent/20 text-accent"
                              : "border-secondary/20 text-secondary"
                          }
                        >
                          {status === "live" ? "Live" : "Beta"}
                        </Badge>
                      </div>

                      <Button
                        className="w-full bg-gradient-primary hover:shadow-glow group"
                        onClick={() => navigate('/contact')}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">
              Our Implementation Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful deployment and
              maximum ROI from your AI investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className="hover-lift glass-surface border-border/50 text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-lg shadow-glow">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-12 text-center">
            <Target className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-3xl font-space font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your
              Operations?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our AI specialists today to discuss how our solutions can
              be customized to meet your specific requirements and drive
              measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow"
                onClick={() => navigate('/contact')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover-lift"
                onClick={() => navigate('/projects')}
              >
                <Clock className="w-5 h-5 mr-2" />
                View Case Studies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Solutions;

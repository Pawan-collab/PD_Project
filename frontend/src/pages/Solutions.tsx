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
  Users,
  Clock,
  CheckCircle2
} from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Brain,
      title: "AI Virtual Assistant",
      description: "Intelligent conversational AI that handles complex queries and provides real-time solutions with natural language understanding.",
      features: ["Natural Language Processing", "24/7 Availability", "Multi-language Support", "Custom Training"],
      badge: "Most Popular",
      pricing: "From $299/mo",
      status: "live"
    },
    {
      icon: Zap,
      title: "Rapid Prototyping Engine",
      description: "Accelerated development platform that transforms ideas into working prototypes in days, not months.",
      features: ["Quick Turnaround", "Cost-effective", "Iterative Design", "Market Validation"],
      badge: "Featured",
      pricing: "From $199/mo", 
      status: "live"
    },
    {
      icon: MessageSquare,
      title: "Employee Experience Platform",
      description: "Comprehensive solution that enhances workplace productivity and satisfaction through intelligent automation.",
      features: ["Workflow Automation", "Performance Analytics", "Employee Feedback", "Integration Ready"],
      badge: "New Release",
      pricing: "Custom",
      status: "beta"
    },
    {
      icon: Lightbulb,
      title: "Innovation Consulting",
      description: "Strategic AI guidance to help organizations identify opportunities and implement cutting-edge solutions.",
      features: ["Strategic Planning", "Technology Assessment", "Implementation Roadmap", "Change Management"],
      badge: "",
      pricing: "Contact Us",
      status: "live"
    },
    {
      icon: Cog,
      title: "Process Automation Suite",
      description: "Intelligent automation that eliminates manual tasks and reduces operational overhead significantly.",
      features: ["Custom Workflows", "API Integration", "Real-time Monitoring", "Scalable Architecture"],
      badge: "",
      pricing: "From $499/mo",
      status: "live"
    },
    {
      icon: Shield,
      title: "AI Security Framework", 
      description: "Advanced threat detection and response system powered by machine learning algorithms.",
      features: ["Threat Detection", "Anomaly Analysis", "Predictive Security", "Compliance Ready"],
      badge: "Enterprise",
      pricing: "Enterprise Only",
      status: "live"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your current processes and identify optimization opportunities through comprehensive assessment."
    },
    {
      step: "02", 
      title: "Solution Design",
      description: "Custom AI solutions tailored to your specific business objectives and technical requirements."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with continuous testing ensures robust and reliable solution delivery."
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "Seamless deployment with ongoing support and optimization for maximum performance."
    }
  ];

  const stats = [
    { value: "500+", label: "Solutions Deployed" },
    { value: "98.7%", label: "Client Satisfaction" },
    { value: "300%", label: "Average ROI" },
    { value: "24/7", label: "Support Available" }
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
            Discover our comprehensive suite of AI solutions designed to revolutionize 
            your operations, enhance productivity, and drive unprecedented growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover-lift glass-surface border-border/50">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Our Solution Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From AI assistants to automation platforms, we offer comprehensive solutions 
              tailored to your industry and business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50 relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all">
                      <solution.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {solution.badge && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {solution.badge}
                        </Badge>
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        solution.status === 'live' ? 'bg-accent' : 'bg-secondary'
                      }`} />
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
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{solution.pricing}</span>
                      <Badge variant="outline" className={
                        solution.status === 'live' ? 'border-accent/20 text-accent' : 'border-secondary/20 text-secondary'
                      }>
                        {solution.status === 'live' ? 'Live' : 'Beta'}
                      </Badge>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary hover:shadow-glow group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Our Implementation Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful deployment and 
              maximum ROI from your AI investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="hover-lift glass-surface border-border/50 text-center p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-lg shadow-glow">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
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
              Ready to <span className="gradient-text">Transform</span> Your Operations?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our AI specialists today to discuss how our solutions can be customized 
              to meet your specific requirements and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="hover-lift">
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
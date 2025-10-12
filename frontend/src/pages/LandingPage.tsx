import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  Brain, 
  Shield, 
  Sparkles,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-primary animate-rotate-slow" />
            <span className="text-2xl font-space font-bold gradient-text">AI Solutions</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home">
              <Button variant="outline" size="sm">
                Enter Platform
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-mesh opacity-10 rounded-full blur-3xl animate-rotate-slow" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <Badge className="mb-8 animate-fade-up bg-gradient-primary text-primary-foreground">
            Next-Generation AI Platform
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-space font-bold mb-8 animate-scale-up">
            <span className="block">Transform</span>
            <span className="block gradient-text">Your Business</span>
            <span className="block text-muted-foreground text-4xl md:text-5xl font-normal">
              with AI Intelligence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            AI Solutions delivers cutting-edge AI solutions that revolutionize 
            digital employee experiences, automate complex workflows, and 
            drive unprecedented business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/home">
              <Button size="xl" className="group bg-gradient-primary hover:shadow-glow px-8 py-6 text-lg">
                Explore Platform
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button variant="outline" size="xl" className="px-8 py-6 text-lg hover-lift">
                View Solutions
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            {[
              { icon: Users, value: "500+", label: "Enterprises Served" },
              { icon: TrendingUp, value: "300%", label: "Average ROI Increase" },
              { icon: Globe, value: "50+", label: "Countries Worldwide" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              Platform Features
            </Badge>
            <h2 className="text-5xl font-space font-bold mb-6">
              Why Choose <span className="gradient-text">AI Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI capabilities designed for modern enterprises seeking 
              competitive advantages through intelligent automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Intelligence",
                description: "Advanced machine learning algorithms that adapt and improve with your business needs."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Real-time processing and instant responses that keep your operations running smoothly."
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security protocols protecting your data with military-grade encryption."
              },
              {
                icon: Sparkles,
                title: "Seamless Integration",
                description: "Easy integration with existing systems through our comprehensive API ecosystem."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-all float-element">
                    <feature.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20 rounded-3xl blur-2xl" />
            <Card className="relative glass-surface border-border/50 p-12">
              <CardContent className="p-0">
                <h2 className="text-4xl font-space font-bold mb-6">
                  Ready to <span className="gradient-text">Transform</span> Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join thousands of companies already using AI Solutions to revolutionize 
                  their operations with AI-powered solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/home">
                    <Button size="xl" className="bg-gradient-primary hover:shadow-glow px-8 py-6 text-lg">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="xl" className="px-8 py-6 text-lg hover-lift">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Layers className="w-8 h-8 text-primary" />
            <span className="text-2xl font-space font-bold gradient-text">AI Solutions</span>
          </div>
          <p className="text-muted-foreground mb-8">
            Transforming businesses worldwide through intelligent AI solutions.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
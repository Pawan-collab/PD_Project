import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Clock, 
  Award,
  ArrowUpRight,
  Filter,
  Calendar,
  Building,
  Target,
  Sparkles
} from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Healthcare AI Intelligence Platform",
      client: "MedTech Solutions Inc.",
      industry: "Healthcare",
      duration: "8 months",
      team: "12 specialists",
      year: "2024",
      status: "Completed",
      description: "Comprehensive AI-powered healthcare management system with predictive analytics, patient monitoring, and automated diagnosis assistance.",
      results: [
        "70% faster patient processing",
        "95% diagnostic accuracy improvement", 
        "60% reduction in administrative overhead",
        "$2.4M annual cost savings"
      ],
      technologies: ["Computer Vision", "Natural Language Processing", "Predictive Analytics", "HIPAA Compliance"],
      metrics: {
        roi: "340%",
        uptime: "99.9%", 
        users: "15K+",
        satisfaction: "98%"
      },
      featured: true
    },
    {
      id: 2,
      title: "Financial Services Automation Hub",
      client: "SecureBank Corporation",
      industry: "Finance",
      duration: "6 months",
      team: "8 specialists",
      year: "2024",
      status: "Completed", 
      description: "End-to-end automation platform for loan processing, risk assessment, and compliance monitoring with real-time fraud detection.",
      results: [
        "85% faster loan approvals",
        "95% reduction in manual errors",
        "Real-time fraud detection",
        "$1.8M operational savings"
      ],
      technologies: ["Machine Learning", "Blockchain Security", "Risk Analytics", "Automated Workflows"],
      metrics: {
        roi: "280%",
        uptime: "99.8%",
        users: "8K+", 
        satisfaction: "96%"
      },
      featured: true
    },
    {
      id: 3,
      title: "Smart Manufacturing Optimization",
      client: "TechCorp Industries",
      industry: "Manufacturing",
      duration: "10 months",
      team: "15 specialists", 
      year: "2023",
      status: "Completed",
      description: "IoT-integrated AI system for predictive maintenance, quality control, and production optimization across multiple facilities.",
      results: [
        "45% reduction in downtime",
        "30% improvement in product quality",
        "Real-time facility monitoring", 
        "$3.1M productivity gains"
      ],
      technologies: ["IoT Integration", "Predictive Maintenance", "Computer Vision", "Real-time Analytics"],
      metrics: {
        roi: "420%",
        uptime: "99.7%",
        users: "5K+",
        satisfaction: "97%"
      },
      featured: false
    },
    {
      id: 4,
      title: "Retail Experience Transformation",
      client: "ShopSmart Global",
      industry: "Retail",
      duration: "7 months",
      team: "10 specialists",
      year: "2024", 
      status: "In Progress",
      description: "AI-driven customer experience platform with personalized recommendations, inventory optimization, and omnichannel integration.",
      results: [
        "40% increase in conversion rates",
        "Enhanced personalization engine",
        "Omnichannel integration",
        "Real-time inventory sync"
      ],
      technologies: ["Recommendation Engine", "Customer Analytics", "Inventory Management", "Omnichannel Platform"],
      metrics: {
        roi: "250%",
        uptime: "99.6%",
        users: "25K+",
        satisfaction: "94%"
      },
      featured: false
    }
  ];

  const stats = [
    { icon: Award, value: "150+", label: "Successful Projects" },
    { icon: Users, value: "50+", label: "Industry Sectors" },
    { icon: TrendingUp, value: "320%", label: "Average ROI" },
    { icon: Clock, value: "99.8%", label: "On-time Delivery" }
  ];

  const industries = [
    "Healthcare", "Finance", "Manufacturing", "Retail", "Education",
    "Transportation", "Energy", "Government", "Technology", "Real Estate"
  ];

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
            <h1 className="text-3xl font-space font-bold">Project Portfolio</h1>
            <p className="text-muted-foreground">
              Discover how leading organizations have transformed their operations with our AI solutions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover-lift glass-surface border-border/50">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">Featured Case Studies</h2>
            <Button variant="outline" size="sm">
              View All Projects
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-6">
            {projects.filter(p => p.featured).map((project) => (
              <Card key={project.id} className="group hover-lift glass-surface border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {project.industry}
                        </Badge>
                        <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:gradient-text transition-all">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{project.client}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Project Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <p className="font-medium">{project.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Team Size:</span>
                          <p className="font-medium">{project.team}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Technologies Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Results & Metrics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Results</h4>
                      <div className="space-y-2">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold text-primary">{project.metrics.roi}</div>
                          <div className="text-xs text-muted-foreground">ROI</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold text-secondary">{project.metrics.satisfaction}</div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Button className="w-full bg-gradient-primary hover:shadow-glow group">
                      View Detailed Case Study
                      <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-space font-bold">All Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project) => (
              <Card key={project.id} className="group hover-lift glass-surface border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {project.industry}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:gradient-text transition-all">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-bold text-primary">{project.metrics.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-bold text-secondary">{project.metrics.users}</div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-bold text-accent">{project.metrics.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group">
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <Card className="glass-surface border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Industries We Serve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Ready to Create Your <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the growing list of organizations that have transformed their operations 
              with our AI solutions. Let's discuss your project today.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Start Your Project
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Projects;
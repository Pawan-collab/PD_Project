import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Cpu,
  Brain,
  Rocket,
  Target,
  ChevronRight,
  Hexagon,
  Network,
  Sparkles,
  Binary,
  Workflow,
  Calendar,
  FileText,
  Folder,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { projectService, Project } from "@/services/project.service";
import { articleService, Article } from "@/services/article.service";
import { eventService, EventModel } from "@/services/event.service";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fetch dynamic content
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured projects
        setIsLoadingProjects(true);
        const projects = await projectService.getFeaturedProjects(3);
        setFeaturedProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setHasError(true);
      } finally {
        setIsLoadingProjects(false);
      }

      try {
        // Fetch recent articles
        setIsLoadingArticles(true);
        const articles = await articleService.getRecentArticles(3);
        setRecentArticles(articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoadingArticles(false);
      }

      try {
        // Fetch upcoming events
        setIsLoadingEvents(true);
        const events = await eventService.getRecentUpcomingEvents(3);
        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchData();
  }, []);

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };
  const features = [
    {
      icon: Brain,
      title: "Neural Processing",
      description:
        "Advanced AI algorithms that learn and adapt to your business patterns in real-time.",
    },
    {
      icon: Shield,
      title: "Quantum Security",
      description:
        "Military-grade encryption with quantum-resistant protocols for ultimate data protection.",
    },
    {
      icon: Rocket,
      title: "Hyper Acceleration",
      description:
        "10x faster processing speeds with our proprietary neural network architecture.",
    },
    {
      icon: Network,
      title: "Neural Networks",
      description:
        "Interconnected systems that create seamless data flow across all your platforms.",
    },
  ];

  const capabilities = [
    {
      icon: Binary,
      label: "Code Generation",
      metric: "99.7%",
      description: "Accuracy Rate",
    },
    {
      icon: Workflow,
      label: "Automation",
      metric: "15x",
      description: "Speed Increase",
    },
    {
      icon: Target,
      label: "Precision",
      metric: "0.001%",
      description: "Error Rate",
    },
    {
      icon: Sparkles,
      label: "Innovation",
      metric: "24/7",
      description: "Active Learning",
    },
  ];

  const testimonials = [
    {
      quote:
        "TECH AI Solutions revolutionized our entire operation. The neural processing capabilities are beyond anything we've experienced.",
      author: "Dr. Sarah Chen",
      company: "Quantum Dynamics Corp",
      role: "Chief Technology Officer",
    },
    {
      quote:
        "The hyper-acceleration feature alone saved us millions in processing costs. This is the future of enterprise technology.",
      author: "Marcus Rodriguez",
      company: "CyberCore Industries",
      role: "Innovation Director",
    },
    {
      quote:
        "Security and performance in perfect harmony. TECH AI Solutions delivered results that exceeded our wildest expectations.",
      author: "Dr. Emily Watson",
      company: "Neural Systems Ltd",
      role: "Research Lead",
    },
  ];

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-10"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-neural rounded-full opacity-20 blur-3xl animate-neural-flow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-neon rounded-full opacity-15 blur-3xl animate-float-cyber"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full border border-primary/30 mb-8">
              <Hexagon className="w-5 h-5 text-primary animate-neural-flow" />
              <span className="text-sm font-rajdhani font-medium text-primary">
                NEXT-GEN TECHNOLOGY PLATFORM
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-orbitron font-black leading-tight">
              <span className="block text-foreground">BEYOND</span>
              <span
                className="block bg-gradient-cyber bg-clip-text text-transparent glitch"
                data-text="TOMORROW"
              >
                TOMORROW
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-rajdhani">
              Experience the convergence of artificial intelligence and quantum
              computing.
              <span className="text-primary font-medium"> AI Solutions </span>
              delivers unprecedented processing power and neural network
              capabilities that redefine what's possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link to="/solutions">
                <Button className="bg-gradient-cyber hover:shadow-neon text-lg px-8 py-4 font-rajdhani font-bold border border-primary/30 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    INITIALIZE AI Solutions
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 font-rajdhani font-bold border-primary/30 hover:bg-primary/10 hover:shadow-cyber"
                >
                  EXPLORE CAPABILITIES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-orbitron font-bold mb-6">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                CORE SYSTEMS
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-rajdhani">
              Advanced technology modules designed for maximum performance and
              scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass neon-border group hover:shadow-cyber transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300 border border-primary/20">
                    <feature.icon className="w-10 h-10 text-primary group-hover:animate-cyber-pulse" />
                  </div>
                  <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-rajdhani leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Metrics */}
      <section className="py-24 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold mb-6">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                PERFORMANCE METRICS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center group">
                <div className="glass p-8 rounded-lg border border-primary/20 hover:shadow-neural transition-all duration-300">
                  <capability.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:animate-cyber-pulse" />
                  <div className="text-4xl font-orbitron font-black text-primary mb-2 animate-neon-flicker">
                    {capability.metric}
                  </div>
                  <div className="text-lg font-rajdhani font-bold text-foreground mb-2">
                    {capability.label}
                  </div>
                  <div className="text-sm text-muted-foreground font-rajdhani">
                    {capability.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold mb-6">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                CLIENT FEEDBACK
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani">
              Testimonials from industry leaders who've experienced the AI
              Solutions advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="glass neon-border hover:shadow-cyber transition-all duration-500 hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <blockquote className="text-lg mb-8 leading-relaxed font-rajdhani text-foreground/90 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-primary/20 pt-6">
                    <p className="font-orbitron font-bold text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-accent font-rajdhani font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl font-orbitron font-bold mb-4">
                <span className="bg-gradient-neon bg-clip-text text-transparent">
                  FEATURED PROJECTS
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-rajdhani">
                Real-world implementations showcasing our technology in action
              </p>
            </div>
            <Link to="/projects">
              <Button
                variant="outline"
                className="font-rajdhani border-primary/30 hover:bg-primary/10"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoadingProjects ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground font-rajdhani">
                Loading projects...
              </span>
            </div>
          ) : featuredProjects.length === 0 ? (
            <Card className="glass border-primary/20">
              <CardContent className="p-12 text-center">
                <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-rajdhani">
                  No featured projects available at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link key={project._id} to={`/projects`}>
                  <Card className="glass neon-border hover:shadow-cyber transition-all duration-500 hover:-translate-y-2 h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center">
                          <Folder className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {project.process}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-orbitron font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground font-rajdhani mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies_used
                          ?.slice(0, 3)
                          .map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Articles & Upcoming Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-orbitron font-bold">
                  <span className="bg-gradient-cyber bg-clip-text text-transparent">
                    LATEST INSIGHTS
                  </span>
                </h2>
                <Link to="/articles">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-rajdhani text-primary hover:text-primary/80"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {isLoadingArticles ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : recentArticles.length === 0 ? (
                <Card className="glass border-primary/20">
                  <CardContent className="p-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      No articles available.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <Link key={article._id} to={`/articles/${article.slug}`}>
                      <Card className="glass border-primary/20 hover:shadow-cyber transition-all group">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-neon flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-orbitron font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                {article.title}
                              </h3>
                              <p className="text-sm text-muted-foreground font-rajdhani line-clamp-2 mb-2">
                                {article.summary}
                              </p>
                              <p className="text-xs text-primary font-rajdhani">
                                {formatDate(
                                  article.published_at?.toString() ||
                                    article.createdAt.toString()
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-orbitron font-bold">
                  <span className="bg-gradient-neon bg-clip-text text-transparent">
                    UPCOMING EVENTS
                  </span>
                </h2>
                <Link to="/events">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-rajdhani text-primary hover:text-primary/80"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {isLoadingEvents ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <Card className="glass border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      No upcoming events scheduled.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Link key={event._id} to="/events">
                      <Card className="glass border-primary/20 hover:shadow-cyber transition-all group">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-orbitron font-bold group-hover:text-primary transition-colors line-clamp-1">
                                  {event.title}
                                </h3>
                                {event.featured && (
                                  <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground font-rajdhani line-clamp-1 mb-2">
                                {event.location}
                              </p>
                              <p className="text-xs text-primary font-rajdhani">
                                {formatDate(event.date)}{" "}
                                {event.time && `• ${event.time}`}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-20"></div>
        <div className="absolute inset-0 neural-bg"></div>

        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <h2
            className="text-6xl font-orbitron font-black text-foreground mb-8 glitch"
            data-text="READY TO EVOLVE?"
          >
            READY TO EVOLVE?
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 leading-relaxed font-rajdhani max-w-4xl mx-auto">
            Join the technological revolution. Connect with{" "}
            <span className="text-primary font-bold">AI Solution</span> and
            unlock the full potential of next-generation computing systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-cyber hover:shadow-neon text-xl px-12 py-6 font-orbitron font-bold border border-primary/30 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-3">
                  <Cpu className="w-6 h-6" />
                  CONNECT NOW
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                variant="outline"
                className="text-xl px-12 py-6 font-orbitron font-bold border-primary/30 hover:bg-primary/10 hover:shadow-cyber"
              >
                VIEW CASE STUDIES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Home;

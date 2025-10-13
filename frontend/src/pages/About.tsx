import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Globe,
  Award,
  Brain,
  Lightbulb,
  Shield,
  Heart,
  ArrowUpRight,
  Sparkles,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation Leadership",
      description:
        "We pioneer the future of AI technology, constantly pushing boundaries and setting new industry standards.",
    },
    {
      icon: Users,
      title: "Human-Centered Design",
      description:
        "Our solutions enhance human capabilities rather than replace them, creating meaningful workplace experiences.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Enterprise-grade security and ethical AI practices ensure complete client confidence and data protection.",
    },
    {
      icon: Heart,
      title: "Global Impact",
      description:
        "Committed to positive transformation across industries and communities worldwide through responsible AI.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      bio: "Former head of AI Research at Google, PhD from Stanford. 15+ years leading AI initiatives for Fortune 500 companies.",
      expertise: [
        "Strategic Leadership",
        "AI Research",
        "Enterprise Solutions",
        "Team Building",
      ],
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      bio: "Ex-Microsoft AI architect with deep expertise in scalable systems. Led development of award-winning AI platforms.",
      expertise: [
        "System Architecture",
        "Machine Learning",
        "Cloud Infrastructure",
        "Technical Strategy",
      ],
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from MIT, published researcher with 60+ papers. Specialist in natural language processing.",
      expertise: [
        "NLP Research",
        "Algorithm Design",
        "Academic Partnerships",
        "Innovation",
      ],
    },
    {
      name: "James Thompson",
      role: "Head of Customer Success",
      bio: "15+ years in enterprise software implementation. Ensures successful AI adoption across all client projects.",
      expertise: [
        "Project Management",
        "Client Relations",
        "Change Management",
        "Training",
      ],
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "AI Solutions established with vision to democratize enterprise AI solutions.",
      icon: Sparkles,
    },
    {
      year: "2020",
      title: "First Enterprise Client",
      description:
        "Delivered breakthrough AI solution achieving 200% ROI for major healthcare provider.",
      icon: TrendingUp,
    },
    {
      year: "2021",
      title: "Global Expansion",
      description:
        "Expanded operations to serve clients across 25+ countries with localized solutions.",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description:
        "Named 'AI Innovation Company of the Year' by TechCrunch and Forbes.",
      icon: Award,
    },
    {
      year: "2023",
      title: "Platform Launch",
      description:
        "Released proprietary AI platform enabling rapid solution deployment at scale.",
      icon: Zap,
    },
    {
      year: "2024",
      title: "150+ Success Stories",
      description:
        "Reached milestone of 150+ successful AI implementations across diverse industries.",
      icon: Target,
    },
  ];

  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Countries Served" },
    { value: "98.7%", label: "Client Satisfaction" },
    { value: "5", label: "Years of Excellence" },
  ];

  return (
    <AppLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Heart className="w-4 h-4 mr-2" />
            About AI Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Pioneering the Future of
            <span className="block gradient-text">AI Innovation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a team of AI visionaries, engineers, and strategists dedicated
            to transforming how businesses operate through intelligent,
            human-centered solutions.
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

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover-lift glass-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To revolutionize the future of work by delivering AI solutions
                that enhance human potential, drive innovation, and create
                meaningful positive change in organizations worldwide. We
                believe AI should empower people, not replace them.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift glass-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Lightbulb className="mr-3 h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be the global leader in human-centered AI transformation,
                creating a world where artificial intelligence seamlessly
                enhances creativity, productivity, and collaboration across
                every industry and community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and shape how we
              approach client relationships and solution development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center group hover-lift glass-surface border-border/50"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all float-element">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:gradient-text transition-all">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the visionaries and experts driving innovation and excellence
              at AI Solutions. Our diverse leadership brings decades of combined
              experience in AI, technology, and business transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover-lift glass-surface border-border/50"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:gradient-text transition-all">
                        {member.name}
                      </CardTitle>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From startup vision to industry leader, discover the key
              milestones that have shaped our company and defined our impact.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-glow">
                  <milestone.icon className="h-8 w-8" />
                </div>
                <Card className="flex-1 hover-lift glass-surface border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-semibold">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;

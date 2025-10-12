import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock, Users, ExternalLink, Mic, Sparkles, TrendingUp } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      title: "AI Transformation Summit 2024",
      type: "Keynote Speaker",
      date: "September 15, 2024",
      time: "09:00 - 17:00 GMT",
      location: "ExCeL London, UK",
      description: "Dr. Sarah Mitchell will deliver the opening keynote on 'The Future of Workplace AI' at this premier industry event.",
      audience: "500+ attendees",
      status: "confirmed",
      registerLink: "#",
      topics: ["Workplace AI", "Digital Transformation", "Employee Experience"]
    },
    {
      title: "TechNorth Conference",
      type: "Panel Discussion",
      date: "October 3, 2024",
      time: "14:00 - 15:30 GMT",
      location: "Manchester Central, UK",
      description: "Join our CTO James Thompson in a panel discussion about AI implementation challenges and solutions.",
      audience: "300+ attendees",
      status: "confirmed",
      registerLink: "#",
      topics: ["AI Implementation", "Technical Challenges", "Best Practices"]
    },
    {
      title: "Global AI Ethics Forum",
      type: "Workshop Leader",
      date: "October 20, 2024",
      time: "10:00 - 16:00 CET",
      location: "Amsterdam, Netherlands",
      description: "Leading a hands-on workshop on responsible AI development and ethical considerations in workplace automation.",
      audience: "100+ participants",
      status: "confirmed",
      registerLink: "#",
      topics: ["AI Ethics", "Responsible AI", "Workplace Automation"]
    },
    {
      title: "Innovation Festival Sunderland",
      type: "Host Presentation",
      date: "November 8, 2024",
      time: "11:00 - 12:00 GMT",
      location: "Sunderland, UK",
      description: "Showcasing local AI innovation and our contribution to the Sunderland tech ecosystem.",
      audience: "200+ local innovators",
      status: "hosting",
      registerLink: "#",
      topics: ["Local Innovation", "Tech Ecosystem", "AI Showcase"]
    }
  ];

  const pastEvents = [
    {
      title: "AI Innovation Summit 2024",
      date: "March 15, 2024",
      location: "London, UK",
      description: "Successful keynote presentation on AI-powered employee experience transformation.",
      outcome: "Generated 50+ qualified leads",
      type: "Keynote"
    },
    {
      title: "Healthcare AI Conference",
      date: "February 8, 2024",
      location: "Edinburgh, UK",
      description: "Demonstrated our healthcare AI solutions to medical professionals and IT leaders.",
      outcome: "3 new healthcare partnerships",
      type: "Demo"
    },
    {
      title: "Manufacturing Tech Expo",
      date: "January 20, 2024",
      location: "Birmingham, UK",
      description: "Exhibited AI solutions for manufacturing optimization and predictive maintenance.",
      outcome: "15+ manufacturing inquiries",
      type: "Exhibition"
    },
    {
      title: "Global AI Summit",
      date: "December 5, 2023",
      location: "Virtual Event",
      description: "International presentation on the future of AI in workplace transformation.",
      outcome: "1000+ global audience reach",
      type: "Virtual Keynote"
    }
  ];

  const eventTypes = [
    {
      icon: Mic,
      title: "Speaking Engagements",
      description: "Our experts regularly speak at industry conferences and events worldwide.",
      count: "50+ per year"
    },
    {
      icon: Users,
      title: "Workshops & Training",
      description: "Interactive workshops helping organizations understand and implement AI solutions.",
      count: "25+ per year"
    },
    {
      icon: MapPin,
      title: "Industry Exhibitions",
      description: "Showcasing our latest AI innovations at major technology and industry trade shows.",
      count: "15+ per year"
    },
    {
      icon: Calendar,
      title: "Client Events",
      description: "Exclusive events for clients and partners to network and learn about AI trends.",
      count: "12+ per year"
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
              Industry Engagement
            </Badge>
            <h1 className="text-3xl font-space font-bold">Events & Speaking</h1>
            <p className="text-muted-foreground">
              Join us at industry conferences and exclusive events worldwide.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Past Events
            </Button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">Upcoming Events</h2>
            <Badge className="bg-gradient-primary text-primary-foreground">
              4 Events Scheduled
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Meet our team at these upcoming conferences and events. Register now to secure your spot 
            and learn about the latest in AI innovation.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant={event.status === "hosting" ? "default" : "secondary"}
                      className={event.status === "hosting" ? "bg-gradient-primary text-primary-foreground" : ""}
                    >
                      {event.type}
                    </Badge>
                    {event.status === "hosting" && (
                      <Badge variant="outline" className="text-accent border-accent/20">
                        We're Hosting!
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:gradient-text transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.audience}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-muted/30 px-3 py-1 rounded-full text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                    <Button className="flex-1 bg-gradient-primary hover:shadow-glow group">
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full hover-lift">
                        Meet Us There
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-space font-bold">Types of Events We Participate In</h2>
          <p className="text-muted-foreground">
            From intimate workshops to large-scale conferences, we engage with the AI community 
            in various formats to share knowledge and build connections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <Card key={index} className="text-center group hover-lift glass-surface border-border/50">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                    <type.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{type.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{type.description}</p>
                  <div className="text-primary font-semibold text-sm">{type.count}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="space-y-6">
          <h2 className="text-2xl font-space font-bold">Recent Events</h2>
          <p className="text-muted-foreground">
            Look back at our recent speaking engagements and the impact they've made 
            in the AI community and our business growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="hover-lift glass-surface border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-primary/20 text-primary">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{event.outcome}</p>
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
            <Mic className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Invite AI Solutions to Your <span className="gradient-text">Event</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking for expert speakers on AI innovation, workplace transformation, or digital evolution? 
              Our team is available for keynotes, panels, and workshops worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                  Request Speaker
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="hover-lift">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Events;
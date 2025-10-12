import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Award, Sparkles, Camera, Images } from "lucide-react";

const Gallery = () => {
  const galleryItems = [
    {
      title: "AI Innovation Summit 2024",
      category: "Conference",
      date: "March 2024",
      location: "London, UK",
      description: "Our CEO Dr. Sarah Mitchell presented cutting-edge AI solutions to industry leaders.",
      image: "conference-2024",
      type: "event"
    },
    {
      title: "TechCorp Factory Visit",
      category: "Client Visit",
      date: "February 2024",
      location: "Manchester, UK",
      description: "Implementation team visiting TechCorp's manufacturing facility for AI assistant deployment.",
      image: "factory-visit",
      type: "project"
    },
    {
      title: "Team Innovation Workshop",
      category: "Internal Event",
      date: "January 2024",
      location: "Sunderland Office",
      description: "Quarterly innovation workshop where our team explores new AI technologies and methodologies.",
      image: "workshop-2024",
      type: "team"
    },
    {
      title: "Healthcare AI Showcase",
      category: "Demo",
      date: "December 2023",
      location: "Edinburgh, UK",
      description: "Demonstrating our healthcare AI solutions at the National Healthcare Technology Conference.",
      image: "healthcare-demo",
      type: "demo"
    },
    {
      title: "Award Ceremony",
      category: "Recognition",
      date: "November 2023",
      location: "Birmingham, UK",
      description: "Receiving the 'Best AI Innovation' award at the UK Tech Excellence Awards.",
      image: "award-ceremony",
      type: "award"
    },
    {
      title: "University Collaboration",
      category: "Partnership",
      date: "October 2023",
      location: "Newcastle University",
      description: "Signing partnership agreement with Newcastle University for AI research collaboration.",
      image: "university-partnership",
      type: "partnership"
    },
    {
      title: "Global AI Conference",
      category: "Keynote",
      date: "September 2023",
      location: "San Francisco, USA",
      description: "International keynote presentation on the future of workplace AI at Global AI Conference.",
      image: "global-conference",
      type: "event"
    },
    {
      title: "Client Success Celebration",
      category: "Milestone",
      date: "August 2023",
      location: "Virtual Event",
      description: "Celebrating 50+ successful AI implementations with our valued clients worldwide.",
      image: "success-celebration",
      type: "milestone"
    },
    {
      title: "Sunderland Tech Hub Opening",
      category: "Office Launch",
      date: "July 2023",
      location: "Sunderland, UK",
      description: "Grand opening of our expanded headquarters in Sunderland's tech district.",
      image: "office-opening",
      type: "company"
    }
  ];

  const categories = ["All", "Conference", "Client Visit", "Demo", "Recognition", "Partnership", "Keynote", "Milestone"];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Visual Journey
            </Badge>
            <h1 className="text-3xl font-space font-bold">Photo Gallery</h1>
            <p className="text-muted-foreground">
              Moments from our journey - conferences, achievements, and milestone celebrations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Images className="w-4 h-4 mr-2" />
              View All
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

        {/* Gallery Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-space font-bold">Recent Moments</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Card key={index} className="group hover-lift glass-surface border-border/50 overflow-hidden">
                {/* Placeholder for image */}
                <div className="h-64 bg-gradient-primary flex items-center justify-center text-primary-foreground relative overflow-hidden">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {item.type === "event" && <Calendar className="h-8 w-8" />}
                      {item.type === "project" && <Users className="h-8 w-8" />}
                      {item.type === "team" && <Users className="h-8 w-8" />}
                      {item.type === "demo" && <MapPin className="h-8 w-8" />}
                      {item.type === "award" && <Award className="h-8 w-8" />}
                      {item.type === "partnership" && <Users className="h-8 w-8" />}
                      {item.type === "milestone" && <Award className="h-8 w-8" />}
                      {item.type === "company" && <MapPin className="h-8 w-8" />}
                    </div>
                    <p className="text-sm opacity-75">Photo: {item.image}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-gradient-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-space font-bold mb-8 text-center">Our Impact in Numbers</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-muted-foreground">Industry Awards</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">100+</div>
                <div className="text-muted-foreground">Speaking Events</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">25+</div>
                <div className="text-muted-foreground">Countries Visited</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">200+</div>
                <div className="text-muted-foreground">Events Attended</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-space font-bold mb-4">
              Want to Be Part of Our <span className="gradient-text">Story?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join us at upcoming events, invite us to speak at your conference, 
              or partner with us to create the next chapter in AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                  View Upcoming Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="hover-lift">
                  Invite Us to Speak
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Gallery;
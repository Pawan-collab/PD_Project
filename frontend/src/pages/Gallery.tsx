import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Award, Sparkles, Camera, Images, Loader2, Play } from "lucide-react";
import { galleryService, Gallery as GalleryType, GalleryCategory } from "@/services/gallery.service";

const Gallery = () => {
  const [galleries, setGalleries] = useState<GalleryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      const data = await galleryService.getAllGalleries();
      // Filter only published galleries
      const published = data.filter(g => g.published);
      setGalleries(published);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from galleries
  const categories = ["All", ...Object.values(GalleryCategory).map(cat => cat.replace(/_/g, " "))];

  // Filter galleries based on selected category
  const filteredGalleries = selectedCategory === "All"
    ? galleries
    : galleries.filter(g => g.category.replace(/_/g, " ") === selectedCategory);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

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
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="hover:shadow-md transition-all"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-space font-bold">
              {selectedCategory === "All" ? "All Gallery Items" : selectedCategory}
            </h2>
            <span className="text-muted-foreground text-sm">
              {filteredGalleries.length} {filteredGalleries.length === 1 ? "item" : "items"}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredGalleries.length === 0 ? (
            <Card className="p-12 text-center glass-surface border-border/50">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No gallery items found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All"
                  ? "No items available yet. Check back soon!"
                  : `No items in the "${selectedCategory}" category.`}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleries.map((item) => (
                <Card key={item._id} className="group hover-lift glass-surface border-border/50 overflow-hidden">
                  {/* Media Display - Image or Video */}
                  <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
                    {item.media_type === "video" ? (
                      <div className="relative h-full group">
                        <iframe
                          src={getYouTubeEmbedUrl(item.image_path)}
                          title={item.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-black/70 text-white border-0">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-full">
                        <img
                          src={galleryService.getImageUrl(item.image_path)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        {item.category.replace(/_/g, " ")}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{formatDate(item.date)}</span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-colors">
                      {item.title}
                    </h3>

                    {item.location && (
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {item.content}
                    </p>

                    {item.featured && (
                      <div className="mt-3">
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
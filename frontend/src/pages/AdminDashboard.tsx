import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Power, 
  UserCheck, 
  MessageCircle, 
  PenTool, 
  Settings,
  AtSign,
  Smartphone,
  MapPin,
  Activity,
  Award,
  Archive,
  PlusCircle,
  Search,
  Filter,
  TrendingUp,
  Users2,
  Briefcase,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    window.location.href = "/admin/login";
  };

  // Mock data - replace with real API calls
  const mockContacts = [
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      phone: "+1234567890",
      company: "Tech Corp",
      country: "USA",
      jobTitle: "CTO",
      jobDetails: "Need AI solution for customer service automation",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@startup.com",
      phone: "+1987654321",
      company: "InnovateCo",
      country: "Canada",
      jobTitle: "Product Manager",
      jobDetails: "Looking for AI-powered analytics dashboard",
      createdAt: "2024-01-14"
    }
  ];

  const mockFeedback = [
    {
      id: 1,
      name: "Alice Brown",
      email: "alice@example.com",
      rating: 5,
      comment: "Excellent AI solutions! Very professional team.",
      createdAt: "2024-01-16"
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com",
      rating: 4,
      comment: "Great service, would recommend to others.",
      createdAt: "2024-01-15"
    }
  ];

  const mockArticles = [
    {
      id: 1,
      title: "The Future of AI in Business",
      status: "published",
      createdAt: "2024-01-10",
      views: 1250
    },
    {
      id: 2,
      title: "How AI Transforms Customer Experience",
      status: "draft",
      createdAt: "2024-01-12",
      views: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Modern Sidebar Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Command Center</h1>
                <p className="text-white/80 text-sm">AI-Solutions Management Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm">System Online</span>
              </div>
              <Button onClick={handleLogout} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Power className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-card rounded-xl p-2 shadow-sm border">
            <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users2 className="w-4 h-4 mr-2" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <PenTool className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Analytics Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">+8.2%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-1">24</div>
                  <p className="text-sm text-muted-foreground">Total Inquiries</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">+12%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-1">18</div>
                  <p className="text-sm text-muted-foreground">Customer Reviews</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <PenTool className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">+3</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-1">12</div>
                  <p className="text-sm text-muted-foreground">Published Content</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Excellent</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-1">4.7</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Business Inquiries</h2>
                <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {mockContacts.map((contact) => (
                <Card key={contact.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{contact.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Briefcase className="w-3 h-3 mr-1" />
                              {contact.jobTitle}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <MapPin className="w-3 h-3 mr-1" />
                              {contact.country}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {contact.createdAt}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <AtSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Smartphone className="w-4 h-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <PenTool className="w-4 h-4" />
                            Project Requirements
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {contact.jobDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        New inquiry from {contact.company}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="hover:bg-primary/10">
                          <Search className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20">
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <p className="text-muted-foreground">Monitor customer satisfaction and feedback</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Award className="w-3 h-3 mr-1" />
                  4.7 Avg Rating
                </Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {mockFeedback.map((feedback) => (
                <Card key={feedback.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{feedback.name}</h3>
                            <p className="text-sm text-muted-foreground">{feedback.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                            {[...Array(5)].map((_, i) => (
                              <Award
                                key={i}
                                className={`w-3 h-3 ${
                                  i < feedback.rating 
                                    ? "fill-amber-400 text-amber-400" 
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="text-xs font-medium ml-1">{feedback.rating}.0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-4 relative">
                          <div className="absolute top-3 left-3 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-3 h-3 text-primary" />
                          </div>
                          <p className="text-sm leading-relaxed pl-8 italic">
                            "{feedback.comment}"
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Received on {feedback.createdAt}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="hover:bg-primary/10">
                            <Search className="w-4 h-4 mr-1" />
                            Analyze
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20">
                            <Archive className="w-4 h-4 mr-1" />
                            Archive
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Content Studio</h2>
                <p className="text-muted-foreground">Create, edit, and manage your content</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Status
                </Button>
                <Button className="bg-gradient-primary hover:shadow-glow">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Content
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {mockArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-lg flex items-center justify-center">
                          <PenTool className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge 
                              variant={article.status === "published" ? "default" : "secondary"}
                              className={article.status === "published" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                              }
                            >
                              {article.status === "published" ? "Live" : "Draft"}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {article.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            {article.views.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full ${
                          article.status === "published" ? "bg-green-500" : "bg-amber-500"
                        }`}></div>
                        {article.status === "published" ? "Published & Active" : "Draft in Progress"}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="hover:bg-primary/10">
                          <Search className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-primary/10">
                          <PenTool className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20">
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
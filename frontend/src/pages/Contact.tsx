import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Sparkles, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    jobTitle: "",
    jobDetails: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Request Submitted Successfully!",
      description: "Our team will contact you within 24 hours to discuss your requirements.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      jobTitle: "",
      jobDetails: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const countries = [
    "United Kingdom", "United States", "Canada", "Australia", "Germany", 
    "France", "Netherlands", "Sweden", "Norway", "Denmark", "Other"
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Connect With Us
            </Badge>
            <h1 className="text-3xl font-space font-bold">Get in Touch</h1>
            <p className="text-muted-foreground">
              Ready to transform your business with AI? Share your requirements and let our experts design a custom solution.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-surface border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Requirements</CardTitle>
                <p className="text-muted-foreground">
                  No account required. Just tell us about your project and we'll get back to you with a tailored solution.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleChange("jobTitle", e.target.value)}
                        placeholder="Enter your job title"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDetails">Project Details *</Label>
                    <Textarea
                      id="jobDetails"
                      value={formData.jobDetails}
                      onChange={(e) => handleChange("jobDetails", e.target.value)}
                      placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:shadow-glow group">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Requirements
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-surface border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI SOlutions<br />
                  Sunderland, United Kingdom<br />
                  Serving clients globally
                </p>
              </CardContent>
            </Card>

            <Card className="glass-surface border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We respond to all inquiries within 24 hours.<br />
                  For urgent requests, expect a response within 4 hours during business days.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-surface border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">General Inquiries</p>
                  <p className="text-muted-foreground text-sm">info@aisolutionhub.co.uk</p>
                </div>
                <div>
                  <p className="font-medium">Technical Support</p>
                  <p className="text-muted-foreground text-sm">support@aisolutionhub.co.uk</p>
                </div>
                <div>
                  <p className="font-medium">Partnerships</p>
                  <p className="text-muted-foreground text-sm">partners@aisolutionhub.co.uk</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="text-primary-foreground/90 text-sm mb-4">
                  For urgent technical issues or time-sensitive projects, our priority support team is available.
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Priority Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-space font-bold mb-8 text-center">Why Choose AI Solutions?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Fast Response</h3>
                <p className="text-muted-foreground text-sm">
                  Get expert consultation within 24 hours of your inquiry submission.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Expert Consultation</h3>
                <p className="text-muted-foreground text-sm">
                  Speak directly with AI specialists who understand your industry challenges.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Custom Solutions</h3>
                <p className="text-muted-foreground text-sm">
                  Receive tailored proposals designed specifically for your business needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Contact;
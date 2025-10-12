import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cookie, CheckCircle, Settings, BarChart, Target, Shield, XCircle, Info } from "lucide-react";
import { useState } from "react";

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false
  });

  const cookieTypes = [
    {
      icon: CheckCircle,
      title: "Strictly Necessary Cookies",
      required: true,
      description: "These cookies are essential for the website to function properly and cannot be disabled in our systems.",
      examples: [
        {
          name: "session_id",
          purpose: "Maintains your login session and authentication state",
          duration: "Session (deleted when browser closes)",
          type: "First-party"
        },
        {
          name: "csrf_token",
          purpose: "Protects against Cross-Site Request Forgery attacks",
          duration: "Session",
          type: "First-party"
        },
        {
          name: "cookie_consent",
          purpose: "Stores your cookie preferences and consent choices",
          duration: "1 year",
          type: "First-party"
        }
      ]
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      required: false,
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: [
        {
          name: "user_preferences",
          purpose: "Stores your UI preferences, theme selection, and display settings",
          duration: "1 year",
          type: "First-party"
        },
        {
          name: "language",
          purpose: "Remembers your language preference",
          duration: "6 months",
          type: "First-party"
        },
        {
          name: "dashboard_layout",
          purpose: "Saves your customized dashboard configuration",
          duration: "1 year",
          type: "First-party"
        }
      ]
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      required: false,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        {
          name: "_ga",
          purpose: "Google Analytics - distinguishes unique users",
          duration: "2 years",
          type: "Third-party (Google)"
        },
        {
          name: "_gid",
          purpose: "Google Analytics - distinguishes users within 24 hours",
          duration: "24 hours",
          type: "Third-party (Google)"
        },
        {
          name: "analytics_session",
          purpose: "Tracks page views, feature usage, and navigation patterns",
          duration: "30 minutes",
          type: "First-party"
        }
      ]
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      required: false,
      description: "These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.",
      examples: [
        {
          name: "ad_user_id",
          purpose: "Tracks user behavior for targeted advertising",
          duration: "90 days",
          type: "Third-party"
        },
        {
          name: "conversion_tracking",
          purpose: "Measures the effectiveness of marketing campaigns",
          duration: "90 days",
          type: "Third-party"
        },
        {
          name: "retargeting",
          purpose: "Enables retargeting ads on partner platforms",
          duration: "180 days",
          type: "Third-party"
        }
      ]
    }
  ];

  const handleSavePreferences = () => {
    // In a real implementation, this would save to localStorage and update the cookie settings
    console.log("Saving cookie preferences:", cookiePreferences);
    alert("Cookie preferences saved successfully!");
  };

  const lastUpdated = "January 15, 2024";

  return (
    <AppLayout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Cookie className="w-4 h-4 mr-2" />
            Cookie Policy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Cookie
            <span className="block gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about how we use cookies and similar tracking technologies to provide
            and improve our services, and how you can manage your preferences.
          </p>
          <p className="text-sm text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website.
                  They help us provide you with a better experience by remembering your preferences,
                  understanding how you use our services, and improving overall functionality.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We use both session cookies (which expire when you close your browser) and persistent
                  cookies (which remain on your device for a set period). Some cookies are set by us
                  (first-party cookies), while others are set by third-party services we use (third-party cookies).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <div className="space-y-8">
          {cookieTypes.map((category, index) => (
            <Card key={index} className="hover-lift glass-surface border-border/50">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <category.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-space font-bold">{category.title}</h2>
                      {category.required && (
                        <Badge variant="outline" className="mt-2 border-primary/30 text-primary">
                          Always Active
                        </Badge>
                      )}
                    </div>
                  </div>
                  {!category.required && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant={cookiePreferences[category.title.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences] ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const key = category.title.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences;
                          setCookiePreferences(prev => ({ ...prev, [key]: !prev[key] }));
                        }}
                      >
                        {cookiePreferences[category.title.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences] ? (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        {cookiePreferences[category.title.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences] ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 ml-18">
                  {category.description}
                </p>

                <div className="ml-18 space-y-4">
                  <h3 className="text-lg font-semibold">Examples:</h3>
                  <div className="grid gap-4">
                    {category.examples.map((cookie, idx) => (
                      <div key={idx} className="glass border border-border/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-primary mb-1">Cookie Name</p>
                            <p className="text-sm text-muted-foreground font-mono">{cookie.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary mb-1">Duration</p>
                            <p className="text-sm text-muted-foreground">{cookie.duration}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm font-semibold text-primary mb-1">Purpose</p>
                            <p className="text-sm text-muted-foreground">{cookie.purpose}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary mb-1">Type</p>
                            <p className="text-sm text-muted-foreground">{cookie.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cookie Management */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Settings className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Managing Your Cookie Preferences</h2>
            </div>

            <div className="space-y-4 ml-18">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">Browser Settings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most web browsers allow you to manage cookies through their settings. You can typically
                  find these options in the "Settings," "Options," or "Preferences" menu of your browser.
                  Here you can:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>View and delete existing cookies</li>
                  <li>Block all cookies from being set</li>
                  <li>Block third-party cookies specifically</li>
                  <li>Clear cookies when you close your browser</li>
                  <li>Create exceptions for specific websites</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">Browser-Specific Instructions</h3>
                <div className="text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                  <p><strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
                  <p><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                  <p><strong className="text-foreground">Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">Impact of Disabling Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Please note that disabling cookies may affect your experience on our website. Some features
                  may not work correctly or may be unavailable if you block certain types of cookies. Strictly
                  necessary cookies are required for basic website functionality and cannot be disabled through
                  our preference center.
                </p>
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={handleSavePreferences}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Save Cookie Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Third-Party Services</h2>
            </div>

            <div className="space-y-4 ml-18">
              <p className="text-muted-foreground leading-relaxed">
                We use the following third-party services that may set cookies on your device:
              </p>

              <div className="space-y-3">
                <div className="glass border border-border/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Google Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Used for website analytics and understanding user behavior. You can opt out of Google
                    Analytics tracking by installing the{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Social Media Platforms</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use social media plugins that may set cookies. These cookies are controlled by the
                    respective social media platforms. Please refer to their privacy policies for more information.
                  </p>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Payment Processors</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our payment processing partners may set cookies to securely process your transactions
                    and prevent fraud. These cookies are essential for payment functionality.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="glass-surface border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Questions About Cookies?</strong> If you have any
              questions about our use of cookies or this Cookie Policy, please contact us at
              privacy@aisolutions.com. We're here to help you understand and manage your privacy preferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Cookies;

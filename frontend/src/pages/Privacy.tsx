import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, UserCheck, Globe, FileText, Mail } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly, including name, email address, company name, phone number, and job title when you register for our services, request information, or communicate with us."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our services, including IP address, browser type, device information, pages visited, time spent on pages, and referring URLs."
        },
        {
          subtitle: "AI Interaction Data",
          text: "When you use our AI solutions, we may collect data about your interactions, queries, and usage patterns to improve our services and provide personalized experiences."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our AI solutions, process transactions, send service-related communications, and provide customer support."
        },
        {
          subtitle: "Personalization",
          text: "Your data helps us customize your experience, provide relevant recommendations, and tailor our services to meet your specific needs and preferences."
        },
        {
          subtitle: "Analytics & Improvement",
          text: "We analyze usage patterns to understand how our services are used, identify areas for improvement, develop new features, and enhance overall performance."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send important updates, newsletters, marketing materials, and information about new features or services you might find valuable."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL protocols. Sensitive data at rest is encrypted using AES-256 encryption."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and authentication mechanisms to ensure only authorized personnel can access your data. Multi-factor authentication is required for all administrative access."
        },
        {
          subtitle: "Regular Audits",
          text: "Our security practices undergo regular third-party audits and penetration testing to identify and address potential vulnerabilities before they can be exploited."
        },
        {
          subtitle: "Incident Response",
          text: "We maintain a comprehensive incident response plan and will notify affected users within 72 hours of discovering any data breach that may compromise personal information."
        }
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access your personal data and receive a copy in a structured, machine-readable format. You can request data export at any time through your account settings."
        },
        {
          subtitle: "Correction & Deletion",
          text: "You can update, correct, or delete your personal information at any time. Contact us at privacy@aisolutions.com to exercise these rights or use the self-service options in your account."
        },
        {
          subtitle: "Opt-Out Rights",
          text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in emails or adjusting your communication preferences in account settings."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your data only as long as necessary to provide services and fulfill legal obligations. You can request deletion of your data subject to certain legal and operational requirements."
        }
      ]
    },
    {
      icon: Globe,
      title: "International Data Transfers",
      content: [
        {
          subtitle: "Global Operations",
          text: "As a global company, we may transfer your data to countries outside your residence. We ensure all transfers comply with applicable data protection laws through appropriate safeguards."
        },
        {
          subtitle: "Standard Contractual Clauses",
          text: "We use Standard Contractual Clauses approved by the European Commission and other regulatory bodies to protect data transferred internationally."
        },
        {
          subtitle: "GDPR Compliance",
          text: "For EU residents, we fully comply with GDPR requirements, including lawful basis for processing, data minimization, and respecting all data subject rights."
        }
      ]
    },
    {
      icon: FileText,
      title: "Third-Party Services",
      content: [
        {
          subtitle: "Service Providers",
          text: "We work with trusted third-party service providers for hosting, analytics, payment processing, and customer support. All providers are contractually bound to protect your data."
        },
        {
          subtitle: "AI & Machine Learning",
          text: "We may use third-party AI and machine learning services to enhance our solutions. These providers process data according to strict confidentiality and security requirements."
        },
        {
          subtitle: "No Data Selling",
          text: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes. Your data is used solely to provide and improve our services."
        }
      ]
    }
  ];

  const lastUpdated = "January 15, 2024";

  return (
    <AppLayout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Your Privacy
            <span className="block gradient-text">Matters to Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are committed to protecting your personal information and being transparent
            about how we collect, use, and safeguard your data.
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
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AI Solutions ("we," "our," or "us") respects your privacy and is committed to protecting
                  your personal data. This privacy policy explains how we collect, use, disclose, and
                  safeguard your information when you use our AI solutions and services. Please read this
                  policy carefully to understand our practices regarding your data.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our services, you agree to the collection and use of information in accordance
                  with this policy. If you do not agree with our policies and practices, please do not use
                  our services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="hover-lift glass-surface border-border/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <section.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-space font-bold">{section.title}</h2>
                </div>
                <div className="space-y-6 ml-18">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg font-semibold text-primary">{item.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions, concerns, or requests regarding this privacy policy or
                  our data practices, please contact our Data Protection Officer:
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <p><strong className="text-foreground">Email:</strong> privacy@aisolutions.com</p>
                  <p><strong className="text-foreground">Address:</strong> AI Solutions, Sunderland, United Kingdom</p>
                  <p><strong className="text-foreground">Phone:</strong> +44 123 456 7890</p>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm pt-4">
                  We will respond to all requests within 30 days. For urgent privacy matters,
                  please mark your communication as "Urgent Privacy Matter" in the subject line.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes Notice */}
        <Card className="glass-surface border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Changes to This Policy:</strong> We may update this
              privacy policy from time to time to reflect changes in our practices or legal requirements.
              We will notify you of any material changes by posting the new policy on this page and
              updating the "Last Updated" date. Continued use of our services after changes constitutes
              acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Privacy;

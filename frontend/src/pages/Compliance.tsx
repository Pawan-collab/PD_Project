import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Shield,
  Globe,
  FileCheck,
  Scale,
  Lock,
  Users,
  Building,
  AlertCircle,
  BookOpen,
  Award,
  Download
} from "lucide-react";

const Compliance = () => {
  const complianceFrameworks = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      status: "Certified",
      description: "Comprehensive audit of our security, availability, processing integrity, confidentiality, and privacy controls.",
      details: [
        "Annual independent audits by certified CPA firms",
        "Continuous monitoring of security controls",
        "Detailed audit reports available to customers under NDA",
        "Controls aligned with Trust Services Criteria"
      ],
      validUntil: "December 2024"
    },
    {
      icon: Globe,
      title: "GDPR Compliance",
      status: "Compliant",
      description: "Full compliance with the European Union's General Data Protection Regulation for data protection and privacy.",
      details: [
        "Data Protection Impact Assessments (DPIAs) for all processing activities",
        "Data Processing Agreements (DPAs) available for all customers",
        "EU data residency options available",
        "Appointed Data Protection Officer (DPO)",
        "Mechanisms for exercising data subject rights"
      ],
      validUntil: "Ongoing"
    },
    {
      icon: FileCheck,
      title: "ISO 27001",
      status: "Certified",
      description: "International standard for information security management systems (ISMS).",
      details: [
        "Comprehensive ISMS covering all business processes",
        "Regular internal and external audits",
        "Risk assessment and treatment procedures",
        "Incident management and business continuity plans",
        "Continuous improvement methodology"
      ],
      validUntil: "March 2025"
    },
    {
      icon: Building,
      title: "CCPA Compliance",
      status: "Compliant",
      description: "Compliance with California Consumer Privacy Act protecting consumer data rights.",
      details: [
        "Clear disclosures about data collection and use",
        "Consumer rights management system",
        "Opt-out mechanisms for data sales",
        "Non-discrimination policy for privacy rights exercise",
        "Regular privacy assessments"
      ],
      validUntil: "Ongoing"
    },
    {
      icon: Lock,
      title: "HIPAA Ready",
      status: "Ready",
      description: "Infrastructure and processes capable of supporting HIPAA-compliant implementations.",
      details: [
        "Business Associate Agreements (BAAs) available",
        "HIPAA-compliant hosting infrastructure",
        "Audit logging for all PHI access",
        "Encryption of PHI at rest and in transit",
        "Access controls and authentication measures"
      ],
      validUntil: "Ongoing"
    },
    {
      icon: Award,
      title: "PCI DSS Level 1",
      status: "Certified",
      description: "Payment Card Industry Data Security Standard for secure payment processing.",
      details: [
        "Annual Qualified Security Assessor (QSA) audits",
        "Quarterly network vulnerability scans",
        "Secure payment processing infrastructure",
        "Cardholder data protection measures",
        "Comprehensive security policies and procedures"
      ],
      validUntil: "June 2024"
    }
  ];

  const dataProtection = [
    {
      title: "Data Minimization",
      description: "We collect only the data necessary to provide our services and fulfill legal obligations.",
      icon: FileCheck
    },
    {
      title: "Purpose Limitation",
      description: "Data is used only for the specific purposes disclosed at the time of collection.",
      icon: AlertCircle
    },
    {
      title: "Storage Limitation",
      description: "Personal data is retained only as long as necessary and deleted according to retention policies.",
      icon: Lock
    },
    {
      title: "Data Subject Rights",
      description: "We facilitate the exercise of rights including access, rectification, erasure, and portability.",
      icon: Users
    },
    {
      title: "Lawful Processing",
      description: "All data processing is based on valid legal grounds such as consent, contract, or legitimate interests.",
      icon: Scale
    },
    {
      title: "Cross-Border Transfers",
      description: "International data transfers use approved mechanisms like Standard Contractual Clauses.",
      icon: Globe
    }
  ];

  const industryStandards = [
    {
      category: "Healthcare",
      standards: [
        "HIPAA (Health Insurance Portability and Accountability Act)",
        "HITECH (Health Information Technology for Economic and Clinical Health Act)",
        "FDA 21 CFR Part 11 (Electronic Records and Signatures)"
      ]
    },
    {
      category: "Financial Services",
      standards: [
        "PCI DSS (Payment Card Industry Data Security Standard)",
        "SOX (Sarbanes-Oxley Act)",
        "GLBA (Gramm-Leach-Bliley Act)",
        "FINRA (Financial Industry Regulatory Authority)"
      ]
    },
    {
      category: "Government",
      standards: [
        "FedRAMP (Federal Risk and Authorization Management Program)",
        "FISMA (Federal Information Security Management Act)",
        "NIST Cybersecurity Framework"
      ]
    },
    {
      category: "International",
      standards: [
        "GDPR (General Data Protection Regulation - EU)",
        "PIPEDA (Personal Information Protection and Electronic Documents Act - Canada)",
        "LGPD (Lei Geral de Proteção de Dados - Brazil)",
        "PDPA (Personal Data Protection Act - Singapore)"
      ]
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Scale className="w-4 h-4 mr-2" />
            Compliance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Regulatory
            <span className="block gradient-text">Compliance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We maintain rigorous compliance with international regulations and industry standards
            to ensure the highest levels of data protection and security.
          </p>
        </div>

        {/* Overview */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Our Compliance Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AI Solutions is committed to meeting and exceeding regulatory requirements across all
                  jurisdictions where we operate. Our compliance program is designed to protect customer
                  data, ensure service reliability, and maintain trust through adherence to internationally
                  recognized standards and frameworks.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain active certifications, conduct regular audits, and continuously update our
                  policies and procedures to align with evolving regulations and industry best practices.
                  Our dedicated compliance team works closely with legal, security, and operational teams
                  to ensure comprehensive compliance across all aspects of our business.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Frameworks */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Certifications & Frameworks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We hold multiple certifications and maintain compliance with major regulatory frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <Card key={index} className="hover-lift glass-surface border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <framework.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-space font-bold">{framework.title}</h2>
                        <p className="text-muted-foreground">{framework.description}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        framework.status === "Certified"
                          ? "border-green-500/30 text-green-600 bg-green-500/10"
                          : "border-primary/30 text-primary bg-primary/10"
                      }
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {framework.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 ml-18">
                    {framework.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 ml-18 pt-6 border-t border-border/30">
                    <div className="text-sm text-muted-foreground">
                      Valid Until: <span className="font-semibold text-foreground">{framework.validUntil}</span>
                    </div>
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Download className="w-4 h-4 mr-2" />
                      Request Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Protection Principles */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Lock className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Data Protection Principles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-18">
              {dataProtection.map((principle, index) => (
                <div key={index} className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <principle.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry-Specific Standards */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Building className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Industry-Specific Standards</h2>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 ml-18">
              We support compliance with industry-specific regulations and can assist with implementations
              tailored to your sector's requirements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-18">
              {industryStandards.map((industry, index) => (
                <div key={index} className="glass border border-border/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">{industry.category}</h3>
                  <ul className="space-y-2">
                    {industry.standards.map((standard, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{standard}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Documentation */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileCheck className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Compliance Documentation</h2>
            </div>

            <div className="space-y-4 ml-18">
              <p className="text-muted-foreground leading-relaxed">
                We provide comprehensive documentation to support your compliance needs and due diligence processes:
              </p>

              <div className="grid gap-4">
                <div className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">SOC 2 Type II Report</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive audit report of our security and compliance controls
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                  </div>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Data Processing Agreement (DPA)</h3>
                      <p className="text-sm text-muted-foreground">
                        GDPR-compliant DPA template for customer agreements
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Associate Agreement (BAA)</h3>
                      <p className="text-sm text-muted-foreground">
                        HIPAA-compliant BAA for healthcare organizations
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                  </div>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Security Whitepaper</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed overview of our security architecture and practices
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Penetration Test Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Executive summary of third-party security assessments
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8 text-center">
            <Scale className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-3xl font-space font-bold mb-6">
              Have Compliance <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our compliance team is here to help with your regulatory requirements, answer questions
              about our certifications, and provide documentation for your due diligence processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                <FileCheck className="w-5 h-5 mr-2" />
                Contact Compliance Team
              </Button>
              <Button variant="outline" size="lg" className="hover-lift">
                <Download className="w-5 h-5 mr-2" />
                Request Documentation
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Email: compliance@aisolutions.com | Phone: +44 123 456 7890
            </p>
          </CardContent>
        </Card>

        {/* Updates Notice */}
        <Card className="glass-surface border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Compliance Updates:</strong> We continuously monitor
              regulatory changes and update our compliance program accordingly. This page reflects our
              current compliance status as of January 2024. For the most up-to-date information about
              specific certifications or compliance frameworks, please contact our compliance team.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Compliance;

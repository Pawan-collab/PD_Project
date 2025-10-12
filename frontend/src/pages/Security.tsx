import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Key,
  Server,
  AlertTriangle,
  CheckCircle,
  Eye,
  FileCheck,
  Users,
  Activity,
  Bug,
  Mail
} from "lucide-react";

const Security = () => {
  const securityMeasures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "We implement industry-leading encryption standards to protect your data at every stage.",
      measures: [
        {
          name: "Transport Layer Security (TLS 1.3)",
          description: "All data transmitted between your browser and our servers is encrypted using TLS 1.3, the latest and most secure version of the protocol."
        },
        {
          name: "AES-256 Encryption at Rest",
          description: "All sensitive data stored in our databases is encrypted using AES-256, a military-grade encryption standard approved by the NSA."
        },
        {
          name: "End-to-End Encryption",
          description: "For highly sensitive communications, we offer end-to-end encryption ensuring only you and intended recipients can access the content."
        },
        {
          name: "Secure Key Management",
          description: "Encryption keys are stored in hardware security modules (HSMs) and rotated regularly according to best practices."
        }
      ]
    },
    {
      icon: Key,
      title: "Access Control & Authentication",
      description: "Multiple layers of authentication and authorization protect against unauthorized access.",
      measures: [
        {
          name: "Multi-Factor Authentication (MFA)",
          description: "We require MFA for all user accounts and administrative access, supporting authenticator apps, SMS, and hardware tokens."
        },
        {
          name: "Role-Based Access Control (RBAC)",
          description: "Granular permission systems ensure users can only access data and features necessary for their role."
        },
        {
          name: "Single Sign-On (SSO)",
          description: "Enterprise SSO integration with SAML 2.0 and OAuth 2.0 support for seamless and secure authentication."
        },
        {
          name: "Session Management",
          description: "Secure session handling with automatic timeout, secure cookies, and protection against session hijacking."
        }
      ]
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Our infrastructure is built on secure, redundant systems with multiple layers of protection.",
      measures: [
        {
          name: "Cloud Security",
          description: "Services hosted on AWS/Azure with SOC 2 Type II certified infrastructure, leveraging cloud-native security features."
        },
        {
          name: "Network Segmentation",
          description: "Production environments are isolated using virtual private clouds (VPCs) with strict network access controls."
        },
        {
          name: "DDoS Protection",
          description: "Advanced DDoS mitigation services protect against volumetric, protocol, and application-layer attacks."
        },
        {
          name: "Backup & Disaster Recovery",
          description: "Automated daily backups with geo-redundant storage and tested disaster recovery procedures ensuring 99.9% uptime."
        }
      ]
    },
    {
      icon: Eye,
      title: "Monitoring & Detection",
      description: "24/7 security monitoring and threat detection systems protect against emerging threats.",
      measures: [
        {
          name: "Security Information and Event Management (SIEM)",
          description: "Real-time log analysis and correlation to detect suspicious activities and security incidents."
        },
        {
          name: "Intrusion Detection & Prevention",
          description: "Advanced IDS/IPS systems monitor network traffic for malicious activity and automatically block threats."
        },
        {
          name: "Anomaly Detection",
          description: "Machine learning algorithms identify unusual patterns that may indicate security breaches or insider threats."
        },
        {
          name: "Security Operations Center (SOC)",
          description: "Dedicated security team monitoring systems 24/7/365 to respond to incidents within minutes."
        }
      ]
    },
    {
      icon: FileCheck,
      title: "Compliance & Auditing",
      description: "Regular audits and compliance certifications ensure we meet the highest security standards.",
      measures: [
        {
          name: "Third-Party Security Audits",
          description: "Annual penetration testing and security assessments conducted by independent cybersecurity firms."
        },
        {
          name: "Compliance Certifications",
          description: "SOC 2 Type II, ISO 27001, GDPR, and industry-specific compliance certifications maintained and updated regularly."
        },
        {
          name: "Audit Logging",
          description: "Comprehensive audit trails of all system access and data modifications, retained for 7 years."
        },
        {
          name: "Vulnerability Management",
          description: "Automated vulnerability scanning and patching processes with critical patches applied within 24 hours."
        }
      ]
    },
    {
      icon: Users,
      title: "Employee Security",
      description: "Our team follows strict security protocols and undergoes regular training.",
      measures: [
        {
          name: "Security Training",
          description: "Mandatory security awareness training for all employees covering phishing, social engineering, and data protection."
        },
        {
          name: "Background Checks",
          description: "Comprehensive background verification for all employees with access to sensitive systems and data."
        },
        {
          name: "Least Privilege Principle",
          description: "Employees are granted only the minimum access necessary to perform their job functions."
        },
        {
          name: "Secure Development Practices",
          description: "Security-first development methodology with code reviews, static analysis, and security testing integrated into CI/CD."
        }
      ]
    }
  ];

  const bestPractices = [
    {
      title: "Use Strong, Unique Passwords",
      description: "Create complex passwords with at least 12 characters including uppercase, lowercase, numbers, and symbols. Never reuse passwords across services.",
      icon: Key
    },
    {
      title: "Enable Multi-Factor Authentication",
      description: "Always enable MFA on your account. Use authenticator apps rather than SMS when possible for enhanced security.",
      icon: Shield
    },
    {
      title: "Keep Software Updated",
      description: "Regularly update your browser, operating system, and security software to protect against known vulnerabilities.",
      icon: Activity
    },
    {
      title: "Be Cautious with Emails",
      description: "Watch for phishing attempts. We will never ask for your password via email. Verify sender addresses before clicking links.",
      icon: Mail
    },
    {
      title: "Use Secure Networks",
      description: "Avoid accessing sensitive information on public Wi-Fi. Use a VPN when working remotely or on untrusted networks.",
      icon: Server
    },
    {
      title: "Report Suspicious Activity",
      description: "If you notice any unusual account activity or potential security issues, report it immediately to security@aisolutions.com.",
      icon: AlertTriangle
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", description: "Service Organization Control certification for security, availability, and confidentiality" },
    { name: "ISO 27001", description: "International standard for information security management systems" },
    { name: "GDPR Compliant", description: "Full compliance with European data protection regulations" },
    { name: "CCPA Compliant", description: "Compliance with California Consumer Privacy Act" },
    { name: "HIPAA Ready", description: "Infrastructure capable of supporting HIPAA-compliant implementations" },
    { name: "PCI DSS", description: "Payment Card Industry Data Security Standard for payment processing" }
  ];

  return (
    <AppLayout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-primary text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </Badge>
          <h1 className="text-4xl md:text-6xl font-space font-bold">
            Enterprise-Grade
            <span className="block gradient-text">Security</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your data security and privacy are our top priorities. Learn about the comprehensive
            security measures we implement to protect your information.
          </p>
        </div>

        {/* Security Commitment */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Our Security Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At AI Solutions, security is not an afterthought—it's fundamental to everything we do.
                  We implement defense-in-depth strategies with multiple layers of security controls to
                  protect your data from unauthorized access, disclosure, alteration, and destruction.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our security program is built on industry best practices and compliance frameworks,
                  continuously updated to address emerging threats and evolving security standards.
                  We invest significantly in security infrastructure, processes, and people to ensure
                  your data remains safe and secure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Measures */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Security Measures</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We implement comprehensive security controls across all layers of our infrastructure and applications.
            </p>
          </div>

          {securityMeasures.map((category, index) => (
            <Card key={index} className="hover-lift glass-surface border-border/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <category.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-space font-bold">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-4 ml-18">
                  {category.measures.map((measure, idx) => (
                    <div key={idx} className="glass border border-border/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{measure.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{measure.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileCheck className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Certifications & Compliance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-18">
              {certifications.map((cert, index) => (
                <div key={index} className="glass border border-border/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-space font-bold mb-4">Security Best Practices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these guidelines to help keep your account and data secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="hover-lift glass-surface border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <practice.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vulnerability Reporting */}
        <Card className="glass-surface border-border/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Bug className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-space font-bold">Responsible Disclosure</h2>
            </div>

            <div className="space-y-4 ml-18">
              <p className="text-muted-foreground leading-relaxed">
                We value the security research community and welcome reports of potential vulnerabilities.
                If you believe you've found a security issue in our systems, please report it responsibly:
              </p>

              <div className="glass border border-border/30 rounded-lg p-6 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How to Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Email detailed information to <strong className="text-primary">security@aisolutions.com</strong> with
                    subject line "Security Vulnerability Report"
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">What to Include</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Description of the vulnerability and its potential impact</li>
                    <li>Steps to reproduce the issue</li>
                    <li>Proof of concept (if available)</li>
                    <li>Your contact information for follow-up</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Our Commitment</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Acknowledge receipt within 24 hours</li>
                    <li>Provide status updates every 7 days</li>
                    <li>Credit researchers in our security acknowledgments (if desired)</li>
                    <li>Work with you to understand and address the issue</li>
                  </ul>
                </div>

                <div className="pt-3">
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    <Bug className="w-4 h-4 mr-2" />
                    Report Security Issue
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="relative overflow-hidden glass-surface border-border/50">
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
          <CardContent className="relative p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Security Questions?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For general security questions or concerns, please contact our security team at
                  security@aisolutions.com. For urgent security incidents, call our 24/7 security
                  hotline at +44 123 456 7890.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Security;

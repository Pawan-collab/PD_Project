import { useState } from "react";
import { Link } from "react-router-dom";
import { Hexagon, Zap, Mail, Send, MapPin, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  const footerLinks = {
    product: [
      { name: "AI Virtual Assistant", path: "/solutions#ai-virtual-assistant" },
      { name: "Rapid Prototyping", path: "/solutions#rapid-prototyping" },
      { name: "Digital Innovation", path: "/solutions#digital-innovation" },
      { name: "Process Automation", path: "/solutions#process-automation" },
      { name: "All Solutions", path: "/solutions" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Projects", path: "/projects" },
      { name: "Gallery", path: "/gallery" },
      { name: "Events", path: "/events" },
      { name: "Careers", path: "/about" },
    ],
    resources: [
      { name: "Articles", path: "/articles" },
      { name: "Feedback", path: "/feedback" },
      { name: "Help Center", path: "/contact" },
      { name: "API Documentation", path: "/articles" },
      { name: "Community", path: "/events" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Security", path: "/security" },
      { name: "Compliance", path: "/compliance" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com", label: "LinkedIn" },
    { name: "Twitter", href: "https://twitter.com", label: "Twitter" },
    { name: "GitHub", href: "https://github.com", label: "GitHub" },
    { name: "Email", href: "mailto:info@aisolutions.com", label: "Email", icon: Mail },
  ];

  return (
    <footer className="glass-surface border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-border/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-orbitron font-bold mb-2 gradient-text">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Subscribe to our newsletter for the latest AI insights, product updates, and industry trends.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background/50 border-primary/20 focus:border-primary"
                required
              />
              <Button type="submit" className="bg-gradient-cyber hover:shadow-neon font-rajdhani">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Hexagon className="w-8 h-8 text-primary animate-neural-flow" />
                <div className="absolute inset-0">
                  <Zap className="w-4 h-4 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <h3 className="text-lg font-bold gradient-text group-hover:animate-neon-flicker">
                AI Solutions
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming businesses worldwide through intelligent AI solutions and innovation.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-neon transition-all"
                  aria-label={social.label}
                >
                  {social.icon ? (
                    <social.icon className="w-4 h-4" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Sunderland, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+44 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground font-space text-sm">
              Product
            </h4>
            <div className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <Link
                  key={`product-${link.name}-${index}`}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground font-space text-sm">
              Company
            </h4>
            <div className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <Link
                  key={`company-${link.name}-${index}`}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground font-space text-sm">
              Resources
            </h4>
            <div className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <Link
                  key={`resources-${link.name}-${index}`}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground font-space text-sm">
              Legal
            </h4>
            <div className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={`legal-${link.name}-${index}`}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center gap-4">
              <p>&copy; {new Date().getFullYear()} AI Solutions. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></span>
                <span>System Status: Operational</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

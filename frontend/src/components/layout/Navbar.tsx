import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hexagon, Zap, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuStructure = {
    products: {
      label: "Products",
      items: [
        { name: "AI Solutions", path: "/solutions", description: "Explore our AI-powered solutions" },
        { name: "Projects", path: "/projects", description: "View our successful implementations" },
      ],
    },
    company: {
      label: "Company",
      items: [
        { name: "About Us", path: "/about", description: "Learn about our mission" },
        { name: "Gallery", path: "/gallery", description: "See our journey in pictures" },
        { name: "Events", path: "/events", description: "Join our upcoming events" },
      ],
    },
    resources: {
      label: "Resources",
      items: [
        { name: "Articles", path: "/articles", description: "Read our latest insights" },
        { name: "Feedback", path: "/feedback", description: "Share your experience" },
      ],
    },
  };

  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="w-full glass border-b border-primary/20 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-primary animate-neural-flow" />
            <div className="absolute inset-0 animate-cyber-pulse">
              <Zap className="w-4 h-4 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <span className="text-xl font-orbitron font-bold bg-gradient-cyber bg-clip-text text-transparent group-hover:animate-neon-flicker">
            AI Solutions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {Object.entries(menuStructure).map(([key, menu]) => (
            <div
              key={key}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-foreground/80 hover:text-primary transition-colors font-rajdhani font-medium rounded-md hover:bg-primary/5",
                  openDropdown === key && "text-primary bg-primary/5"
                )}
              >
                {menu.label}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === key && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu - Fixed positioning with background */}
              {openDropdown === key && (
                <div className="absolute top-full left-0 pt-1 w-64">
                  <div className="bg-background/95 backdrop-blur-xl rounded-lg border border-primary/20 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {menu.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "block px-4 py-3 hover:bg-primary/10 transition-colors border-b border-border/30 last:border-0",
                          location.pathname === item.path && "bg-primary/5"
                        )}
                      >
                        <div className="font-rajdhani font-semibold text-foreground">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* CTAs */}
          <Link to="/contact">
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 font-rajdhani">
              Contact Sales
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary hover:bg-primary/10"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-background/95 backdrop-blur-xl rounded-lg border border-primary/20 p-4 animate-slide-neon">
          <div className="flex flex-col space-y-2">
            {Object.entries(menuStructure).map(([key, menu]) => (
              <div key={key} className="space-y-1">
                <button
                  onClick={() => handleDropdownToggle(key)}
                  className="w-full flex items-center justify-between px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors font-rajdhani font-medium rounded-md"
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      openDropdown === key && "rotate-180"
                    )}
                  />
                </button>
                {openDropdown === key && (
                  <div className="pl-4 space-y-1 bg-muted/30 rounded-lg p-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-2 rounded-md text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors",
                          location.pathname === item.path && "text-primary bg-primary/10"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-2 border-t border-border/30">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 font-rajdhani">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

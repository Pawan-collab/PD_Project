import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hexagon, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Solutions", path: "/solutions" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Articles", path: "/articles" },
    { name: "Feedback", path: "/feedback" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="w-full glass border-b border-primary/20 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
              AI SOLUTIONS 
            <div className="relative">
              <Hexagon className="w-8 h-8 text-primary animate-neural-flow" />
              <div className="absolute inset-0 animate-cyber-pulse">
                <Zap className="w-4 h-4 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <span className="text-2xl font-orbitron font-bold bg-gradient-cyber bg-clip-text text-transparent group-hover:animate-neon-flicker">
              AI Solutions
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-foreground/80 hover:text-primary transition-cyber font-rajdhani font-medium relative group py-2",
                location.pathname === item.path && "text-primary"
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {location.pathname === item.path && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-cyber animate-slide-neon"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-cyber scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
          
          <Link to="/contact">
            <Button className="bg-gradient-cyber hover:shadow-neon font-rajdhani font-medium border border-primary/30 relative overflow-hidden group">
              <span className="relative z-10">CONNECT</span>
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary hover:bg-primary/10"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 glass rounded-lg border border-primary/20 p-4 animate-slide-neon">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-cyber font-rajdhani font-medium py-2 px-4 rounded-md",
                  location.pathname === item.path && "text-primary bg-primary/10"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-cyber hover:shadow-neon font-rajdhani font-medium">
                CONNECT
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
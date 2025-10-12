import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Lightbulb, 
  FolderOpen, 
  Camera, 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  Mail,
  Settings,
  ChevronRight,
  Layers
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/home", 
      icon: LayoutDashboard,
      description: "Overview & Analytics"
    },
    { 
      name: "Solutions", 
      path: "/solutions", 
      icon: Lightbulb,
      description: "AI-Powered Services"
    },
    { 
      name: "Projects", 
      path: "/projects", 
      icon: FolderOpen,
      description: "Case Studies & Work"
    },
    { 
      name: "Gallery", 
      path: "/gallery", 
      icon: Camera,
      description: "Visual Portfolio"
    },
    { 
      name: "Events", 
      path: "/events", 
      icon: Calendar,
      description: "Workshops & Meetups"
    },
    { 
      name: "Articles", 
      path: "/articles", 
      icon: FileText,
      description: "Insights & Knowledge"
    },
    { 
      name: "Feedback", 
      path: "/feedback", 
      icon: MessageSquare,
      description: "Client Reviews"
    },
    { 
      name: "About", 
      path: "/about", 
      icon: User,
      description: "Our Story & Team"
    },
  ];

  return (
    <div className={cn(
      "sidebar-nav glass-surface transition-all duration-300",
      isCollapsed ? "w-16" : "w-[280px]"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo & Brand */}
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Layers className="w-8 h-8 text-primary animate-rotate-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10 animate-pulse-glow" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-space font-bold gradient-text">
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  AI Solutions Platform
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-3 py-3 rounded-xl transition-spring relative overflow-hidden",
                location.pathname === item.path 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors flex-shrink-0",
                location.pathname === item.path && "text-primary"
              )} />
              
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </div>
                  
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform opacity-0 group-hover:opacity-100",
                    location.pathname === item.path && "opacity-100 text-primary"
                  )} />
                </>
              )}

              {location.pathname === item.path && (
                <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-xl" />
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/contact"
            className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-spring group"
          >
            <Mail className="w-5 h-5" />
            {!isCollapsed && (
              <span className="font-medium">Contact Us</span>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-spring w-full"
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && (
              <span className="text-sm">Collapse</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
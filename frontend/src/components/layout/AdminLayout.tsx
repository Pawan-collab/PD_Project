/**
 * Admin Layout Component
 * Provides consistent layout with sidebar navigation for all admin pages
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services/admin.service";
import {
  LayoutDashboard,
  Users2,
  MessageCircle,
  PenTool,
  Image as ImageIcon,
  Settings,
  Power,
  Menu,
  X,
  TrendingUp,
  ChevronLeft,
  Shield,
  Bell,
  FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navigation: NavItem[] = [
  { name: "Inquiries", href: "/admin/contacts", icon: Users2 },
  { name: "Feedback", href: "/admin/feedback", icon: MessageCircle },
  { name: "Articles", href: "/admin/articles", icon: PenTool },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await adminService.logout();

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });

      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      toast({
        title: "Logged Out",
        description: "You have been logged out.",
      });

      navigate("/admin/login", { replace: true });
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background neural-bg">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r glass border-primary/20 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo/Header */}
        <div className="flex h-16 items-center justify-between border-b border-primary/20 px-4">
          {!collapsed && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-cyber border border-primary/30">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-orbitron font-bold bg-gradient-cyber bg-clip-text text-transparent group-hover:animate-neon-flicker">
                Admin Panel
              </span>
            </Link>
          )}

          {/* Collapse toggle (desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>

          {/* Close button (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-rajdhani font-medium transition-all hover:bg-primary/10 hover:shadow-cyber",
                    isActive
                      ? "bg-gradient-cyber text-white shadow-neon border border-primary/30"
                      : "text-foreground/80 hover:text-primary",
                    collapsed && "justify-center"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive && "text-white"
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User section */}
        <div className="border-t border-primary/20 p-4">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-primary/30">
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback className="bg-gradient-cyber text-white font-orbitron">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-rajdhani font-medium text-foreground">
                    Admin User
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full justify-start font-rajdhani text-red-400 hover:text-red-300 hover:bg-red-950/20 border-red-400/30"
              >
                <Power className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-950/20"
              title="Logout"
            >
              <Power className="h-5 w-5" />
            </Button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-primary/20 glass px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary hover:bg-primary/10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground/80 hover:text-primary hover:bg-primary/10"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </Button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

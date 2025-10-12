import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 glass rounded-full flex items-center justify-center border border-primary/20">
              <AlertCircle className="w-12 h-12 text-primary animate-cyber-pulse" />
            </div>
          </div>
          <h1 className="text-6xl font-orbitron font-bold bg-gradient-cyber bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-rajdhani text-muted-foreground mb-4">
            Oops! Page not found
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-gradient-cyber hover:shadow-neon font-rajdhani font-medium border border-primary/30 mt-4">
              <Home className="w-4 h-4 mr-2" />
              RETURN HOME
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

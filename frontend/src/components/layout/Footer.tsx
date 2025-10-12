import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI_SOLUTIONS
            </h3>
            <p className="text-muted-foreground text-sm">
              Revolutionizing the digital employee experience through AI-powered solutions and innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Solutions</h4>
            <div className="space-y-2 text-sm">
              <Link to="/solutions" className="block text-muted-foreground hover:text-foreground transition-colors">
                AI Virtual Assistant
              </Link>
              <Link to="/solutions" className="block text-muted-foreground hover:text-foreground transition-colors">
                Rapid Prototyping
              </Link>
              <Link to="/solutions" className="block text-muted-foreground hover:text-foreground transition-colors">
                Digital Innovation
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/projects" className="block text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/articles" className="block text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/events" className="block text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link to="/feedback" className="block text-muted-foreground hover:text-foreground transition-colors">
                Feedback
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI_SOLUTIONS. All rights reserved. | Based in Sunderland, UK
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "@/components/ChatBot";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navbar />
      <main className={cn("max-w-7xl mx-auto px-6 py-12", className)}>
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default AppLayout;
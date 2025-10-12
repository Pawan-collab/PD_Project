import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <main className={cn("main-content", className)}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
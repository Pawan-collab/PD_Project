/**
 * Project Preview Modal Component
 * Displays project details in a preview format
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Building2,
  Users,
  Clock,
  Target,
  Code,
  CheckCircle,
  Eye,
  EyeOff,
  Award,
  Palette,
} from "lucide-react";
import { Project } from "@/services/project.service";

interface ProjectPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export default function ProjectPreviewModal({
  open,
  onOpenChange,
  project,
}: ProjectPreviewModalProps) {
  if (!project) return null;

  const getProcessColor = (process: string) => {
    switch (process) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "Ongoing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Featured":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      case "Popular":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "New":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400";
      case "Enterprise":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400";
      default:
        return "";
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Project Preview</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getProcessColor(project.process)}>
                  {project.process.toUpperCase()}
                </Badge>
                {project.badge && (
                  <Badge className={getBadgeColor(project.badge)}>
                    <Award className="h-3 w-3 mr-1" />
                    {project.badge}
                  </Badge>
                )}
                <Badge variant="outline">
                  <Palette className="h-3 w-3 mr-1" />
                  {project.color}
                </Badge>
                {project.isActive ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <Eye className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {project.icon.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <p className="text-sm">{project.company_name}</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            <Separator />

            {/* Project Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{project.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="font-medium">{project.team_size}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(project.created_at)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Key Results Section */}
            {project.key_results && project.key_results.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Key Results</h3>
                  </div>
                  <div className="space-y-2">
                    {project.key_results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Technologies Used Section */}
            {project.technologies_used && project.technologies_used.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Technologies Used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies_used.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Project Dates */}
            {project.date && project.date.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Project Timeline</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.date.map((dateStr, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {dateStr}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Project Metadata */}
            <div className="space-y-2 text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-sm mb-3">Project Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <span className="font-medium">Project ID:</span> {project._id}
                </p>
                <p>
                  <span className="font-medium">Icon:</span> {project.icon}
                </p>
                <p>
                  <span className="font-medium">Color Theme:</span> {project.color}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {project.isActive ? "Active" : "Inactive"}
                </p>
                <p className="md:col-span-2">
                  <span className="font-medium">Created On:</span> {formatDate(project.created_at)}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

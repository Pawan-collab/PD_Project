/**
 * Admin Projects Management Page
 */

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Building2,
  CheckCircle,
  Clock,
  Users,
  EyeOff,
} from "lucide-react";
import CreateProjectModal from "@/components/admin/CreateProjectModal";
import EditProjectModal from "@/components/admin/EditProjectModal";
import ProjectPreviewModal from "@/components/admin/ProjectPreviewModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { projectService, Project } from "@/services/project.service";
import { useToast } from "@/hooks/use-toast";

export default function AdminProjects() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProcess, setFilterProcess] = useState("all");
  const [filterVisibility, setFilterVisibility] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while fetching projects.";
      toast({
        title: "Failed to Fetch Projects",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate stats from actual data
  const stats = [
    {
      label: "Total Projects",
      value: (projects?.length || 0).toString(),
      icon: FolderKanban,
      change: "+12%",
    },
    {
      label: "Completed",
      value: (projects?.filter((p) => p.process === "Completed").length || 0).toString(),
      icon: CheckCircle,
      change: "+8%",
    },
    {
      label: "Ongoing",
      value: (projects?.filter((p) => p.process === "Ongoing").length || 0).toString(),
      icon: Clock,
      change: "+4",
    },
    {
      label: "Active Projects",
      value: (projects?.filter((p) => p.isActive).length || 0).toString(),
      icon: Building2,
      change: "+6",
    },
  ];

  // Filter projects based on search and filters
  const filteredProjects = (projects || []).filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProcess =
      filterProcess === "all" || project.process === filterProcess;
    const matchesVisibility =
      filterVisibility === "all" ||
      (filterVisibility === "active" && project.isActive) ||
      (filterVisibility === "inactive" && !project.isActive);
    return matchesSearch && matchesProcess && matchesVisibility;
  });

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

  // Handler functions
  const handlePreview = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;

    try {
      await projectService.deleteProject(selectedProject._id);
      toast({
        title: "Project Deleted",
        description: `"${selectedProject.title}" has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete project.";
      toast({
        title: "Delete Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    try {
      await projectService.toggleProjectVisibility(project._id, !project.isActive);
      toast({
        title: "Visibility Updated",
        description: `Project is now ${!project.isActive ? "active" : "inactive"}.`,
      });
      fetchProjects();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update visibility.";
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Project Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and manage your projects
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-primary/80"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span
                      className={
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {stat.change}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterProcess} onValueChange={setFilterProcess}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by process" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Process</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterVisibility} onValueChange={setFilterVisibility}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Loading projects...
                </p>
              </CardContent>
            </Card>
          ) : filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  {searchQuery || filterProcess !== "all" || filterVisibility !== "all"
                    ? "No projects found matching your filters."
                    : "No projects yet. Create your first project!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <Card
                key={project._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex-shrink-0">
                        <FolderKanban className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {project.title}
                          </h3>
                          {!project.isActive && (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <Building2 className="inline h-3 w-3 mr-1" />
                          {project.company_name}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getProcessColor(project.process)}>
                            {project.process}
                          </Badge>
                          {project.badge && (
                            <Badge className={getBadgeColor(project.badge)}>
                              {project.badge}
                            </Badge>
                          )}
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {project.team_size}
                          </Badge>
                          <Badge variant="outline">{project.duration}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>
                          Technologies: {project.technologies_used.slice(0, 3).join(", ")}
                          {project.technologies_used.length > 3 && ` +${project.technologies_used.length - 3} more`}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleVisibility(project)}
                        title={project.isActive ? "Hide project" : "Show project"}
                      >
                        {project.isActive ? (
                          <EyeOff className="mr-2 h-4 w-4" />
                        ) : (
                          <Eye className="mr-2 h-4 w-4" />
                        )}
                        {project.isActive ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(project)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => handleDelete(project)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Modals */}
        <CreateProjectModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSuccess={fetchProjects}
        />

        <EditProjectModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          project={selectedProject}
          onSuccess={fetchProjects}
        />

        <ProjectPreviewModal
          open={isPreviewModalOpen}
          onOpenChange={setIsPreviewModalOpen}
          project={selectedProject}
        />

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete Project?"
          itemName={selectedProject?.title}
        />
      </div>
    </AdminLayout>
  );
}

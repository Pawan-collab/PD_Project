import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2, EyeOff } from "lucide-react";
import { solutionService, Solution } from "@/services/solution.service";
import { useToast } from "@/hooks/use-toast";
import CreateSolutionModal from "@/components/admin/CreateSolutionModal";
import EditSolutionModal from "@/components/admin/EditSolutionModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

export default function AdminSolutions() {
  const { toast } = useToast();

  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Solution | null>(null);

  const fetchSolutions = async () => {
    try {
      setIsLoading(true);
      const data = await solutionService.getAllSolutions();
      setSolutions(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch solutions.";
      toast({
        title: "Failed to load",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = async (s: Solution) => {
    try {
      await solutionService.toggleSolutionVisibility(s._id, !s.isActive);
      toast({ title: "Visibility updated" });
      fetchSolutions();
    } catch (error) {
      toast({
        title: "Update failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await solutionService.deleteSolution(toDelete._id);
      toast({ title: "Solution deleted" });
      setIsDeleteOpen(false);
      setToDelete(null);
      fetchSolutions();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Solution Management</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit and manage solutions
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-primary/80"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Solution
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground">
                Loading solutions...
              </p>
            ) : solutions.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No solutions yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {solutions.map((s) => {
                  const colorMap: Record<string, string> = {
                    primary: "from-primary to-primary/80",
                    secondary: "from-secondary to-secondary/70",
                    accent: "from-accent to-accent/70",
                  };

                  const gradient = colorMap[s.color] || colorMap.primary;

                  return (
                    <Card
                      key={s._id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div
                            className={`flex w-full h-40 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm flex-shrink-0`}
                          >
                            <span className="text-xs font-light px-1 items-center justify-center flex">
                              {s.icon}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold leading-tight truncate">
                                  {s.title}
                                </h3>
                                {s.badge && (
                                  <Badge className="text-xs px-2 py-1">
                                    {s.badge}
                                  </Badge>
                                )}
                              </div>

                              {!s.isActive && (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                              {s.description}
                            </p>

                            {s.features && s.features.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {s.features.slice(0, 6).map((f, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs"
                                  >
                                    {f}
                                  </span>
                                ))}
                                {s.features.length > 6 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{s.features.length - 6} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggle(s)}
                            >
                              {s.isActive ? (
                                <EyeOff className="mr-2 h-4 w-4" />
                              ) : (
                                <Eye className="mr-2 h-4 w-4" />
                              )}
                              <span className="text-sm">
                                {s.isActive ? "Hide" : "Show"}
                              </span>
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedSolution(s);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setToDelete(s);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <CreateSolutionModal
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSuccess={fetchSolutions}
        />
        <EditSolutionModal
          open={isEditOpen}
          onOpenChange={(v) => {
            if (!v) setSelectedSolution(null);
            setIsEditOpen(v);
          }}
          solution={selectedSolution}
          onSuccess={fetchSolutions}
        />
        <DeleteConfirmDialog
          open={isDeleteOpen}
          onOpenChange={(v) => {
            if (!v) setToDelete(null);
            setIsDeleteOpen(v);
          }}
          onConfirm={handleDelete}
          title="Delete Solution?"
          itemName={toDelete?.title}
        />
      </div>
    </AdminLayout>
  );
}

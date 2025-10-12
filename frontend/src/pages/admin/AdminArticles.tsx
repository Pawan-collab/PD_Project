/**
 * Admin Articles/Content Management Page
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
  PenTool,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import CreateArticleModal from "@/components/admin/CreateArticleModal";
import EditArticleModal from "@/components/admin/EditArticleModal";
import ArticlePreviewModal from "@/components/admin/ArticlePreviewModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { articleService, Article } from "@/services/article.service";
import { useToast } from "@/hooks/use-toast";

export default function AdminArticles() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles
  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const data = await articleService.getAllArticles();
      setArticles(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while fetching articles.";
      toast({
        title: "Failed to Fetch Articles",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate stats from actual data
  const stats = [
    {
      label: "Total Articles",
      value: articles.length.toString(),
      icon: FileText,
      change: "+12%",
    },
    {
      label: "Published",
      value: articles.filter((a) => a.status === "published").length.toString(),
      icon: CheckCircle,
      change: "+8%",
    },
    {
      label: "Drafts",
      value: articles.filter((a) => a.status === "draft").length.toString(),
      icon: Clock,
      change: "+4",
    },
    {
      label: "Total Views",
      value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(),
      icon: TrendingUp,
      change: "+18%",
    },
  ];

  // Filter articles based on search and status
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handler functions
  const handlePreview = (article: Article) => {
    setSelectedArticle(article);
    setIsPreviewModalOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedArticle) return;

    try {
      await articleService.deleteArticle(selectedArticle._id);
      toast({
        title: "Article Deleted",
        description: `"${selectedArticle.title}" has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedArticle(null);
      fetchArticles();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete article.";
      toast({
        title: "Delete Failed",
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
              Content Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and manage your articles
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-primary/80"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Article
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
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Drafts</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Loading articles...
                </p>
              </CardContent>
            </Card>
          ) : filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  {searchQuery || filterStatus !== "all"
                    ? "No articles found matching your filters."
                    : "No articles yet. Create your first article!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card
                key={article._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 flex-shrink-0">
                        <PenTool className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(article.status)}>
                            {article.status}
                          </Badge>
                          <Badge variant="outline">{article.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3" />
                            <span>{article.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created{" "}
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {article.published_at && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>
                            Published{" "}
                            {new Date(
                              article.published_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(article)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => handleDelete(article)}
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
        <CreateArticleModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSuccess={fetchArticles}
        />

        <EditArticleModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          article={selectedArticle}
          onSuccess={fetchArticles}
        />

        <ArticlePreviewModal
          open={isPreviewModalOpen}
          onOpenChange={setIsPreviewModalOpen}
          article={selectedArticle}
        />

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete Article?"
          itemName={selectedArticle?.title}
        />
      </div>
    </AdminLayout>
  );
}

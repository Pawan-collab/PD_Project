/**
 * Admin Media Management Page
 */

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Download,
  Eye,
  FolderOpen,
  File,
  Calendar,
  Loader2,
  MapPin,
  Edit,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddMediaModal from "@/components/admin/AddMediaModal";
import ViewMediaModal from "@/components/admin/ViewMediaModal";
import EditMediaModal from "@/components/admin/EditMediaModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import {
  galleryService,
  Gallery,
  GalleryCategory,
} from "@/services/gallery.service";
import { useToast } from "@/hooks/use-toast";

export default function AdminMedia() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch galleries on mount
  useEffect(() => {
    fetchGalleries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      const data = await galleryService.getAllGalleries();
      setGalleries(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch galleries.";
      toast({
        title: "Failed to Load Media",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter galleries based on search
  const filteredGalleries = galleries.filter((gallery) => {
    const search = searchQuery.toLowerCase();
    return (
      (gallery.title?.toLowerCase() || "").includes(search) ||
      (gallery.category?.toLowerCase() || "").includes(search) ||
      (gallery.content?.toLowerCase() || "").includes(search)
    );
  });

  // Calculate stats
  const stats = [
    {
      label: "Total Files",
      value: galleries.length.toString(),
      icon: FolderOpen,
    },
    {
      label: "Published",
      value: galleries.filter((g) => g.published).length.toString(),
      icon: ImageIcon,
    },
    {
      label: "Featured",
      value: galleries.filter((g) => g.featured).length.toString(),
      icon: File,
    },
    {
      label: "Categories",
      value: new Set(galleries.map((g) => g.category)).size.toString(),
      icon: FolderOpen,
    },
  ];

  const handleView = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsViewModalOpen(true);
  };

  const handleEdit = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedGallery?._id) return;

    try {
      await galleryService.deleteGallery(selectedGallery._id);
      toast({
        title: "Deleted Successfully",
        description: "Gallery item has been deleted.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedGallery(null);
      fetchGalleries();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description:
          error instanceof Error ? error.message : "Failed to delete item.",
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
            <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
            <p className="text-muted-foreground mt-1">
              Manage your images, documents, and files
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-primary/80"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.values(GalleryCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredGalleries.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Media Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No items match your search query."
                : "Start by uploading your first media item."}
            </p>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGalleries.map((gallery) => (
              <Card
                key={gallery._id}
                className="group hover:shadow-md transition-all overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
                  {gallery.image_path ? (
                    gallery.media_type === "video" ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${gallery.image_path.includes("youtube.com") || gallery.image_path.includes("youtu.be") ? gallery.image_path.split("v=")[1]?.split("&")[0] || gallery.image_path.split("/").pop() : ""}`}
                        title={gallery.title || "YouTube video"}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={galleryService.getImageUrl(gallery.image_path)}
                        alt={gallery.title || "Gallery image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback =
                              parent.querySelector(".fallback-icon");
                            if (fallback) {
                              fallback.classList.remove("hidden");
                            }
                          }
                        }}
                      />
                    )
                  ) : null}
                  <div
                    className="absolute inset-0 flex items-center justify-center fallback-icon"
                    style={{ display: gallery.image_path ? "none" : "flex" }}
                  >
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(gallery);
                      }}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (gallery.image_path && gallery.image_filename) {
                          const link = document.createElement("a");
                          link.href = galleryService.getImageUrl(
                            gallery.image_path
                          );
                          link.download = gallery.image_filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      }}
                      title="Download"
                      disabled={!gallery.image_path}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(gallery);
                      }}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3
                    className="font-medium text-sm truncate mb-2"
                    title={gallery.title}
                  >
                    {gallery.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {gallery.image_mime?.split("/")[1]?.toUpperCase() ||
                          "IMAGE"}
                      </span>
                      <span>{gallery.published ? "Published" : "Draft"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(gallery.date)}</span>
                    </div>
                    {gallery.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{gallery.location}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {gallery.category.replace(/_/g, " ")}
                      </Badge>
                      {gallery.published && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Published
                        </Badge>
                      )}
                      {gallery.featured && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => handleEdit(gallery)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modals */}
        <AddMediaModal
          open={isUploadModalOpen}
          onOpenChange={setIsUploadModalOpen}
          onSuccess={fetchGalleries}
        />

        <ViewMediaModal
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
          gallery={selectedGallery}
        />

        <EditMediaModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          gallery={selectedGallery}
          onSuccess={fetchGalleries}
        />

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete Gallery Item"
          description={`Are you sure you want to delete "${selectedGallery?.title}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}

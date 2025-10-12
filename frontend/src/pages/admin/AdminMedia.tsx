/**
 * Admin Media Management Page
 */

import { useState } from "react";
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
} from "lucide-react";

export default function AdminMedia() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with real API
  const mediaFiles = [
    {
      id: 1,
      name: "ai-solutions-banner.jpg",
      type: "image/jpeg",
      size: "2.4 MB",
      url: "/placeholder-image.jpg",
      uploadedAt: "2024-01-15",
      usedIn: ["Homepage", "About Page"],
    },
    {
      id: 2,
      name: "team-photo-2024.png",
      type: "image/png",
      size: "3.1 MB",
      url: "/placeholder-image.jpg",
      uploadedAt: "2024-01-14",
      usedIn: ["About Page"],
    },
    {
      id: 3,
      name: "project-showcase.jpg",
      type: "image/jpeg",
      size: "1.8 MB",
      url: "/placeholder-image.jpg",
      uploadedAt: "2024-01-12",
      usedIn: ["Projects Page", "Gallery"],
    },
    {
      id: 4,
      name: "article-cover-ai-trends.jpg",
      type: "image/jpeg",
      size: "2.2 MB",
      url: "/placeholder-image.jpg",
      uploadedAt: "2024-01-10",
      usedIn: ["Article: AI Trends"],
    },
  ];

  const stats = [
    { label: "Total Files", value: "124", icon: FolderOpen },
    { label: "Images", value: "98", icon: ImageIcon },
    { label: "Documents", value: "26", icon: File },
    { label: "Storage Used", value: "245 MB", icon: Upload },
  ];

  const formatFileSize = (size: string) => {
    return size;
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
          <Button className="bg-gradient-to-r from-primary to-primary/80">
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

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaFiles.map((file) => (
            <Card key={file.id} className="group hover:shadow-md transition-all overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-sm truncate mb-2">{file.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{file.type.split("/")[1].toUpperCase()}</span>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{file.uploadedAt}</span>
                  </div>
                  {file.usedIn.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {file.usedIn.slice(0, 2).map((location, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                      {file.usedIn.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{file.usedIn.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload New Files</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Choose Files
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

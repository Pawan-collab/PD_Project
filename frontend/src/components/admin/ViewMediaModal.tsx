/**
 * View Media Modal Component
 * Displays full gallery item details
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
  MapPin,
  Image as ImageIcon,
  Star,
  CheckCircle,
  XCircle,
  FileType,
  FileText,
  Clock,
} from "lucide-react";
import { Gallery, galleryService } from "@/services/gallery.service";

interface ViewMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery | null;
}

export default function ViewMediaModal({
  open,
  onOpenChange,
  gallery,
}: ViewMediaModalProps) {
  if (!gallery) return null;

  const formatDate = (date: Date | string) => {
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
          <DialogTitle className="text-2xl font-bold">Gallery Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              {gallery.image_path ? (
                <img
                  src={galleryService.getImageUrl(gallery.image_path)}
                  alt={gallery.title}
                  className="w-full h-auto max-h-[400px] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-sm">
                  {gallery.category.replace(/_/g, " ")}
                </Badge>
                {gallery.published ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Published
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400">
                    <XCircle className="h-3 w-3 mr-1" />
                    Unpublished
                  </Badge>
                )}
                {gallery.featured && (
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                {gallery.title}
              </h1>
            </div>

            <Separator />

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Event Date</p>
                  <p className="font-medium">{formatDate(gallery.date)}</p>
                </div>
              </div>

              {gallery.location && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">{gallery.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <FileType className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">File Type</p>
                  <p className="font-medium">{gallery.image_mime?.split("/")[1]?.toUpperCase() || "IMAGE"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Filename</p>
                  <p className="font-medium truncate max-w-[200px]">{gallery.image_filename || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(gallery.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Updated</p>
                  <p className="font-medium">{formatDate(gallery.updatedAt)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {gallery.content}
              </p>
            </div>

            <Separator />

            {/* Technical Details */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold">Technical Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">File Name</p>
                  <p className="font-mono text-xs break-all">{gallery.image_filename}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Gallery ID</p>
                  <p className="font-mono text-xs break-all">{gallery._id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-xs">
                    {gallery.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Path</p>
                  <p className="font-mono text-xs break-all">{gallery.image_path}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

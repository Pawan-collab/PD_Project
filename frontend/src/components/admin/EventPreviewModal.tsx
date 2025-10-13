/**
 * Event Preview Modal Component
 * Displays event details in a preview format
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
  Clock,
  Users,
  Target,
  Tag,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { EventModel } from "@/services/event.service";

interface EventPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventModel | null;
}

export default function EventPreviewModal({
  open,
  onOpenChange,
  event,
}: EventPreviewModalProps) {
  if (!event) return null;

  const getKindColor = (kind: string) => {
    switch (kind) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "past":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "hosting":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      case "tentative":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case "hosting":
        return <Star className="h-3 w-3 mr-1" />;
      case "tentative":
        return <AlertCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Event Preview</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getKindColor(event.kind)}>
                  {event.kind.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(event.status)}>
                  {getStatusIcon(event.status)}
                  {event.status}
                </Badge>
                <Badge variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {event.type}
                </Badge>
                {event.featured && (
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {event.published ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <Eye className="h-3 w-3 mr-1" />
                    Published
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Unpublished
                  </Badge>
                )}
                {event.isActive ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Inactive
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                {event.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <Separator />

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm md:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              {event.audience && (
                <div className="flex items-center gap-2 text-sm md:col-span-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Target Audience</p>
                    <p className="font-medium">{event.audience}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Topics Section */}
            {event.topics && event.topics.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Topics Covered</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Expected Outcome Section */}
            {event.outcome && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Expected Outcome</h3>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm leading-relaxed">{event.outcome}</p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Event Metadata */}
            <div className="space-y-2 text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-sm mb-3">Event Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <span className="font-medium">Event ID:</span> {event._id}
                </p>
                <p>
                  <span className="font-medium">Display Order:</span> {event.order || 0}
                </p>
                <p>
                  <span className="font-medium">Kind:</span> {event.kind}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {event.status}
                </p>
                <p>
                  <span className="font-medium">Published:</span> {event.published ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Featured:</span> {event.featured ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Active:</span> {event.isActive ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Created:</span> {formatDate(event.createdAt || event.created_at)}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

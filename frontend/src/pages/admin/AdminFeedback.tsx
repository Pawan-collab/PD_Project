/**
 * Admin Feedback/Reviews Management Page
 */

import { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle,
  Search,
  Filter,
  Star,
  CheckCircle,
  Calendar,
  Award,
  TrendingUp,
  Loader2,
  AlertCircle,
  Trash2,
  XCircle,
  Building,
  Briefcase,
} from "lucide-react";
import { feedbackService, type Feedback } from "@/services/feedback.service";
import { ApiError } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";

export default function AdminFeedback() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState<Feedback | null>(null);

  // Fetch all feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await feedbackService.getAllFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      const errorMessage = err instanceof ApiError ? err.message : "Failed to load feedbacks";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle approval status
  const handleToggleApproval = async (feedback: Feedback) => {
    setTogglingId(feedback._id);
    try {
      const updatedFeedback = await feedbackService.toggleFeedbackApproval(
        feedback._id,
        !feedback.is_approved
      );

      // Update local state
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === feedback._id ? updatedFeedback : fb))
      );

      toast({
        title: feedback.is_approved ? "Feedback Unapproved" : "Feedback Approved",
        description: feedback.is_approved
          ? "This feedback is now hidden from the public page."
          : "This feedback is now visible on the public page.",
      });
    } catch (err) {
      console.error("Error toggling approval:", err);
      const errorMessage = err instanceof ApiError ? err.message : "Failed to update feedback";
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setTogglingId(null);
    }
  };

  // Delete feedback
  const handleDelete = async () => {
    if (!feedbackToDelete) return;

    setDeletingId(feedbackToDelete._id);
    try {
      await feedbackService.deleteFeedback(feedbackToDelete._id);

      // Update local state
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== feedbackToDelete._id));

      toast({
        title: "Feedback Deleted",
        description: "The feedback has been permanently removed.",
      });
    } catch (err) {
      console.error("Error deleting feedback:", err);
      const errorMessage = err instanceof ApiError ? err.message : "Failed to delete feedback";
      toast({
        title: "Delete Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      setFeedbackToDelete(null);
    }
  };

  // Filter and search feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.job_title.toLowerCase().includes(searchQuery.toLowerCase());

      // Rating filter
      const matchesRating =
        filterRating === "all" || feedback.rating === parseInt(filterRating);

      // Status filter
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "approved" && feedback.is_approved) ||
        (filterStatus === "pending" && !feedback.is_approved);

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [feedbacks, searchQuery, filterRating, filterStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalReviews = feedbacks.length;
    const approvedCount = feedbacks.filter((fb) => fb.is_approved).length;
    const pendingCount = feedbacks.filter((fb) => !fb.is_approved).length;
    const averageRating =
      totalReviews > 0
        ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / totalReviews).toFixed(1)
        : "0.0";

    return [
      { label: "Total Reviews", value: totalReviews.toString(), icon: MessageCircle, color: "blue" },
      { label: "Average Rating", value: averageRating, icon: Star, color: "yellow" },
      { label: "Approved", value: approvedCount.toString(), icon: CheckCircle, color: "green" },
      { label: "Pending", value: pendingCount.toString(), icon: TrendingUp, color: "purple" },
    ];
  }, [feedbacks]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Reviews</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage customer feedback
            </p>
          </div>
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

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or comment..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Star className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading feedbacks...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredFeedbacks.length === 0 && feedbacks.length === 0 && (
          <Card className="p-12 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Feedbacks Yet</h3>
            <p className="text-muted-foreground">
              Customer feedbacks will appear here once submitted.
            </p>
          </Card>
        )}

        {/* No Results State */}
        {!isLoading && !error && filteredFeedbacks.length === 0 && feedbacks.length > 0 && (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </Card>
        )}

        {/* Feedback List */}
        {!isLoading && !error && filteredFeedbacks.length > 0 && (
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <Card key={feedback._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50">
                        <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{feedback.name}</h3>
                          {renderStars(feedback.rating)}
                          <span className="text-sm font-medium text-yellow-600">
                            {feedback.rating}.0
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            <span>{feedback.company_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            <span>{feedback.job_title}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={feedback.is_approved ? "default" : "secondary"}
                            className={
                              feedback.is_approved
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }
                          >
                            {feedback.is_approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-4 mb-4">
                    <div className="relative">
                      <MessageCircle className="absolute -left-1 -top-1 h-4 w-4 text-primary/30" />
                      <p className="text-sm leading-relaxed pl-6 italic">
                        "{feedback.comment}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted on {formatDate(feedback.submitted_at)}</span>
                    </div>
                    <div className="flex gap-2">
                      {feedback.is_approved ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleApproval(feedback)}
                          disabled={togglingId === feedback._id}
                          className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950"
                        >
                          {togglingId === feedback._id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="mr-2 h-4 w-4" />
                          )}
                          Unapprove
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleToggleApproval(feedback)}
                          disabled={togglingId === feedback._id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {togglingId === feedback._id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                          )}
                          Approve
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFeedbackToDelete(feedback)}
                        disabled={deletingId === feedback._id}
                        className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                      >
                        {deletingId === feedback._id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!feedbackToDelete} onOpenChange={() => setFeedbackToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the feedback from{" "}
              <span className="font-semibold">{feedbackToDelete?.name}</span> at{" "}
              <span className="font-semibold">{feedbackToDelete?.company_name}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}

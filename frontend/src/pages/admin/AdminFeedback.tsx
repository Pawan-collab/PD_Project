/**
 * Admin Feedback/Reviews Management Page
 */

import { useState } from "react";
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
  MessageCircle,
  Search,
  Filter,
  Star,
  ThumbsUp,
  Eye,
  Archive,
  CheckCircle,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";

export default function AdminFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  // Mock data - replace with real API
  const feedbacks = [
    {
      id: 1,
      name: "Alice Brown",
      email: "alice@example.com",
      rating: 5,
      comment: "Excellent AI solutions! Very professional team and outstanding support.",
      status: "approved",
      featured: true,
      createdAt: "2024-01-16",
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com",
      rating: 4,
      comment: "Great service, would recommend to others. Quick response time.",
      status: "pending",
      featured: false,
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      rating: 5,
      comment: "Transformed our business operations completely. Highly satisfied!",
      status: "approved",
      featured: false,
      createdAt: "2024-01-14",
    },
  ];

  const stats = [
    { label: "Total Reviews", value: "156", icon: MessageCircle, color: "blue" },
    { label: "Average Rating", value: "4.7", icon: Star, color: "yellow" },
    { label: "This Month", value: "+23", icon: TrendingUp, color: "green" },
    { label: "Featured", value: "12", icon: Award, color: "purple" },
  ];

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
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
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

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
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
                      <p className="text-sm text-muted-foreground mb-2">{feedback.email}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={feedback.status === "approved" ? "default" : "secondary"}
                          className={
                            feedback.status === "approved"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }
                        >
                          {feedback.status}
                        </Badge>
                        {feedback.featured && (
                          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                            <Award className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
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
                    <span>Received on {feedback.createdAt}</span>
                  </div>
                  <div className="flex gap-2">
                    {feedback.status === "pending" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    )}
                    {!feedback.featured && feedback.status === "approved" && (
                      <Button size="sm" variant="outline">
                        <Award className="mr-2 h-4 w-4" />
                        Feature
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

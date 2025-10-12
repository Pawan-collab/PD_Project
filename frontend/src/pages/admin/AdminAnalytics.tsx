/**
 * Admin Analytics Page
 */

import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users2,
  MessageCircle,
  FileText,
  Eye,
  Calendar,
  Activity,
} from "lucide-react";

export default function AdminAnalytics() {
  const overviewStats = [
    {
      label: "Total Inquiries",
      value: "248",
      change: "+12.5%",
      trend: "up",
      icon: Users2,
      color: "blue",
    },
    {
      label: "Customer Reviews",
      value: "156",
      change: "+8.3%",
      trend: "up",
      icon: MessageCircle,
      color: "green",
    },
    {
      label: "Published Articles",
      value: "48",
      change: "+15.2%",
      trend: "up",
      icon: FileText,
      color: "purple",
    },
    {
      label: "Total Page Views",
      value: "12.5K",
      change: "-2.4%",
      trend: "down",
      icon: Eye,
      color: "orange",
    },
  ];

  const monthlyData = [
    { month: "Jan", inquiries: 45, feedback: 28, articles: 8 },
    { month: "Feb", inquiries: 52, feedback: 31, articles: 10 },
    { month: "Mar", inquiries: 48, feedback: 29, articles: 9 },
    { month: "Apr", inquiries: 61, feedback: 35, articles: 11 },
    { month: "May", inquiries: 55, feedback: 33, articles: 10 },
    { month: "Jun", inquiries: 67, feedback: 42, articles: 12 },
  ];

  const topPerformingArticles = [
    { title: "The Future of AI in Business", views: 1250, engagement: "95%" },
    { title: "Best Practices for AI Implementation", views: 890, engagement: "87%" },
    { title: "ROI Analysis of AI Solutions", views: 756, engagement: "82%" },
    { title: "Ethical AI Development", views: 642, engagement: "79%" },
  ];

  const recentActivity = [
    { type: "inquiry", message: "New inquiry from Tech Corp", time: "5 mins ago" },
    { type: "feedback", message: "5-star review received", time: "12 mins ago" },
    { type: "article", message: "Article published: AI Trends 2024", time: "1 hour ago" },
    { type: "inquiry", message: "Inquiry marked as resolved", time: "2 hours ago" },
    { type: "feedback", message: "Feedback approved for display", time: "3 hours ago" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground mt-1">
            Track your performance and key metrics
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
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
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendIcon
                      className={`h-3 w-3 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <span
                      className={stat.trend === "up" ? "text-green-600" : "text-red-600"}
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

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-muted-foreground">
                    {data.month}
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 rounded bg-blue-500"
                        style={{ width: `${(data.inquiries / 70) * 100}%` }}
                      />
                      <span className="text-sm font-medium">{data.inquiries}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 rounded bg-green-500"
                        style={{ width: `${(data.feedback / 50) * 100}%` }}
                      />
                      <span className="text-sm font-medium">{data.feedback}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 rounded bg-purple-500"
                        style={{ width: `${(data.articles / 15) * 100}%` }}
                      />
                      <span className="text-sm font-medium">{data.articles}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-muted-foreground">Inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-muted-foreground">Articles</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Performing Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{article.title}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views} views
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {article.engagement} engagement
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        activity.type === "inquiry"
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : activity.type === "feedback"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-purple-100 dark:bg-purple-900/20"
                      }`}
                    >
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

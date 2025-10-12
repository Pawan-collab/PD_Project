/**
 * Admin Dashboard Page
 */

import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard.</p>
      </div>
    </AdminLayout>
  );
}

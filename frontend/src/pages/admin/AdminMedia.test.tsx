/**
 * Simple test component to verify AdminMedia loads
 */

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function AdminMediaTest() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AdminMedia component mounted");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Media Test</h1>
          <p className="mb-4">If you see this, the component is loading correctly.</p>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Test Button
          </Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}

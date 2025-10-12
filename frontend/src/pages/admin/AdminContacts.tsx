/**
 * Admin Contacts/Inquiries Management Page
 */

import { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/services/contact.service";
import type { Contact } from "@/types/contact.types";
import {
  UserCheck,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  FileText,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { format } from "date-fns";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
    fetchContactCount();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching contacts from API...");
      const response = await contactService.getAllContacts();
      console.log("Contacts fetched successfully:", response);

      if (Array.isArray(response)) {
        setContacts(response);
        setError(null);
      } else {
        console.error("Response is not an array:", response);
        setContacts([]);
        const errorMsg = "Received invalid data format from server";
        setError(errorMsg);
        toast({
          title: "Warning",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error fetching contacts:", error);
      setContacts([]);

      // Better error messages
      let errorMessage = "Failed to fetch contacts";
      if (error.statusCode === 401) {
        errorMessage = "Unauthorized. Please login again.";
      } else if (error.statusCode === 403) {
        errorMessage = "Access denied. Admin privileges required.";
      } else if (error.statusCode === 0) {
        errorMessage = "Cannot connect to server. Please check if backend is running on port 8000.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchContactCount = async () => {
    try {
      const count = await contactService.getContactCount();
      console.log("Contact count:", count);
      setTotalCount(count);
    } catch (error: any) {
      console.error("Error fetching contact count:", error);
      // Don't show error toast for count - just log it
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      console.log("Deleting contact:", id);
      await contactService.deleteContact(id);
      console.log("Contact deleted successfully");

      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });

      // Refresh contacts and count
      await fetchContacts();
      await fetchContactCount();
    } catch (error: any) {
      console.error("Error deleting contact:", error);

      let errorMessage = "Failed to delete contact";
      if (error.statusCode === 401) {
        errorMessage = "Unauthorized. Please login again.";
      } else if (error.statusCode === 403) {
        errorMessage = "Access denied. Admin privileges required.";
      } else if (error.statusCode === 404) {
        errorMessage = "Contact not found.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;

    const query = searchQuery.toLowerCase();
    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.company_name.toLowerCase().includes(query) ||
        contact.country.toLowerCase().includes(query) ||
        contact.job_title.toLowerCase().includes(query) ||
        contact.messages?.some(msg => msg.message.toLowerCase().includes(query))
      );
    });
  }, [contacts, searchQuery]);

  const stats = [
    { label: "Total Inquiries", value: totalCount.toString(), color: "blue" },
    {
      label: "New Today",
      value: contacts.filter(c => {
        const today = new Date();
        const contactDate = new Date(c.created_at);
        return contactDate.toDateString() === today.toDateString();
      }).length.toString(),
      color: "green"
    },
    {
      label: "This Week",
      value: contacts.filter(c => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(c.created_at) >= weekAgo;
      }).length.toString(),
      color: "yellow"
    },
    {
      label: "This Month",
      value: contacts.filter(c => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return new Date(c.created_at) >= monthAgo;
      }).length.toString(),
      color: "purple"
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold tracking-tight bg-gradient-cyber bg-clip-text text-transparent">
              Business Inquiries
            </h1>
            <p className="text-muted-foreground mt-1 font-rajdhani">
              Manage and respond to customer inquiries
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="glass neon-border hover:shadow-cyber transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-rajdhani font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-orbitron font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        {!loading && !error && contacts.length > 0 && (
          <Card className="glass border-primary/20">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, company, country, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 font-rajdhani bg-background/50 border-primary/30 focus:border-primary"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2 font-rajdhani">
                  Found {filteredContacts.length} of {contacts.length} contacts
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 font-rajdhani text-muted-foreground">Loading contacts...</span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <Card className="glass border-red-400/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-lg font-rajdhani font-medium text-foreground mb-2">
                Failed to Load Contacts
              </p>
              <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                {error}
              </p>
              <Button
                onClick={() => fetchContacts()}
                className="font-rajdhani bg-gradient-cyber hover:shadow-neon"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Check console (F12) for detailed error information
              </p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && contacts.length === 0 && (
          <Card className="glass border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-rajdhani font-medium text-foreground">No contacts yet</p>
              <p className="text-sm text-muted-foreground">
                Contact submissions will appear here
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Search Results */}
        {!loading && !error && contacts.length > 0 && filteredContacts.length === 0 && (
          <Card className="glass border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-rajdhani font-medium text-foreground">No results found</p>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search terms
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="font-rajdhani border-primary/30"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contacts List */}
        {!loading && filteredContacts.length > 0 && (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card key={contact._id} className="glass neon-border hover:shadow-cyber transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-cyber border border-primary/30 flex-shrink-0">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-orbitron font-semibold text-foreground">
                        {contact.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="text-xs font-rajdhani border-primary/30">
                          {contact.job_title}
                        </Badge>
                        <Badge className="bg-primary/20 text-primary border-primary/30 font-rajdhani">
                          {contact.company_name}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                    <div className="flex items-center gap-2 text-sm font-rajdhani">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="truncate text-foreground/80">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-rajdhani">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-rajdhani">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{contact.company_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-rajdhani">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{contact.country}</span>
                    </div>
                  </div>

                  {/* Messages Section */}
                  {contact.messages && contact.messages.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-primary/10">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-rajdhani font-medium text-foreground">
                          Messages ({contact.messages.length})
                        </span>
                      </div>
                      <div className="space-y-3">
                        {contact.messages.map((msg, idx) => (
                          <div key={idx} className="pl-6 border-l-2 border-primary/30">
                            <p className="text-sm text-foreground/80 font-rajdhani leading-relaxed mb-1">
                              {msg.message}
                            </p>
                            <p className="text-xs text-muted-foreground font-rajdhani flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(msg.submitted_at)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-rajdhani">
                      <Calendar className="h-4 w-4" />
                      <span>Received on {formatDate(contact.created_at)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-rajdhani border-primary/30 hover:bg-primary/10"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="font-rajdhani bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-400/30"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
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
    </AdminLayout>
  );
}

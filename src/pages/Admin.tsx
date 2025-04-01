
import { useState, useEffect } from "react";
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BetaSignup = Tables<"beta_signups">;

const Admin = () => {
  const { toast } = useToast();
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const fetchSignups = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("beta_signups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("Fetched data:", data);
      setSignups(data || []);
    } catch (error) {
      console.error("Error fetching beta signups:", error);
      toast({
        variant: "destructive",
        title: "Failed to load signups",
        description: "There was an error loading the beta signup entries."
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    if (signups.length === 0) {
      toast({
        description: "No data to export",
      });
      return;
    }

    setExporting(true);
    try {
      // Convert signups to CSV
      const headers = ["name", "company", "email", "phone", "created_at"];
      const csvContent = [
        headers.join(","),
        ...signups.map(signup => 
          headers.map(header => {
            const value = signup[header as keyof BetaSignup];
            // Handle values that might contain commas by wrapping in quotes
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(",")
        )
      ].join("\n");

      // Create a Blob with the CSV data
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const fileName = `beta_signups_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('beta-signups-data')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('beta-signups-data')
        .getPublicUrl(fileName);

      setExportUrl(urlData.publicUrl);
      
      toast({
        title: "Export successful!",
        description: "Beta signup data has been exported to CSV and saved to storage."
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "There was an error exporting the data."
      });
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Beta Signup Entries</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={fetchSignups}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <RefreshCw className="h-4 w-4 mr-1" />}
                    Refresh
                  </Button>
                  <Button 
                    onClick={exportToCSV}
                    disabled={loading || exporting || signups.length === 0}
                    size="sm"
                  >
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Download className="h-4 w-4 mr-1" />}
                    Export to CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8 text-muted-foreground">Loading signup data...</p>
              ) : signups.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No beta signup entries found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signups.map((signup) => (
                        <TableRow key={signup.id} className="hover:bg-muted/50">
                          <TableCell>{signup.name}</TableCell>
                          <TableCell>{signup.company}</TableCell>
                          <TableCell>{signup.email}</TableCell>
                          <TableCell>{signup.phone}</TableCell>
                          <TableCell>
                            {new Date(signup.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {exportUrl && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="mb-2 font-medium">Export completed!</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground truncate flex-1">
                      {exportUrl.split('/').pop()}
                    </span>
                    <Button variant="secondary" size="sm" asChild>
                      <a href={exportUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;

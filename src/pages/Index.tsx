
import { useState } from "react";
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle2, Wand2, Clock, CameraIcon, SmartphoneIcon, PresentationIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const betaFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type BetaFormValues = z.infer<typeof betaFormSchema>;

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BetaFormValues>({
    resolver: zodResolver(betaFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: BetaFormValues) => {
    setIsSubmitting(true);
    try {
      // This would be replaced with your actual API call to save the beta signup
      console.log("Form values:", values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Successfully joined the beta!",
        description: "We'll be in touch soon with access details.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Show Clients Their Finished Home <span className="text-primary">Before You Start</span>
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-[700px]">
                  MockingBird helps home improvement professionals increase close rates by showing clients photorealistic visualizations of completed projects in minutes, not weeks.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" className="bg-primary text-primary-foreground" onClick={scrollToSignup}>
                    Join the Free Beta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={scrollToSignup}>
                    See Examples
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-lg overflow-hidden shadow-2xl bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-background/50 z-10"></div>
                    <img 
                      src="/placeholder.svg" 
                      alt="MockingBird Home Visualization" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 bg-card/95 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">Before & After Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How MockingBird Works</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                Three simple steps to create stunning visualizations of your projects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card/60 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CameraIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">1. Snap a Photo</h3>
                <p className="text-muted-foreground text-center">
                  Use your phone to take a photo of the home or area that needs improvement
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card/60 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <SmartphoneIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2. Describe the Change</h3>
                <p className="text-muted-foreground text-center">
                  Enter a brief description of the modification you want to visualize
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card/60 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <PresentationIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">3. Show Your Client</h3>
                <p className="text-muted-foreground text-center">
                  Present a photorealistic visualization of the completed project to your client
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Why Contractors Love MockingBird</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                Boost your business with these powerful advantages
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 border rounded-lg shadow-sm">
                <div className="shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Increase Close Rates</h3>
                  <p className="text-muted-foreground mt-2">
                    When clients can visualize the end result, they're more likely to approve your proposal
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 border rounded-lg shadow-sm">
                <div className="shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Save Time</h3>
                  <p className="text-muted-foreground mt-2">
                    Create visualizations in minutes instead of hours spent with design software
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 border rounded-lg shadow-sm">
                <div className="shrink-0">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Stand Out From Competition</h3>
                  <p className="text-muted-foreground mt-2">
                    Provide a premium experience that differentiates your service from other contractors
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 border rounded-lg shadow-sm">
                <div className="shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Reduce Revisions</h3>
                  <p className="text-muted-foreground mt-2">
                    Aligning expectations visually means fewer change orders and clearer communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Examples - Placeholder until you supply the actual images */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Before & After Examples</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                See the transformative power of MockingBird visualizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Example 1 - Replace with actual image pairs when available */}
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Before</div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Before renovation" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                  <div className="absolute top-2 left-2 bg-primary/70 text-white text-xs px-2 py-1 rounded">After (AI Visualization)</div>
                  <img 
                    src="/placeholder.svg" 
                    alt="After visualization" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Changed the siding color from beige to navy blue with white trim accents"
                </p>
              </div>
              
              {/* Example 2 - Replace with actual image pairs when available */}
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Before</div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Before renovation" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                  <div className="absolute top-2 left-2 bg-primary/70 text-white text-xs px-2 py-1 rounded">After (AI Visualization)</div>
                  <img 
                    src="/placeholder.svg" 
                    alt="After visualization" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Added stone veneer to the front entrance and updated the landscaping"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beta Signup Section */}
        <section id="beta-signup" className="py-16 md:py-24 lg:py-32 bg-gradient-to-t from-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Join Our Free Beta</h2>
                <p className="text-muted-foreground md:text-lg mt-2">
                  Be among the first contractors to use MockingBird and transform your sales process
                </p>
              </div>
              
              <div className="p-6 md:p-8 border rounded-lg shadow-lg bg-card">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith Contractors" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Join the Beta"}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By signing up, you agree to our Terms of Service and Privacy Policy.
                      We'll never share your information with third parties.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from "react";
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BeforeAfterExamples } from "@/components/BeforeAfterExamples";
import { ArrowRight, CameraIcon, MessageSquareText, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Hero } from "@/components/Hero";
import { supabase } from "@/integrations/supabase/client";

const betaFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  company: z.string().min(2, {
    message: "Company name is required."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number."
  })
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
      phone: ""
    }
  });

  const onSubmit = async (values: BetaFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form values:", values);
      
      // Insert data into the beta_signups table
      const { data, error } = await supabase
        .from('beta_signups')
        .insert([
          { 
            name: values.name,
            company: values.company,
            email: values.email,
            phone: values.phone
          }
        ]);
        
      if (error) {
        console.error("Error saving to Supabase:", error);
        throw error;
      }
      
      console.log("Successfully saved to Supabase:", data);
      
      toast({
        title: "Successfully joined the beta!",
        description: "We'll be in touch soon with access details."
      });
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      
      <main className="flex-1">
        {/* Use the new Hero component */}
        <Hero />

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-24 bg-card/30 px-4">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">How MockingBird Works</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                From photo to visualization in minutes, not weeks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-6 md:mt-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <CameraIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">1. Snap a Photo</h3>
                <p className="text-muted-foreground">
                  Take a picture or upload an existing photo of the space you want to renovate. 
                  Works with kitchens, bathrooms, exteriors, landscaping, and more.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-10 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <MessageSquareText className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">2. Describe Your Vision</h3>
                <p className="text-muted-foreground">
                  Explain what changes you want to make in plain English. For example: 
                  "Paint the walls light blue, add white trim, and install hardwood flooring."
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-10 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <ImageIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">3. Get Visualizations</h3>
                <p className="text-muted-foreground">MockingBird AI instantly generates photorealistic visualizations of your space with the changes applied. Show your potential customers their dream home and close the deal.</p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-10 text-center">
              <Button onClick={() => document.getElementById("beta-signup")?.scrollIntoView({
              behavior: "smooth"
            })} className="bg-primary text-primary-foreground">
                Try it yourself
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Before & After Examples */}
        <section id="examples" className="py-12 md:py-24 px-4">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Before & After Examples</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                See the transformative power of MockingBird visualizations
              </p>
            </div>
            
            <BeforeAfterExamples />
          </div>
        </section>

        {/* Beta Signup Section */}
        <section id="beta-signup" className="py-12 md:py-24 lg:py-32 bg-gradient-to-t from-background to-secondary/10 px-4">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Join Our Free Beta</h2>
                <p className="text-muted-foreground md:text-lg mt-2">
                  Be among the first contractors to use MockingBird and transform your sales process
                </p>
              </div>
              
              <div className="p-5 md:p-8 border rounded-lg shadow-lg bg-card">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField control={form.control} name="name" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="company" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith Contractors" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="phone" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
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
    </div>;
};

export default Index;

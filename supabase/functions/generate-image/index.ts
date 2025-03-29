
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, imageUrl } = await req.json();
    
    if (!prompt || !imageUrl) {
      console.error("Missing required parameters:", { prompt, imageUrl });
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing image generation with prompt: "${prompt}" and image URL: ${imageUrl}`);
    
    // Get the OpenAI API key from environment variables
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Significantly improved prompt that focuses on precise edits while maintaining image fidelity
    const preciseEditPrompt = `IMAGE EDITING TASK: Using the original image as a direct reference, show exactly how it would look with this ONE specific modification: ${prompt}

CRITICAL REQUIREMENTS:
- This is a professional photo edit, not a new image creation
- EXACT PRESERVATION of the original image's structure, layout, perspective, and all other elements
- Only apply the requested modification: ${prompt}
- Keep the exact same building, landscape, angles, lighting style, colors, and composition
- Result must be photorealistic and match the exact properties of the original
- The edit must be seamless and look like a professional photo edit made by a skilled designer
- Ensure 100% accuracy in preserving all unchanged elements`;

    console.log("Calling OpenAI API with precise image editing prompt");
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: preciseEditPrompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        response_format: "url",
      })
    });

    const data = await response.json();
    
    console.log("OpenAI API response status:", response.status);

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return new Response(
        JSON.stringify({ 
          error: data.error?.message || "Error generating image",
          details: data
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the generated image URL
    const generatedImageUrl = data.data?.[0]?.url;
    
    if (!generatedImageUrl) {
      console.error("No image URL in response:", data);
      return new Response(
        JSON.stringify({ error: "No image was generated", details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Image successfully generated. URL:", generatedImageUrl);

    return new Response(
      JSON.stringify({ 
        success: true,
        generatedImageUrl
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

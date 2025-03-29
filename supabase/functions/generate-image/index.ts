
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

    // First, use GPT-4o to enhance the prompt
    console.log("Calling GPT-4o to create a safer and more effective prompt");
    const sanitizedUserPrompt = prompt
      .trim()
      .replace(/[^\w\s,.?!()]/g, '')  // Remove potentially problematic characters
      .toLowerCase();

    // Create a safer prompt template that's more likely to pass content policy checks
    const systemInstructions = `
      You are a home renovation visualization assistant. Your task is to take a user's request for a home 
      modification and create a safe, neutral prompt for DALL-E 3 that will generate a realistic visualization.
      
      ONLY reply with the revised prompt text, nothing else.
      
      The prompt must:
      1. Focus ONLY on home exterior/interior design changes
      2. Be descriptive but neutral in tone
      3. Avoid any politically, socially, or ethically sensitive concepts
      4. Emphasize photorealism and professional quality
      5. Never include anything that could violate OpenAI's content policy

      Format your response as:
      "A photorealistic visualization showing [specific home change requested], maintaining the exact same structure, lighting and composition as the reference photo."
    `;

    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemInstructions },
          { role: "user", content: `Create a safe prompt to visualize a home with this change: ${sanitizedUserPrompt}` }
        ],
        max_tokens: 200,
        temperature: 0.3
      })
    });

    if (!visionResponse.ok) {
      const errorData = await visionResponse.json();
      console.error("Error creating safe prompt:", errorData);
      
      // Use a fallback safe prompt structure
      const fallbackPrompt = `A photorealistic visualization showing a home with ${sanitizedUserPrompt}, maintaining the exact same structure, lighting, and composition as the reference photo.`;
      console.log("Using fallback prompt:", fallbackPrompt);
      
      // Call DALL-E 3 with the fallback prompt
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fallbackPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          response_format: "url",
          style: "natural"
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error("DALL-E API error:", data);
        return new Response(
          JSON.stringify({ error: data.error?.message || "Error generating image" }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const generatedImageUrl = data.data[0].url;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          generatedImageUrl,
          enhancedPrompt: fallbackPrompt
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const visionData = await visionResponse.json();
    const enhancedPrompt = visionData.choices[0]?.message?.content;
    
    if (!enhancedPrompt) {
      console.error("No enhanced prompt generated:", visionData);
      return new Response(
        JSON.stringify({ error: "Failed to generate a safe prompt" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Using enhanced prompt for DALL-E:", enhancedPrompt);

    // Call DALL-E 3 with the enhanced prompt
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
        style: "natural"
      })
    });

    const data = await response.json();
    
    console.log("DALL-E API response status:", response.status);

    if (!response.ok) {
      console.error("DALL-E API error:", data);
      
      // Try one more time with an even safer prompt
      console.log("Trying again with safer prompt");
      const saferPrompt = `A photorealistic image of a house with ${sanitizedUserPrompt.slice(0, 50)}`;
      
      const retryResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: saferPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          response_format: "url",
          style: "natural"
        })
      });
      
      const retryData = await retryResponse.json();
      
      if (!retryResponse.ok) {
        console.error("DALL-E API error on retry:", retryData);
        return new Response(
          JSON.stringify({ 
            error: "Your request couldn't be processed due to content safety policies. Please try a different, more specific home modification request.",
            details: retryData.error || "Unknown error"
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const generatedImageUrl = retryData.data[0].url;
      
      console.log("Image successfully generated with safer prompt. URL:", generatedImageUrl);
      
      return new Response(
        JSON.stringify({ 
          success: true,
          generatedImageUrl,
          enhancedPrompt: saferPrompt
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the generated image URL
    const generatedImageUrl = data.data[0].url;
    
    console.log("Image successfully generated. URL:", generatedImageUrl);

    return new Response(
      JSON.stringify({ 
        success: true,
        generatedImageUrl,
        enhancedPrompt
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

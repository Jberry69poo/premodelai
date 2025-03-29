
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

    // Step 1: Vision Analysis and Prompt Engineering with GPT-4o
    // Use GPT-4o to create a refined DALL-E prompt that preserves the original image
    console.log("Step 1: Using GPT-4o to analyze image and create an optimized DALL-E prompt");
    
    const sanitizedUserPrompt = prompt.trim();

    // Enhanced system instructions for better prompt engineering
    const systemInstructions = `
      You are an expert prompt engineer for DALL-E 3 image editing tasks. Your job is to create 
      highly effective prompts specifically for modifying architectural photos.
      
      Rules for DALL-E 3 prompts:
      1. Start with "IMAGE EDITING TASK:" followed by a clear, specific instruction
      2. Use very explicit preservation language: "PRESERVE ALL existing architectural elements EXACTLY as shown"
      3. Specify ONLY the elements that should change, with precise details (color, material, style)
      4. Focus on a single change at a time for best results
      5. Include "This is a photo editing task, not a new image creation" to reinforce edit vs. generate
      6. Add "Use the reference image as the direct base for modification" to encourage DALL-E to edit rather than recreate
      7. End with "Maintain identical lighting, perspective, surroundings, and structural layout"
      
      Format your response as ONLY the exact DALL-E prompt text, nothing else.
    `;

    // Call GPT-4o with the image to analyze it and create an optimized prompt
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: systemInstructions 
          },
          {
            role: "user", 
            content: [
              {
                type: "text", 
                text: `Create a DALL-E 3 prompt for this editing task: ${sanitizedUserPrompt}`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!visionResponse.ok) {
      const errorData = await visionResponse.json();
      console.error("Error creating optimized prompt:", errorData);
      
      // Use a fallback prompt structure that emphasizes editing over creation
      const fallbackPrompt = `IMAGE EDITING TASK: ${sanitizedUserPrompt}. This is a photo editing task using the reference image as base. PRESERVE ALL existing architectural features, layout, lighting, perspective, and surroundings EXACTLY as shown - only modify the specific element mentioned.`;
      console.log("Using fallback prompt:", fallbackPrompt);
      
      // Call DALL-E 3 with the fallback prompt
      console.log("Calling DALL-E 3 with the fallback prompt");
      const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
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
          quality: "hd",
          style: "natural"
        })
      });
      
      const dalleData = await dalleResponse.json();
      
      if (!dalleResponse.ok) {
        console.error("DALL-E API error:", dalleData);
        return new Response(
          JSON.stringify({ error: dalleData.error?.message || "Error generating image" }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const generatedImageUrl = dalleData.data[0].url;
      
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
        JSON.stringify({ error: "Failed to generate a proper prompt" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Step 2: GPT-4o enhanced prompt:", enhancedPrompt);

    // Step 3: Call DALL-E 3 with the enhanced prompt for image generation
    console.log("Step 3: Calling DALL-E 3 with the enhanced prompt");
    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
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
        quality: "hd",
        style: "natural",
      })
    });

    const dalleData = await dalleResponse.json();
    
    console.log("DALL-E API response status:", dalleResponse.status);

    if (!dalleResponse.ok) {
      console.error("DALL-E API error:", dalleData);
      
      // Step 4: Fall back to a different prompt approach if the first attempt fails
      console.log("Step 4: Trying again with simplified prompt");
      const simplifiedPrompt = `A photorealistic architectural photograph showing a home with ${sanitizedUserPrompt}. Base the image exactly on the reference image, changing only the specified element while keeping all other details identical. This is a photo editing task, not a new image creation.`;
      
      const retryResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: simplifiedPrompt,
          n: 1,
          size: "1024x1024",
          quality: "hd",
          style: "natural",
        })
      });
      
      const retryData = await retryResponse.json();
      
      if (!retryResponse.ok) {
        console.error("DALL-E API error on retry:", retryData);
        return new Response(
          JSON.stringify({ 
            error: "Your request couldn't be processed. Please try a different, more specific home modification description.",
            details: retryData.error || "Unknown error"
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const generatedImageUrl = retryData.data[0].url;
      
      console.log("Image successfully generated with simplified prompt. URL:", generatedImageUrl);
      
      return new Response(
        JSON.stringify({ 
          success: true,
          generatedImageUrl,
          enhancedPrompt: simplifiedPrompt
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the generated image URL
    const generatedImageUrl = dalleData.data[0].url;
    
    console.log("Image successfully generated. URL:", generatedImageUrl);

    // Step 5: Return the generated image
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

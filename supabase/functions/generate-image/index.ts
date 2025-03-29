
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

    // Step 1: Vision Input Recognition with GPT-4o
    // Use GPT-4o to analyze the image and refine the prompt
    console.log("Step 1: Using GPT-4o to analyze the image and refine the prompt");
    
    const sanitizedUserPrompt = prompt
      .trim()
      .toLowerCase();

    // Create a system instruction that follows the smart routing approach
    const systemInstructions = `
      You are a professional architectural visualization expert specializing in photo-realistic home renovations.

      Your task is to create a highly specific DALL-E 3 prompt that will modify ONLY the exact feature requested
      in the reference photo.

      Follow this precise workflow:
      1. Carefully analyze what specific element the user wants to change (e.g., shutters, door color, roof material)
      2. Create a prompt that instructs DALL-E to ONLY modify that specific element
      3. Explicitly instruct to preserve ALL other elements exactly as shown (structure, perspective, lighting, surroundings)
      4. Use detailed, specific language about materials, colors, and textures
      5. Format your prompt as: "IMAGE EDITING TASK: Change [specific element] to [specific description]. Preserve ALL other architectural elements, lighting, perspective, and surroundings exactly as shown in the reference photo."
      
      IMPORTANT: Your prompt must be focused ONLY on architectural visualization. Reply ONLY with the DALL-E prompt text, nothing else.
    `;

    // Call GPT-4o with the image to analyze it and create an optimized prompt
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",  // Using gpt-4o which has vision capabilities
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
                text: `${sanitizedUserPrompt}. Do not change anything else.`
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
      
      // Use a fallback prompt structure
      const fallbackPrompt = `IMAGE EDITING TASK: ${sanitizedUserPrompt}. Preserve ALL other architectural elements, lighting, perspective, and surroundings exactly as shown in the reference photo.`;
      console.log("Using fallback prompt:", fallbackPrompt);
      
      // Step 3: Call DALL-E 3 with the fallback prompt
      console.log("Step 3: Calling DALL-E 3 with the fallback prompt");
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
          quality: "hd",  // Use high quality
          style: "natural",  // Use natural style for photorealism
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
        JSON.stringify({ error: "Failed to generate a proper prompt" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Step 2: GPT-4o enhanced prompt:", enhancedPrompt);

    // Step 3: Call DALL-E 3 with the enhanced prompt for generation
    console.log("Step 3: Calling DALL-E 3 with the enhanced prompt");
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
        quality: "hd",  // Upgraded to high quality
        style: "natural",  // Use natural style for photorealism
      })
    });

    const data = await response.json();
    
    console.log("DALL-E API response status:", response.status);

    if (!response.ok) {
      console.error("DALL-E API error:", data);
      
      // Step 4: Fall back to a simpler prompt if the first attempt fails
      console.log("Step 4: Trying again with simplified prompt");
      const simplifiedPrompt = `A photorealistic image showing ${sanitizedUserPrompt}. The image should look exactly like a professional architectural photograph.`;
      
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
    const generatedImageUrl = data.data[0].url;
    
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

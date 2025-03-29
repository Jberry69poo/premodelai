
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

    // Step 1: Generate optimized DALL-E prompt with GPT-4o Vision
    console.log("Creating optimized DALL-E prompt with GPT-4o...");
    
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are helping a contractor create realistic home modification previews. Your job is to write a perfect DALL-E 3 prompt that will edit a real photo of a home with ONLY the specific modification requested, while ensuring the result looks completely realistic and preserves everything else exactly as is.

Guidelines for your DALL·E prompt:
1. Structure it as "IMAGE EDITING TASK: [clear instruction for exactly one edit]"
2. Emphasize this is a PHOTO EDIT, not creating a new image
3. Demand EXACT preservation of the original's structure, composition, lighting, colors, and all elements except the ONE requested change
4. The edit must look professionally done and photorealistic
5. Do NOT use creative language that could trigger content filters`
          },
          {
            role: "user", 
            content: [
              {
                type: "text",
                text: `This is a real home photo. I need to show my client what it would look like with this ONE specific change: ${prompt}

Please create a DALL-E prompt that will produce a realistic photo edit showing ONLY this change while keeping everything else exactly the same.`
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

    const gptData = await gptResponse.json();
    
    if (!gptResponse.ok) {
      console.error("GPT-4o vision API error:", gptData);
      throw new Error(`GPT-4o API error: ${gptData.error?.message || "Unknown error"}`);
    }

    const enhancedPrompt = gptData.choices[0].message.content.trim();
    console.log("Optimized DALL-E prompt:", enhancedPrompt);

    // Step 2: Call DALL-E 3 with the enhanced prompt
    console.log("Calling DALL-E 3 API with optimized prompt...");
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
        response_format: "url",
      })
    });

    const dalleData = await dalleResponse.json();
    
    console.log("DALL-E API response status:", dalleResponse.status);

    if (!dalleResponse.ok) {
      console.error("DALL-E API error:", dalleData);
      return new Response(
        JSON.stringify({ 
          error: dalleData.error?.message || "Error generating image",
          details: dalleData
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the generated image URL
    const generatedImageUrl = dalleData.data?.[0]?.url;
    
    if (!generatedImageUrl) {
      console.error("No image URL in response:", dalleData);
      return new Response(
        JSON.stringify({ error: "No image was generated", details: dalleData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Image successfully generated. URL:", generatedImageUrl);

    return new Response(
      JSON.stringify({ 
        success: true,
        generatedImageUrl,
        enhancedPrompt  // Include the enhanced prompt in the response for transparency
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

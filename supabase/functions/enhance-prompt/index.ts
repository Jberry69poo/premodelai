
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
    const { imageUrl, userRequest } = await req.json();
    
    if (!imageUrl || !userRequest) {
      console.error("Missing required parameters:", { imageUrl, userRequest });
      return new Response(
        JSON.stringify({ error: "Missing required parameters: imageUrl and userRequest are required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing prompt enhancement with imageUrl: ${imageUrl} and user request: "${userRequest}"`);
    
    // Get the OpenAI API key from environment variables
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create the system prompt
    const systemPrompt = `You are helping a contractor show a realistic mockup to a client. 
This is a real home photo. The goal is to only change the ${userRequest} without changing any layout, structure, 
lighting, furniture, or surroundings. Write a DALL·E 3 prompt that makes only this change, with perfect realism.
Your prompt should be clear, concise, and focus ONLY on the requested change.

Follow these guidelines:
1. Start with "IMAGE EDITING TASK:" followed by the specific modification
2. List critical preservation requirements that ensure nothing else changes
3. Emphasize that this is a photo edit, not a new image creation
4. Ensure your prompt is specific, detailed, and focused on the exact change requested
5. Only return the DALL-E prompt text, nothing else`;

    // Call GPT-4-Vision to generate an enhanced prompt
    console.log("Calling GPT-4-Vision API for prompt enhancement");
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
            content: systemPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `I need a realistic mockup showing this change: ${userRequest}`
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

    const visionData = await visionResponse.json();
    
    console.log("GPT-4-Vision API response status:", visionResponse.status);

    if (!visionResponse.ok) {
      console.error("GPT-4-Vision API error:", visionData);
      return new Response(
        JSON.stringify({ 
          error: visionData.error?.message || "Error generating enhanced prompt",
          details: visionData
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the enhanced prompt
    const enhancedPrompt = visionData.choices[0]?.message?.content;
    
    if (!enhancedPrompt) {
      console.error("No enhanced prompt in response:", visionData);
      return new Response(
        JSON.stringify({ error: "Failed to generate enhanced prompt", details: visionData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Enhanced prompt successfully generated:", enhancedPrompt);

    return new Response(
      JSON.stringify({ 
        success: true,
        enhancedPrompt: enhancedPrompt.trim()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Unexpected error in enhance-prompt function:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

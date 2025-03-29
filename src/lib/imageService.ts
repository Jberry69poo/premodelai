
import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File): Promise<string | null> {
  try {
    console.log("Starting image upload:", file.name, file.size);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log("Uploading to bucket: mockingbird-images, path:", filePath);
    const { data, error } = await supabase.storage
      .from('mockingbird-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log("Upload successful, getting public URL");
    const { data: urlData } = supabase.storage
      .from('mockingbird-images')
      .getPublicUrl(filePath);

    console.log("Generated public URL:", urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}

export async function generateImageWithExternalAPI(file: File, prompt: string): Promise<string> {
  try {
    console.log("Calling external API with:", { prompt, file: file.name });
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);
    
    // Adding error handling with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    const response = await fetch('https://mockingbird.fly.dev/generate-image-fast', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}. The image generation service might be temporarily unavailable.`);
    }
    
    const data = await response.json();
    
    if (!data || !data.image_url) {
      console.error('No image URL in response:', data);
      throw new Error('No image URL returned from generation API. Please try again with a different prompt.');
    }
    
    console.log("Image generated successfully:", data.image_url);
    return data.image_url;
  } catch (error) {
    console.error('Error in generateImageWithExternalAPI:', error);
    if (error.name === "AbortError") {
      throw new Error("Generation request timed out. The service might be busy or temporarily unavailable.");
    }
    throw error;
  }
}

export async function saveMockup(
  userId: string | undefined, 
  originalImageUrl: string, 
  generatedImageUrl: string, 
  prompt: string
) {
  try {
    console.log("Saving mockup:", { userId, prompt });
    const { data, error } = await supabase
      .from('mockups')
      .insert([
        { 
          user_id: userId || null, 
          original_image_url: originalImageUrl, 
          generated_image_url: generatedImageUrl, 
          prompt
        }
      ]);

    if (error) {
      console.error('Error saving mockup:', error);
      return null;
    }

    console.log("Mockup saved successfully");
    return data;
  } catch (error) {
    console.error('Error in saveMockup:', error);
    return null;
  }
}

export async function getUserMockups(userId: string) {
  try {
    const { data, error } = await supabase
      .from('mockups')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user mockups:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserMockups:', error);
    return [];
  }
}

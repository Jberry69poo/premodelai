
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

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

export async function generateImage(prompt: string, originalImageUrl: string) {
  try {
    console.log("Calling generate-image function with:", { prompt, originalImageUrl });
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: { prompt, imageUrl: originalImageUrl }
    });

    if (error) {
      console.error('Error generating image:', error);
      throw new Error(error.message || 'Failed to generate image');
    }

    if (!data || !data.generatedImageUrl) {
      console.error('No image data returned:', data);
      throw new Error('No image data returned from generation');
    }

    console.log("Image generated successfully:", data);
    return data;
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw error;
  }
}

export async function saveGeneratedImage(
  userId: string, 
  originalImageUrl: string, 
  generatedImageUrl: string, 
  prompt: string,
  enhancedPrompt?: string
) {
  try {
    console.log("Saving generated image:", { userId, prompt, enhancedPrompt });
    const { data, error } = await supabase
      .from("generated_images")
      .insert([
        { 
          user_id: userId, 
          original_image_url: originalImageUrl, 
          generated_image_url: generatedImageUrl, 
          prompt,
          enhanced_prompt: enhancedPrompt || null
        }
      ]);

    if (error) {
      console.error('Error saving generated image:', error);
      return null;
    }

    console.log("Image saved successfully");
    return data;
  } catch (error) {
    console.error('Error in saveGeneratedImage:', error);
    return null;
  }
}

export async function getUserGeneratedImages(userId: string) {
  try {
    const { data, error } = await supabase
      .from("generated_images")
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user generated images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserGeneratedImages:', error);
    return [];
  }
}

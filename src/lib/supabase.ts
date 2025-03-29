
import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('mockingbird-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('mockingbird-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}

export async function generateImage(prompt: string, originalImageUrl: string) {
  try {
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: { prompt, imageUrl: originalImageUrl }
    });

    if (error) {
      console.error('Error generating image:', error);
      throw new Error(error.message || 'Failed to generate image');
    }

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
  prompt: string
) {
  try {
    const { data, error } = await supabase
      .from('generated_images')
      .insert([
        { 
          user_id: userId, 
          original_image_url: originalImageUrl, 
          generated_image_url: generatedImageUrl, 
          prompt 
        }
      ]);

    if (error) {
      console.error('Error saving generated image:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in saveGeneratedImage:', error);
    return null;
  }
}

export async function getUserGeneratedImages(userId: string) {
  try {
    const { data, error } = await supabase
      .from('generated_images')
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

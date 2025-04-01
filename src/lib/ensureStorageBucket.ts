
import { supabase } from "@/integrations/supabase/client";

export const ensureStorageBucket = async (bucketName: string) => {
  try {
    // Check if the bucket exists
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();
    
    if (listError) {
      console.error("Error checking storage buckets:", listError);
      return false;
    }

    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Creating bucket: ${bucketName}`);
      const { error: createError } = await supabase
        .storage
        .createBucket(bucketName, {
          public: true,
        });
        
      if (createError) {
        console.error(`Error creating bucket ${bucketName}:`, createError);
        return false;
      }
      console.log(`Bucket ${bucketName} created successfully`);
    } else {
      console.log(`Bucket ${bucketName} already exists`);
    }
    
    return true;
  } catch (error) {
    console.error("Unexpected error in ensureStorageBucket:", error);
    return false;
  }
};

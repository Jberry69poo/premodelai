
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  isLoading?: boolean;
}

export const ImageUpload = ({ 
  onImageSelect, 
  selectedImage,
  isLoading = false 
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const clearSelectedImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null as any);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          } rounded-lg transition-all flex flex-col items-center justify-center p-8 h-64 cursor-pointer`}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload an image</h3>
          <p className="text-muted-foreground text-sm mb-4 text-center">
            Drag and drop or click to browse <br />
            JPG, PNG (Max 10MB)
          </p>
          <Button variant="outline" className="bg-secondary">
            <ImageIcon className="mr-2 h-4 w-4" />
            Select Image
          </Button>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border h-64">
          <img
            src={selectedImage}
            alt="Selected house"
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={clearSelectedImage}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};


import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createPost } from "@/services/blogService";
import { uploadImage } from "@/services/imageService";
import { BlogPostFormData } from "@/types/blog";
import { ImageIcon, Upload, Loader2 } from "lucide-react";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    location: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    imageUrl: null, // Initialize as null since it's optional
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Start upload
      setLoading(true);
      const imageUrl = await uploadImage(file);
      
      setFormData(prev => ({ ...prev, imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    // Explicitly trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!formData.location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Please enter your travel story');
      return;
    }
    
    // Remove image validation since it's now optional

    try {
      setLoading(true);
      const newPost = createPost(formData);
      toast.success('Travel story published successfully!');
      navigate(`/post/${newPost.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-center mb-8">Share Your Travel Story</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="My Amazing Adventure"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Paris, France"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date of Travel</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">
                Featured Image <span className="text-sm text-muted-foreground">(optional)</span>
              </Label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md border-muted">
                {imagePreview ? (
                  <div className="mb-4 w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <ImageIcon className="mb-2 h-10 w-10" />
                    <p className="mb-2">Upload a featured image (optional)</p>
                    <p className="text-xs">Recommended size: 1200 x 800px</p>
                  </div>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  disabled={loading}
                  onClick={triggerFileInput}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      {imagePreview ? "Change Image" : "Select Image"}
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Your Travel Story</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Share your experience..."
                rows={10}
                value={formData.content}
                onChange={handleInputChange}
                required
                className="resize-none"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Story
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;


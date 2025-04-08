
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getPostById, deletePost } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { MapPin, Calendar, ArrowLeft, Trash2 } from "lucide-react";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      navigate("/404");
      return;
    }

    try {
      const fetchedPost = getPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Failed to fetch post", error);
      toast.error("Failed to load the post");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (!id) return;
    
    try {
      const success = deletePost(id);
      if (success) {
        toast.success("Your travel story has been deleted");
        navigate("/");
      } else {
        toast.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return null; // This should not happen due to the navigate("/404") above
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all posts
      </Button>

      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative h-[400px]">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-travel-navy mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <div className="flex items-center text-travel-teal">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{post.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Story
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    travel story and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;

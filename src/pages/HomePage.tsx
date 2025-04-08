
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { MapPin, Calendar } from "lucide-react";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const allPosts = getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-12 text-center">
        <h1 className="text-travel-navy">Travel Chronicles</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Share your adventures and explore destinations around the world through personal stories and photographs.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">No travel stories yet</h2>
          <p className="mb-6 text-muted-foreground">Be the first to share your adventure!</p>
          <Button asChild>
            <Link to="/create">Create Your First Post</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="travel-card animate-fade-in">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={post.imageUrl || "/placeholder.svg"} 
                  alt={post.title} 
                  className="travel-card-image"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">{post.title}</h3>
                <div className="flex items-center text-sm text-travel-teal mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{post.location}</span>
                </div>
                <p className="text-muted-foreground line-clamp-2">{post.content}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/post/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

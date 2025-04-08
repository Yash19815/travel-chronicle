
import { BlogPost, BlogPostFormData } from "@/types/blog";

// Use localStorage for data persistence
const STORAGE_KEY = "travel-chronicles-posts";

export const getAllPosts = (): BlogPost[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id: string): BlogPost | undefined => {
  const posts = getAllPosts();
  return posts.find(post => post.id === id);
};

export const createPost = (post: BlogPostFormData): BlogPost => {
  const posts = getAllPosts();
  
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  
  return newPost;
};

export const updatePost = (id: string, updatedPost: BlogPostFormData): BlogPost | undefined => {
  const posts = getAllPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) return undefined;
  
  const updated: BlogPost = {
    ...updatedPost,
    id,
    createdAt: posts[postIndex].createdAt
  };
  
  posts[postIndex] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  
  return updated;
};

export const deletePost = (id: string): boolean => {
  const posts = getAllPosts();
  const updatedPosts = posts.filter(post => post.id !== id);
  
  if (updatedPosts.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return true;
};

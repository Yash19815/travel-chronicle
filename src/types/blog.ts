
export interface BlogPost {
  id: string;
  title: string;
  location: string;
  content: string;
  date: string;
  imageUrl: string | null; // Make imageUrl optional by allowing null
  createdAt: number;
}

export type BlogPostFormData = Omit<BlogPost, 'id' | 'createdAt'>;

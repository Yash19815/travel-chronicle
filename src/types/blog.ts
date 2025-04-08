
export interface BlogPost {
  id: string;
  title: string;
  location: string;
  content: string;
  date: string;
  imageUrl: string;
  createdAt: number;
}

export type BlogPostFormData = Omit<BlogPost, 'id' | 'createdAt'>;

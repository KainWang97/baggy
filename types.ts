export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  imageUrl: string;
  tags: string[];
  color?: string;
}
export type PropertyCategory = "residential" | "commercial" | "luxury" | "land";

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  category: PropertyCategory;
  images: string[];
  description: string;
  features: string[];
  lat: number;
  lng: number;
  featured: boolean;
  status: "for-sale" | "for-rent" | "sold";
  yearBuilt: number;
  garage: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  body: string;
  userId: number;
  slug: string;
  publishedAt: string;
  category: string;
  image: string;
}

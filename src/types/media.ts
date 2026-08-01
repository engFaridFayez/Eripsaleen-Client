export interface SubCategory {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  category: number;
  category_name: string;
}

export interface Category {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  subcategories: SubCategory[];
}

export interface GalleryImage {
  id: number;
  sub_category: number;
  sub_category_name: string;
  image: string;
  title: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export type VideoContentType = "video" | "podcast" | "reel";

export type VideoPlatform = "youtube" | "facebook";

export interface Video {
  id: number;
  sub_category: number;
  sub_category_name: string;
  category_name: string;
  content_type: VideoContentType;
  platform: VideoPlatform;
  title: string;
  description: string | null;
  embed_url: string;
  thumbnail: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
}
export interface VideoForm {
  sub_category: number;
  content_type: VideoContentType;
  platform: VideoPlatform;
  title: string;
  description: string;
  embed_url: string;
  order: number;
  is_active: boolean;
}

/* ==============================
   Frontend
============================== */

export interface SubCategoryNested {
  id: number;
  name: string;
  image: string | null;
}

export interface CategoryWithSubCategories {
  id: number;
  name: string;
  image: string;
  description: string | null;
  subcategories: SubCategoryNested[];
}
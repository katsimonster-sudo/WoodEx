export type Category = 'lighting' | 'carving' | 'rustic' | 'furniture' | 'models3d' | 'vectors';

export interface Product {
  id: string; slug: string; category: Category;
  titleUk: string; titleEn: string; descUk: string; descEn: string;
  price: number | null; currency: string; images: string[];
  materials: string[]; dimensions?: string; inStock: boolean; isCustomOrder: boolean; featured?: boolean;
}

export interface PortfolioItem {
  id: string; category: Category; titleUk: string; titleEn: string;
  descUk: string; descEn: string; image: string; woodType: string; slug: string;
  dimensions?: string;
}

export interface DigitalProduct {
  id: string; slug: string; category: 'models3d' | 'vectors';
  titleUk: string; titleEn: string; descUk: string; descEn: string;
  price: number; currency: string; previewImage: string;
  formats: string[]; fileSize: string; polygons?: string; featured?: boolean;
}

export interface CartItem {
  id: string; slug: string; title: string; price: number;
  image: string; quantity: number; type: 'physical' | 'digital';
}

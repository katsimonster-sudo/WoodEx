import type { Product } from './types';

export const products: Product[] = [
  { id: 'pr1', slug: 'oak-pendant-lamp', category: 'lighting', titleUk: 'Підвісна лампа «Дуб»', titleEn: 'Oak Pendant Lamp', descUk: 'Ексклюзивна підвісна лампа з мореного дуба. Ручна різьба, тепле LED освітлення у комплекті.', descEn: 'Exclusive pendant lamp from aged oak. Hand-carved, warm LED included.', price: 4800, currency: 'UAH', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'], materials: ['Дуб морений', 'Латунь', 'LED'], dimensions: '35×35×40 см', inStock: true, isCustomOrder: false, featured: true },
  { id: 'pr2', slug: 'walnut-shelf', category: 'furniture', titleUk: 'Навісна полиця «Горіх»', titleEn: 'Walnut Floating Shelf', descUk: 'Мінімалістична полиця з масиву горіха. Кріплення приховане.', descEn: 'Minimalist solid walnut floating shelf. Hidden mounting.', price: 2200, currency: 'UAH', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'], materials: ['Горіх', 'Сталь'], dimensions: '80×22×4 см', inStock: true, isCustomOrder: false },
  { id: 'pr3', slug: 'live-edge-coffee-table', category: 'rustic', titleUk: 'Кавовий стіл Live Edge', titleEn: 'Live Edge Coffee Table', descUk: 'Кавовий стіл із живим краєм акації. Ніжки — кована сталь.', descEn: 'Live edge acacia coffee table. Forged steel legs.', price: 8500, currency: 'UAH', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'], materials: ['Акація', 'Кована сталь'], dimensions: '120×60×45 см', inStock: false, isCustomOrder: true, featured: true },
  { id: 'pr4', slug: 'forest-relief', category: 'carving', titleUk: 'Рельєф «Ліс»', titleEn: 'Forest Relief Panel', descUk: 'Об\'ємний рельєф із масиву горіха. Розмір 120×80 см. Підходить для інтер\'єру.', descEn: 'Solid walnut 3D relief panel. 120×80 cm. Interior artwork.', price: 12000, currency: 'UAH', images: ['https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=800&q=80'], materials: ['Горіх'], dimensions: '120×80×6 см', inStock: false, isCustomOrder: true },
  { id: 'pr5', slug: 'wall-sconce-ash', category: 'lighting', titleUk: 'Настінний бра «Ясен»', titleEn: 'Ash Wall Sconce', descUk: 'Парний настінний бра. Ясен + кована бронза. Двосторонній.', descEn: 'Pair wall sconces. Ash + forged bronze. Bidirectional.', price: 3600, currency: 'UAH', images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'], materials: ['Ясен', 'Бронза'], dimensions: '25×12×30 см', inStock: true, isCustomOrder: false },
  { id: 'pr6', slug: 'barn-door', category: 'rustic', titleUk: 'Амбарні двері', titleEn: 'Reclaimed Barn Door', descUk: 'Розсувні двері зі старого ясена. Рустикальний стиль, механізм у комплекті.', descEn: 'Sliding door from reclaimed ash. Rustic style, hardware included.', price: 11000, currency: 'UAH', images: ['https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80'], materials: ['Ясен рустик', 'Сталь'], dimensions: '90×200×4 см', inStock: false, isCustomOrder: true },
];

export const categories = [
  { slug: 'lighting', labelUk: 'Освітлення', labelEn: 'Lighting', icon: '💡' },
  { slug: 'carving', labelUk: 'Різьблення', labelEn: 'Carving', icon: '🪚' },
  { slug: 'rustic', labelUk: 'Рустик', labelEn: 'Rustic', icon: '🏡' },
  { slug: 'furniture', labelUk: 'Меблі', labelEn: 'Furniture', icon: '🪑' },
  { slug: 'models3d', labelUk: '3D Моделі', labelEn: '3D Models', icon: '🧊' },
  { slug: 'vectors', labelUk: 'Вектори', labelEn: 'Vectors', icon: '✏️' },
];

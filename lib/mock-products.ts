import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'pr1',
    slug: 'oak-pendant-lamp',
    category: 'lighting',
    titleUk: 'Підвісна лампа «Дуб»',
    titleEn: 'Oak Pendant Lamp',
    descUk: 'Ексклюзивна підвісна лампа з мореного дуба. Ручна різьба, тепле LED освітлення у комплекті. Ідеально підходить для обідньої зони або кабінету.',
    descEn: 'Exclusive pendant lamp from aged oak. Hand-carved, warm LED included.',
    price: 4800,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=85'
    ],
    materials: ['Дуб морений', 'Латунь', 'LED'],
    dimensions: '35×35×40 см',
    inStock: true,
    isCustomOrder: false,
    featured: true
  },
  {
    id: 'pr2',
    slug: 'walnut-shelf',
    category: 'furniture',
    titleUk: 'Навісна полиця «Горіх»',
    titleEn: 'Walnut Floating Shelf',
    descUk: 'Мінімалістична полиця з масиву горіха. Кріплення приховане. Надійна конструкція витримує до 25 кг.',
    descEn: 'Minimalist solid walnut floating shelf. Hidden mounting.',
    price: 2200,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&q=85'
    ],
    materials: ['Горіх', 'Сталь'],
    dimensions: '80×22×4 см',
    inStock: true,
    isCustomOrder: false
  },
  {
    id: 'pr3',
    slug: 'live-edge-coffee-table',
    category: 'rustic',
    titleUk: 'Кавовий стіл Live Edge',
    titleEn: 'Live Edge Coffee Table',
    descUk: 'Кавовий стіл із живим краєм акації. Ніжки — кована сталь ручної роботи. Покриття — натуральна масло-віск суміш Osmo.',
    descEn: 'Live edge acacia coffee table. Forged steel legs.',
    price: 8500,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=85'
    ],
    materials: ['Акація', 'Кована сталь', 'Олія-віск Osmo'],
    dimensions: '120×60×45 см',
    inStock: false,
    isCustomOrder: true,
    featured: true
  },
  {
    id: 'pr4',
    slug: 'forest-relief',
    category: 'carving',
    titleUk: 'Рельєф «Ліс»',
    titleEn: 'Forest Relief Panel',
    descUk: 'Об\'ємний художній рельєф із масиву горіха. Висока деталізація лісового пейзажу. Бездоганний акцент для сучасного інтер\'єру.',
    descEn: 'Solid walnut 3D relief panel. 120×80 cm. Interior artwork.',
    price: 12000,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85'
    ],
    materials: ['Горіх добірний'],
    dimensions: '120×80×6 см',
    inStock: false,
    isCustomOrder: true
  },
  {
    id: 'pr5',
    slug: 'wall-sconce-ash',
    category: 'lighting',
    titleUk: 'Настінний бра «Ясен»',
    titleEn: 'Ash Wall Sconce',
    descUk: 'Парний настінний бра. Ясен + кована патинована бронза. М\'яке розсіяне світло вгору та вниз.',
    descEn: 'Pair wall sconces. Ash + forged bronze. Bidirectional.',
    price: 3600,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=85'
    ],
    materials: ['Ясен', 'Бронза'],
    dimensions: '25×12×30 см',
    inStock: true,
    isCustomOrder: false
  },
  {
    id: 'pr6',
    slug: 'barn-door',
    category: 'rustic',
    titleUk: 'Амбарні двері',
    titleEn: 'Reclaimed Barn Door',
    descUk: 'Розсувні амбарні двері зі старого фактурного ясена. Автентичний рустикальний стиль, посилений роликовий механізм у комплекті.',
    descEn: 'Sliding door from reclaimed ash. Rustic style, hardware included.',
    price: 11000,
    currency: 'UAH',
    images: [
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=85'
    ],
    materials: ['Ясен рустик', 'Сталь'],
    dimensions: '90×200×4 см',
    inStock: false,
    isCustomOrder: true
  },
];

export const categories = [
  { slug: 'lighting', labelUk: 'Освітлення', labelEn: 'Lighting', icon: '💡' },
  { slug: 'carving', labelUk: 'Різьблення', labelEn: 'Carving', icon: '🪚' },
  { slug: 'rustic', labelUk: 'Рустик', labelEn: 'Rustic', icon: '🏡' },
  { slug: 'furniture', labelUk: 'Меблі', labelEn: 'Furniture', icon: '🪑' },
  { slug: 'models3d', labelUk: '3D Моделі', labelEn: '3D Models', icon: '🧊' },
  { slug: 'vectors', labelUk: 'Вектори', labelEn: 'Vectors', icon: '✏️' },
];

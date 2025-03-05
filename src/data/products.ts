
export enum ProductCategory {
  Herbs = "Herbs",
  Oils = "Oils",
  Supplements = "Supplements",
  Equipment = "Equipment"
}

export interface ProductReview {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  benefits: string[];
  usage: string;
  ingredients?: string[];
  sideEffects?: string[];
  reviews: ProductReview[];
  rating: number; // Average rating
  isPopular: boolean;
  isNew: boolean;
}

// Mock data
export const products: Product[] = [
  {
    id: "p1",
    name: "Ashwagandha Powder",
    category: ProductCategory.Herbs,
    description: "Organic Ashwagandha root powder, known for its stress-relieving and immunity-boosting properties.",
    price: 450,
    discountPrice: 399,
    stock: 50,
    images: [
      "https://images.pexels.com/photos/6690051/pexels-photo-6690051.jpeg",
      "https://images.pexels.com/photos/6709869/pexels-photo-6709869.jpeg"
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Boosts immunity",
      "Improves sleep quality",
      "Enhances energy levels"
    ],
    usage: "Take 1-2 teaspoons daily with warm milk or water.",
    ingredients: ["100% Organic Ashwagandha Root Powder"],
    sideEffects: ["May cause digestive upset in sensitive individuals", "Not recommended during pregnancy"],
    reviews: [
      { userId: "u1", userName: "Rahul M.", rating: 5, comment: "Excellent product! I've been sleeping much better.", date: "2023-11-01" },
      { userId: "u2", userName: "Priya S.", rating: 4, comment: "Good quality but the taste is quite strong.", date: "2023-10-15" }
    ],
    rating: 4.5,
    isPopular: true,
    isNew: false
  },
  {
    id: "p2",
    name: "Brahmi Oil",
    category: ProductCategory.Oils,
    description: "Traditional Ayurvedic oil for hair and scalp health, promoting mental clarity and memory.",
    price: 350,
    stock: 30,
    images: [
      "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
    ],
    benefits: [
      "Promotes hair growth",
      "Reduces hair fall",
      "Improves memory and concentration",
      "Calms the mind"
    ],
    usage: "Massage into scalp and leave for 30 minutes before washing. Use 2-3 times weekly.",
    ingredients: ["Sesame Oil", "Brahmi Extract", "Coconut Oil", "Amla Extract"],
    reviews: [
      { userId: "u3", userName: "Anjali K.", rating: 5, comment: "My hair feels much healthier after using this for a month.", date: "2023-11-10" },
      { userId: "u4", userName: "Vikram R.", rating: 3, comment: "Works okay, but the oil is quite thick.", date: "2023-09-22" }
    ],
    rating: 4.0,
    isPopular: true,
    isNew: false
  },
  {
    id: "p3",
    name: "Triphala Supplement",
    category: ProductCategory.Supplements,
    description: "A blend of three fruits (Amalaki, Bibhitaki, and Haritaki) for digestive health and detoxification.",
    price: 550,
    discountPrice: 499,
    stock: 45,
    images: [
      "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg",
      "https://images.pexels.com/photos/3652170/pexels-photo-3652170.jpeg"
    ],
    benefits: [
      "Supports digestive health",
      "Natural detoxifier",
      "Reduces inflammation",
      "Improves nutrient absorption"
    ],
    usage: "Take 2 capsules with warm water before bedtime.",
    ingredients: ["Amalaki", "Bibhitaki", "Haritaki"],
    sideEffects: ["May cause loose stools initially"],
    reviews: [
      { userId: "u5", userName: "Deepak M.", rating: 5, comment: "Great for digestion and regular cleansing.", date: "2023-10-25" },
      { userId: "u6", userName: "Sonia G.", rating: 4, comment: "Works well but takes time to show results.", date: "2023-09-30" }
    ],
    rating: 4.3,
    isPopular: false,
    isNew: true
  },
  {
    id: "p4",
    name: "Copper Tongue Scraper",
    category: ProductCategory.Equipment,
    description: "Traditional Ayurvedic tool for oral hygiene and toxin removal.",
    price: 250,
    stock: 100,
    images: [
      "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg"
    ],
    benefits: [
      "Removes bacteria from the tongue",
      "Improves taste sensation",
      "Prevents bad breath",
      "Promotes oral hygiene"
    ],
    usage: "Use gently on the tongue every morning before brushing teeth.",
    reviews: [
      { userId: "u7", userName: "Amit B.", rating: 5, comment: "Simple but effective tool. My breath feels fresher.", date: "2023-11-15" },
      { userId: "u8", userName: "Neha P.", rating: 5, comment: "Good quality copper, doesn't tarnish easily.", date: "2023-10-10" }
    ],
    rating: 4.8,
    isPopular: true,
    isNew: false
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
}

export function getPopularProducts(limit: number = 4): Product[] {
  return products
    .filter(product => product.isPopular)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getNewProducts(limit: number = 4): Product[] {
  return products
    .filter(product => product.isNew)
    .slice(0, limit);
}

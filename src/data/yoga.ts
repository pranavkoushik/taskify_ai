
export enum PoseDifficulty {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  difficulty: PoseDifficulty;
  imageUrl: string;
  videoUrl?: string;
  benefits: string[];
  instructions: string[];
  contraindications?: string[];
  relatedPoses: string[];
  targetAreas: string[];
}

export interface WellnessArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  forDosha: string[];
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  benefits: string[];
  imageUrl: string;
}

// Mock data - Yoga poses
export const yogaPoses: YogaPose[] = [
  {
    id: "pose1",
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    difficulty: PoseDifficulty.Beginner,
    imageUrl: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
    videoUrl: "https://example.com/videos/tadasana.mp4",
    benefits: [
      "Improves posture",
      "Strengthens thighs, knees, and ankles",
      "Firms abdomen and buttocks",
      "Relieves sciatica"
    ],
    instructions: [
      "Stand with feet together and arms at your sides",
      "Distribute weight evenly across both feet",
      "Firm your thigh muscles",
      "Reach the crown of your head toward the ceiling",
      "Broaden your shoulders and collarbones"
    ],
    contraindications: [
      "Headache",
      "Low blood pressure",
      "Insomnia"
    ],
    relatedPoses: ["pose2", "pose3"],
    targetAreas: ["Legs", "Core", "Posture"]
  },
  {
    id: "pose2",
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    difficulty: PoseDifficulty.Beginner,
    imageUrl: "https://images.pexels.com/photos/6958349/pexels-photo-6958349.jpeg",
    videoUrl: "https://example.com/videos/vrikshasana.mp4",
    benefits: [
      "Improves balance and stability",
      "Strengthens legs and core",
      "Opens hips and groins",
      "Builds concentration"
    ],
    instructions: [
      "Start in Mountain Pose",
      "Shift weight to left foot",
      "Place right foot on left inner thigh or calf",
      "Bring palms together at heart center",
      "Fix gaze on a point in front of you"
    ],
    contraindications: [
      "Ankle or knee injury",
      "High blood pressure",
      "Migraine"
    ],
    relatedPoses: ["pose1", "pose4"],
    targetAreas: ["Balance", "Legs", "Core", "Concentration"]
  },
  {
    id: "pose3",
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    difficulty: PoseDifficulty.Beginner,
    imageUrl: "https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg",
    videoUrl: "https://example.com/videos/adho_mukha_svanasana.mp4",
    benefits: [
      "Stretches shoulders, hamstrings, calves, and hands",
      "Strengthens arms and legs",
      "Energizes the body",
      "Improves digestion"
    ],
    instructions: [
      "Start on hands and knees",
      "Tuck toes and lift hips toward ceiling",
      "Straighten legs as much as possible",
      "Press floor away with hands",
      "Relax neck and look toward navel"
    ],
    contraindications: [
      "Carpal tunnel syndrome",
      "Late-term pregnancy",
      "High blood pressure",
      "Detached retina"
    ],
    relatedPoses: ["pose1", "pose5"],
    targetAreas: ["Shoulders", "Hamstrings", "Arms", "Full Body"]
  }
];

// Mock data - Wellness articles
export const wellnessArticles: WellnessArticle[] = [
  {
    id: "article1",
    title: "The Ancient Wisdom of Dinacharya: Daily Routine for Health",
    author: "Dr. Ayush Sharma",
    date: "2023-11-15",
    category: "Lifestyle",
    imageUrl: "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg",
    summary: "Discover how implementing a daily routine according to Ayurvedic principles can transform your health and wellbeing.",
    content: "Dinacharya, or daily routine, is a concept in Ayurveda that emphasizes the importance of establishing a consistent daily schedule...",
    tags: ["Dinacharya", "Daily Routine", "Morning Rituals", "Ayurveda"]
  },
  {
    id: "article2",
    title: "Seasonal Eating: Aligning with Nature's Rhythms",
    author: "Dr. Meena Patel",
    date: "2023-10-22",
    category: "Nutrition",
    imageUrl: "https://images.pexels.com/photos/1660027/pexels-photo-1660027.jpeg",
    summary: "Learn why eating seasonally is crucial for health and how to adapt your diet according to Ayurvedic seasons.",
    content: "Ritucharya, or seasonal routine, is an essential aspect of Ayurvedic living that guides us on how to adapt our diet and lifestyle according to the changing seasons...",
    tags: ["Seasonal Eating", "Ritucharya", "Diet", "Nutrition"]
  },
  {
    id: "article3",
    title: "Understanding Doshas: Your Unique Ayurvedic Constitution",
    author: "Dr. Rajesh Gupta",
    date: "2023-09-30",
    category: "Fundamentals",
    imageUrl: "https://images.pexels.com/photos/3992206/pexels-photo-3992206.jpeg",
    summary: "Explore the three doshas—Vata, Pitta, and Kapha—and learn how identifying your constitution can help personalize your health approach.",
    content: "In Ayurveda, the three doshas—Vata, Pitta, and Kapha—are biological energies found throughout the human body and mind...",
    tags: ["Doshas", "Vata", "Pitta", "Kapha", "Constitution"]
  }
];

// Mock data - Diet plans
export const dietPlans: DietPlan[] = [
  {
    id: "diet1",
    name: "Vata-Balancing Diet",
    description: "A nourishing diet designed to pacify Vata dosha with warm, moist, and grounding foods.",
    forDosha: ["Vata"],
    meals: {
      breakfast: ["Warm oatmeal with cinnamon and ghee", "Stewed fruits", "Herbal tea"],
      lunch: ["Kitchari with vegetables", "Vegetable soup", "Whole grain bread"],
      dinner: ["Steamed vegetables with quinoa", "Lentil soup", "Warm milk with nutmeg"],
      snacks: ["Nuts and seeds", "Dates", "Warm fruit compote"]
    },
    benefits: [
      "Reduces anxiety and nervousness",
      "Improves digestion",
      "Enhances sleep quality",
      "Maintains healthy weight"
    ],
    imageUrl: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg"
  },
  {
    id: "diet2",
    name: "Pitta-Cooling Diet",
    description: "A cooling diet designed to pacify Pitta dosha with sweet, bitter, and astringent foods.",
    forDosha: ["Pitta"],
    meals: {
      breakfast: ["Coconut porridge", "Sweet fruits", "Mint tea"],
      lunch: ["Basmati rice with vegetables", "Cucumber raita", "Leafy greens"],
      dinner: ["Vegetable stir-fry", "Mung bean soup", "Coconut water"],
      snacks: ["Sweet fruits", "Coconut yogurt", "Sunflower seeds"]
    },
    benefits: [
      "Reduces inflammation and heat",
      "Calms irritability",
      "Improves skin health",
      "Enhances digestive fire without aggravation"
    ],
    imageUrl: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    id: "diet3",
    name: "Kapha-Stimulating Diet",
    description: "An energizing diet designed to pacify Kapha dosha with light, dry, and warming foods.",
    forDosha: ["Kapha"],
    meals: {
      breakfast: ["Spiced apple with honey", "Dry toast", "Ginger tea"],
      lunch: ["Millet with steamed vegetables", "Lentil soup with spices", "Green salad"],
      dinner: ["Baked vegetables", "Barley soup", "Herbal tea"],
      snacks: ["Pumpkin seeds", "Pomegranate", "Vegetable sticks"]
    },
    benefits: [
      "Reduces heaviness and congestion",
      "Improves metabolism",
      "Enhances energy levels",
      "Supports weight management"
    ],
    imageUrl: "https://images.pexels.com/photos/764925/pexels-photo-764925.jpeg"
  }
];

export function getYogaPoseById(id: string): YogaPose | undefined {
  return yogaPoses.find(pose => pose.id === id);
}

export function getYogaPosesByDifficulty(difficulty: PoseDifficulty): YogaPose[] {
  return yogaPoses.filter(pose => pose.difficulty === difficulty);
}

export function getArticleById(id: string): WellnessArticle | undefined {
  return wellnessArticles.find(article => article.id === id);
}

export function getArticlesByCategory(category: string): WellnessArticle[] {
  return wellnessArticles.filter(article => article.category === category);
}

export function getDietPlanById(id: string): DietPlan | undefined {
  return dietPlans.find(plan => plan.id === id);
}

export function getDietPlansByDosha(dosha: string): DietPlan[] {
  return dietPlans.filter(plan => plan.forDosha.includes(dosha));
}

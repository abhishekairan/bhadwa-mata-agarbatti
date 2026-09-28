import chandanImg from "@/assets/products/shahi-chandan.jpg";
import gugalImg from "@/assets/products/shahi-gugal.jpg";
import gulabImg from "@/assets/products/shahi-gulab.jpg";
import kewdaImg from "@/assets/products/shahi-kewda.jpg";
import mograImg from "@/assets/products/shahi-mogra.jpg";

export type Category = "Dhoop";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  categories?: Category[];
  subcategory: string;
  fragrance: string;
  description: string;
  price: number;
  oldPrice?: number;
  priceLabel?: string;
  packSize: string;
  gramOptions: string[];
  image: string;
  imageFiles?: string[];
  rating: number;
  reviewsCount: number;
  bestFor: string[];
  usageInstructions: string;
  badge?: "Bestseller" | "Premium" | "New" | "Traditional";
  mood?: string[];
}

// TODO: placeholder price and pack size for every product until the real ones are confirmed.
const ASSUMED_PRICE = 150;
const ASSUMED_PACK = "1 Jar";

const common = {
  category: "Dhoop" as const,
  categories: ["Dhoop" as const],
  subcategory: "Dhoop (Dry) Batti",
  price: ASSUMED_PRICE,
  packSize: ASSUMED_PACK,
  gramOptions: [ASSUMED_PACK],
  rating: 0,
  reviewsCount: 0,
  usageInstructions:
    "Bombless, charcoal-free dhoop sticks. Light the tip, let the flame settle into a steady smoulder, and place in a safe holder.",
};

export const products: Product[] = [
  {
    ...common,
    id: 1,
    name: "Shahi Chandan",
    slug: "shahi-chandan",
    fragrance: "Chandan",
    description:
      "Experience the serene warmth of pure sandalwood. Shahi Chandan dhoop batti comes as bombless, charcoal-free sticks in a Bhadwamata jar.",
    image: chandanImg,
    bestFor: ["Daily Puja", "Meditation"],
    mood: ["Morning Prayers", "Meditation & Yoga"],
  },
  {
    ...common,
    id: 2,
    name: "Shahi Gugal",
    slug: "shahi-gugal",
    fragrance: "Gugal",
    description:
      "Ancient purity for spiritual focus. Shahi Gugal dhoop batti comes as bombless, charcoal-free sticks in a Bhadwamata jar.",
    image: gugalImg,
    bestFor: ["Daily Puja", "Meditation", "Festive Pooja"],
    mood: ["Festive Pooja", "Temple Essentials"],
  },
  {
    ...common,
    id: 3,
    name: "Shahi Gulab",
    slug: "shahi-gulab",
    fragrance: "Gulab",
    description:
      "Immersive and comforting, the essence of million roses. Shahi Gulab dhoop batti comes as bombless, charcoal-free sticks in a Bhadwamata jar.",
    image: gulabImg,
    bestFor: ["Daily Home Fragrance"],
    mood: ["Daily Home Fragrance", "Stress Relief"],
  },
  {
    ...common,
    id: 4,
    name: "Shahi Kewda",
    slug: "shahi-kewda",
    fragrance: "Kewda",
    description:
      "Unique, captivating and earthy elegance. Shahi Kewda dhoop batti comes as bombless, charcoal-free sticks in a Bhadwamata jar.",
    image: kewdaImg,
    bestFor: ["Daily Home Fragrance"],
    mood: ["Daily Home Fragrance"],
  },
  {
    ...common,
    id: 5,
    name: "Shahi Mogra",
    slug: "shahi-mogra",
    fragrance: "Mogra",
    description:
      "A blooming jasmine paradise for your home. Shahi Mogra dhoop batti comes as bombless, charcoal-free sticks in a Bhadwamata jar.",
    image: mograImg,
    bestFor: ["Daily Home Fragrance"],
    mood: ["Daily Home Fragrance", "Stress Relief"],
  },
];

export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getByCategory = (cat: Category) =>
  products.filter((p) => (p.categories ?? [p.category]).includes(cat));

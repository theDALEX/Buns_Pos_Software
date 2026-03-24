import { collection, getDocs } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { db } from "./firebase";

export type MealDeal = {
  id: string;
  name: string;
  items: string[];
  originalPrice: number;
  dealPrice: number;
  icon: string;
};

export type MealDealsContextType = {
  mealDeals: MealDeal[];
  loading: boolean;
  error: string | null;
};

export const MealDealsContext = createContext<MealDealsContextType>({
  mealDeals: [],
  loading: true,
  error: null,
});

const SAMPLE_MEALS: MealDeal[] = [
  {
    id: "m1",
    name: "Classic Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink"],
    originalPrice: 10.97,
    dealPrice: 8.99,
    icon: "🍔",
  },
  {
    id: "m2",
    name: "Family Feast",
    items: [
      "2x Cheeseburgers",
      "2x Medium Pizzas",
      "2x Large Fries",
      "4x Soft Drinks",
    ],
    originalPrice: 34.5,
    dealPrice: 29.99,
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "m3",
    name: "Grilled Chicken Salad Deal",
    items: ["Grilled Chicken Salad", "Water", "Fruit Cup"],
    originalPrice: 9.75,
    dealPrice: 7.99,
    icon: "🥗",
  },
  {
    id: "m4",
    name: "Sweet Treat Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink", "Ice Cream"],
    originalPrice: 12.49,
    dealPrice: 9.99,
    icon: "🍦",
  },
];

export function MealDealsProvider({ children }: { children: ReactNode }) {
  const [mealDeals, setMealDeals] = useState<MealDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch meal deals from Firebase
  useEffect(() => {
    const fetchMealDeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, "mealDeals"));
        const deals: MealDeal[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          deals.push({
            id: doc.id,
            name: data.name,
            items: data.items,
            originalPrice: data.originalPrice,
            dealPrice: data.dealPrice,
            icon: data.icon,
          });
        });
        setMealDeals(deals);
      } catch (error) {
        console.error("Error fetching meal deals:", error);
        setError("Failed to load meal deals from database. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealDeals();
  }, []);

  return (
    <MealDealsContext.Provider value={{ mealDeals, loading, error }}>
      {children}
    </MealDealsContext.Provider>
  );
}
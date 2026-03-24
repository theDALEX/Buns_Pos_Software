import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "./firebase";

export type MenuItem = { 
  id: string; 
  name: string; 
  price: number;
  stock: number;
  icon: string;
};

export type CartItem = MenuItem & { quantity: number };

export type InventoryContextType = {
  items: MenuItem[];
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updatePrice: (id: string, newPrice: number) => void;
  updateStock: (id: string, newStock: number) => void;
  isEmployeeLoggedIn: boolean;
  currentUser: User | null;
  loginEmployee: (email: string, password: string) => Promise<boolean>;
  logoutEmployee: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

const EMPLOYEE_PASSWORD = "admin123"; // Simple password for demo

export const InventoryContext = createContext<InventoryContextType>({
  items: [],
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updatePrice: () => {},
  updateStock: () => {},
  isEmployeeLoggedIn: false,
  currentUser: null,
  loginEmployee: async () => false,
  logoutEmployee: async () => {},
  loading: true,
  error: null,
});

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items from Firebase
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const menuItems: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          menuItems.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            icon: data.icon,
          });
        });
        setItems(menuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Failed to load menu items from database. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsEmployeeLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  const addToCart = async (item: MenuItem) => {
    if (item.stock <= 0) return;

    try {
      // Update cart locally first
      setCart((prev) => {
        const existing = prev.find((ci) => ci.id === item.id);
        if (existing && existing.quantity < item.stock) {
          return prev.map((ci) =>
            ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
          );
        }
        if (!existing) {
          return [...prev, { ...item, quantity: 1 }];
        }
        return prev;
      });

      // Decrease stock in Firebase
      const newStock = item.stock - 1;
      const itemRef = doc(db, "menuItems", item.id);
      await updateDoc(itemRef, {
        stock: Math.max(0, newStock)
      });

      // Update local items state
      setItems((prev) =>
        prev.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, stock: Math.max(0, newStock) } : menuItem
        )
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Revert cart change on error
      setCart((prev) => prev.filter((ci) => ci.id !== item.id));
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const clearCart = () => setCart([]);

  const updatePrice = async (id: string, newPrice: number) => {
    try {
      // Update local state first for immediate UI feedback
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, price: Math.max(0, newPrice) } : item
        )
      );

      // Update Firebase
      const itemRef = doc(db, "menuItems", id);
      await updateDoc(itemRef, {
        price: Math.max(0, newPrice)
      });
    } catch (error) {
      console.error("Error updating price:", error);
      // Revert local change on error
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, price: items.find(i => i.id === id)?.price || 0 } : item
        )
      );
    }
  };

  const updateStock = async (id: string, newStock: number) => {
    try {
      // Update local state first
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
        )
      );

      // Update Firebase
      const itemRef = doc(db, "menuItems", id);
      await updateDoc(itemRef, {
        stock: Math.max(0, newStock)
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      // Revert local change on error
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, stock: items.find(i => i.id === id)?.stock || 0 } : item
        )
      );
    }
  };

  const loginEmployee = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logoutEmployee = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updatePrice,
        updateStock,
        isEmployeeLoggedIn,
        currentUser,
        loginEmployee,
        logoutEmployee,
        loading,
        error,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

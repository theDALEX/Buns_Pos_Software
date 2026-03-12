import { createContext, ReactNode, useState } from "react";

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
  loginEmployee: (password: string) => boolean;
  logoutEmployee: () => void;
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
  loginEmployee: () => false,
  logoutEmployee: () => {},
});

const INITIAL_ITEMS: MenuItem[] = [
  { id: "1", name: "Cheeseburger", price: 5.99, stock: 20, icon: "🍔" },
  { id: "2", name: "Fries", price: 2.99, stock: 30, icon: "🍟" },
  { id: "3", name: "Soda", price: 1.99, stock: 50, icon: "🥤" },
  { id: "4", name: "Pizza", price: 8.5, stock: 15, icon: "🍕" },
  { id: "5", name: "Ice Cream", price: 3.25, stock: 25, icon: "🍦" },
  { id: "6", name: "Salad", price: 4.75, stock: 18, icon: "🥗" },
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);

  const addToCart = (item: MenuItem) => {
    if (item.stock <= 0) return;
    
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
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const clearCart = () => setCart([]);

  const updatePrice = (id: string, newPrice: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: Math.max(0, newPrice) } : item
      )
    );
  };

  const updateStock = (id: string, newStock: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
      )
    );
  };

  const loginEmployee = (password: string) => {
    if (password === EMPLOYEE_PASSWORD) {
      setIsEmployeeLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutEmployee = () => {
    setIsEmployeeLoggedIn(false);
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
        loginEmployee,
        logoutEmployee,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

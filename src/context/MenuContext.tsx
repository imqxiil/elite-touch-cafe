"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "HOT DRINKS" | "COLD DRINKS";
}

interface MenuContextType {
  menuItems: MenuItem[];
  loading: boolean;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchMenuItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMenuItems(
        data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          category: item.category,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) await fetchMenuItems();
  };

  const updateMenuItem = async (id: string, updatedItem: Partial<MenuItem>) => {
    const res = await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedItem }),
    });
    if (res.ok) await fetchMenuItems();
  };

  const deleteMenuItem = async (id: string) => {
    const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
    if (res.ok) await fetchMenuItems();
  };

  return (
    <MenuContext.Provider
      value={{ menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}

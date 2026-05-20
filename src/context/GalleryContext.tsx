"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface GalleryContextType {
  images: GalleryImage[];
  loading: boolean;
  addImage: (src: string, alt: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setImages(
        data.map((img) => ({
          id: img.id,
          src: img.src,
          alt: img.alt,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addImage = async (src: string, alt: string) => {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src, alt }),
    });
    if (res.ok) await fetchImages();
  };

  const deleteImage = async (id: string) => {
    const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    if (res.ok) await fetchImages();
  };

  return (
    <GalleryContext.Provider value={{ images, loading, addImage, deleteImage }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}

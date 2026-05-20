"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export interface HeroConfig {
  mainTitle: string;
  arabicSubtitle: string;
  tagline: string;
  status: "open" | "soon";
  heroImageUrl: string;
  signatureTitle: string;
  signatureDescription: string;
  menuTitle: string;
  menuDescription: string;
}

export interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface InfoConfig {
  phone: string;
  location: string;
  tiktok: string;
  hours: OperatingHour[];
}

interface SiteConfigContextType {
  heroConfig: HeroConfig;
  updateHeroConfig: (config: HeroConfig) => Promise<void>;
  infoConfig: InfoConfig;
  updateInfoConfig: (config: InfoConfig) => Promise<void>;
  isLoaded: boolean;
}

const DEFAULT_HERO: HeroConfig = {
  mainTitle: "Elite Touch Cafe",
  arabicSubtitle: "لمسة النُخبة",
  tagline: "An unparalleled culinary journey awaits. Discover refined tastes in an atmosphere of quiet luxury.",
  status: "open",
  heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVDjdUksc5_4cXryNG5YJ8Wlv2dSE1ZoWU4n80KDfetDQJkb-_BZyCKpZ34nu7m_jacBuPpNgJ6RjgZLIE1d8UBuMTnchCW5LQ-oFTCJ4h_VtkjX4PQtPcbfbmLanBI2l1Hz9YvtrndVE-5scM9aKsVOs2IekZ6oaOELrVOUK7RYLpnFWgJJPAnyIUhGESyzkm8WwP5T2JHnWrtz_2zSMGVA8IDmgdj7xxunT8J86O7I3CnZVqwD8z7kDz_zSs-_xMJTq90qerLA7y",
  signatureTitle: "Signature Pour",
  signatureDescription: "A curated selection of our finest blends, crafted with precision and an uncompromising dedication to the art of coffee.",
  menuTitle: "Curated Selections",
  menuDescription: "Explore our meticulously crafted offerings, designed to provide a moment of refined indulgence. Each item reflects our commitment to premium ingredients and quiet luxury.",
};

const DEFAULT_INFO: InfoConfig = {
  phone: "12345678",
  location: "Downtown Aspire",
  tiktok: "@elitetouchcafe",
  hours: [
    { day: "Monday",    open: "08:00", close: "22:00", isOpen: true },
    { day: "Tuesday",   open: "08:00", close: "22:00", isOpen: true },
    { day: "Wednesday", open: "08:00", close: "22:00", isOpen: true },
    { day: "Thursday",  open: "08:00", close: "23:00", isOpen: true },
    { day: "Friday",    open: "08:00", close: "23:00", isOpen: false },
    { day: "Saturday",  open: "09:00", close: "23:00", isOpen: true },
    { day: "Sunday",    open: "09:00", close: "21:00", isOpen: true },
  ],
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [infoConfig, setInfoConfig] = useState<InfoConfig>(DEFAULT_INFO);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const loadConfig = async () => {
      // Load hero config
      const { data: heroData } = await supabase
        .from("site_config")
        .select("*")
        .limit(1)
        .single();

      if (heroData) {
        setHeroConfig({
          mainTitle: heroData.main_title,
          arabicSubtitle: heroData.arabic_subtitle,
          tagline: heroData.tagline,
          status: heroData.status,
          heroImageUrl: heroData.hero_image_url || DEFAULT_HERO.heroImageUrl,
          signatureTitle: heroData.signature_title || DEFAULT_HERO.signatureTitle,
          signatureDescription: heroData.signature_description || DEFAULT_HERO.signatureDescription,
          menuTitle: heroData.menu_title || DEFAULT_HERO.menuTitle,
          menuDescription: heroData.menu_description || DEFAULT_HERO.menuDescription,
        });
      }

      // Load info config
      const { data: infoData } = await supabase
        .from("info_config")
        .select("*")
        .limit(1)
        .single();

      // Load operating hours
      const { data: hoursData } = await supabase
        .from("operating_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (infoData) {
        setInfoConfig({
          phone: infoData.phone,
          location: infoData.location,
          tiktok: infoData.tiktok,
          hours: hoursData
            ? hoursData.map((h) => ({
                day: h.day,
                open: h.open_time,
                close: h.close_time,
                isOpen: h.is_open,
              }))
            : DEFAULT_INFO.hours,
        });
      }

      setIsLoaded(true);
    };

    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHeroConfig = async (config: HeroConfig) => {
    setHeroConfig(config);

    await fetch("/api/config/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
  };

  const updateInfoConfig = async (config: InfoConfig) => {
    setInfoConfig(config);

    await fetch("/api/config/info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
  };

  return (
    <SiteConfigContext.Provider
      value={{ heroConfig, updateHeroConfig, infoConfig, updateInfoConfig, isLoaded }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}

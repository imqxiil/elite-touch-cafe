"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { name: "Menu", href: "/admin/menu", icon: "restaurant_menu" },
  { name: "Gallery", href: "/admin/gallery", icon: "collections" },
  { name: "Hero Banner", href: "/admin/hero", icon: "image_aspect_ratio" },
  { name: "Info & Hours", href: "/admin/info", icon: "schedule" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex bg-surface fixed left-0 top-0 h-full w-64 border-r border-outline-variant flex-col py-lg px-md z-20">
      <div className="mb-xl px-sm">
        <h1 className="text-headline-md text-primary mb-xs font-medium">Elite Touch Cafe</h1>
        <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Admin Portal</p>
      </div>

      <ul className="flex flex-col gap-sm flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center gap-md px-md py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "text-primary font-bold bg-surface-container-low border-r-2 border-primary" 
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-label-sm uppercase tracking-widest">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-lg border-t border-outline-variant px-sm">
        <Link 
          href="/"
          className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary py-4 px-md rounded text-label-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          View Live Site
        </Link>
      </div>
    </nav>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotificationItem } from "@/utils/notifications";
import { createClient } from "@/utils/supabase/client";

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();
  const supabase = createClient();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("elite_notifications");
      setNotifications(saved ? JSON.parse(saved) : []);
    }
  };

  // Load notifications on mount and set up custom listeners
  useEffect(() => {
    setTimeout(() => {
      loadNotifications();
    }, 0);

    const handleUpdate = () => {
      loadNotifications();
    };

    window.addEventListener("elite-notification-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("elite-notification-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, unread: false }));
    setNotifications(updated);
    localStorage.setItem("elite_notifications", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("elite-notification-update"));
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.setItem("elite_notifications", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("elite-notification-update"));
  };

  const handleNotificationClick = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, unread: false } : n);
    setNotifications(updated);
    localStorage.setItem("elite_notifications", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("elite-notification-update"));
  };

  return (
    <header className="bg-surface/80 backdrop-blur-xl border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop py-4 z-40 hidden md:flex h-[72px] relative">
      <div className="flex items-center gap-md">
        <span className="text-headline-sm text-primary font-medium">Elite Touch Cafe</span>
      </div>
      <div className="flex items-center gap-lg">
        
        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 relative p-1 flex items-center justify-center rounded-full hover:bg-surface-container-low focus:outline-none"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface animate-pulse"></span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-surface border border-outline-variant rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
              <header className="px-md py-sm border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <span className="text-label-sm text-primary font-bold tracking-wider uppercase">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-primary hover:underline uppercase tracking-wider font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </header>

              <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/30">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n.id)}
                      className={`p-md cursor-pointer transition-colors hover:bg-surface-container-low flex flex-col gap-xs ${
                        n.unread ? "bg-primary/[0.02] border-l-2 border-primary" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-label-sm font-bold ${n.unread ? "text-primary" : "text-on-surface-variant"}`}>
                          {n.title}
                        </span>
                        <span className="text-[9px] text-outline uppercase">{n.time}</span>
                      </div>
                      <p className="text-body-md text-on-surface-variant text-xs leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-lg text-center flex flex-col items-center gap-sm text-outline-variant">
                    <span className="material-symbols-outlined text-3xl">notifications_off</span>
                    <p className="text-xs italic">All caught up</p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <footer className="px-md py-sm border-t border-outline-variant text-center bg-surface-container-lowest">
                  <button 
                    onClick={handleClearAll}
                    className="text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-wider font-medium"
                  >
                    Clear All
                  </button>
                </footer>
              )}
            </div>
          )}
        </div>

        <div className="w-[1px] h-6 bg-outline-variant mx-xs"></div>
        
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/admin/login");
          }}
          className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors duration-200 flex items-center gap-xs uppercase tracking-widest">
          Logout
          <span className="material-symbols-outlined text-[16px]">logout</span>
        </button>


      </div>
    </header>
  );
}

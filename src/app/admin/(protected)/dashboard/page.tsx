"use client";

import { useMenu } from "@/context/MenuContext";
import { useGallery } from "@/context/GalleryContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { menuItems } = useMenu();
  const { images } = useGallery();

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-xxl flex flex-col md:flex-row md:items-end justify-between gap-lg border-b border-outline-variant pb-lg">
        <div>
          <h2 className="text-display-lg text-primary mb-sm font-medium">Welcome back, Admin</h2>
          <p className="text-body-lg text-on-surface-variant">Here is a summary of your cafe&apos;s digital presence today.</p>
        </div>
        <div className="flex gap-md">
          <Link
            href="/admin/menu"
            className="px-8 py-3 bg-primary text-on-primary text-label-sm rounded hover:opacity-90 transition-opacity flex items-center gap-sm uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Menu Item
          </Link>
        </div>
      </div>

      {/* Bento Grid: Stats & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-xxl">
        {/* Stats Grid (Spans 8 cols) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          {/* Stat Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between h-[160px] hover:shadow-[0_20px_40px_-15px_rgba(0,6,102,0.15)] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Total Menu Items</p>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">restaurant</span>
            </div>
            <div>
              <p className="text-headline-md text-primary font-medium">{menuItems.length}</p>
              <p className="text-label-sm text-secondary mt-xs flex items-center gap-xs uppercase tracking-widest">
                <span className="material-symbols-outlined text-[14px]">sync</span> Active in catalog
              </p>
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between h-[160px] hover:shadow-[0_20px_40px_-15px_rgba(0,6,102,0.15)] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Gallery Images</p>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">photo_library</span>
            </div>
            <div>
              <p className="text-headline-md text-primary font-medium">{images.length}</p>
              <p className="text-label-sm text-outline mt-xs flex items-center gap-xs uppercase tracking-widest">
                <span className="material-symbols-outlined text-[14px]">sync</span> Up to date
              </p>
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between h-[160px] hover:shadow-[0_20px_40px_-15px_rgba(0,6,102,0.15)] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Website Status</p>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">public</span>
            </div>
            <div>
              <p className="text-headline-md text-primary flex items-center gap-sm font-medium">
                <span className="w-3 h-3 rounded-full bg-secondary-container inline-block"></span> Live
              </p>
              <p className="text-label-sm text-outline mt-xs uppercase tracking-widest">All systems operational</p>
            </div>
          </div>
          {/* Stat Card 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between h-[160px] hover:shadow-[0_20px_40px_-15px_rgba(0,6,102,0.15)] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Last Updated</p>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">update</span>
            </div>
            <div>
              <p className="text-headline-sm text-primary font-medium">Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-label-sm text-outline mt-xs uppercase tracking-widest">By Admin User</p>
            </div>
          </div>
        </div>

        {/* Quick Actions (Spans 4 cols) */}
        <div className="md:col-span-4 bg-surface-container-low border border-outline-variant rounded-lg p-lg flex flex-col">
          <h3 className="text-headline-sm text-primary mb-lg font-medium">Quick Actions</h3>
          <div className="flex flex-col gap-md flex-1 justify-center">
            <Link
              href="/admin/menu"
              className="w-full py-4 px-8 bg-transparent border border-primary text-primary text-label-sm rounded hover:bg-primary hover:text-on-primary transition-all flex items-center justify-between group uppercase tracking-widest"
            >
              <span className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                Manage Menu
              </span>
              <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">arrow_forward</span>
            </Link>
            <Link
              href="/admin/gallery"
              className="w-full py-4 px-8 bg-transparent border border-primary text-primary text-label-sm rounded hover:bg-primary hover:text-on-primary transition-all flex items-center justify-between group uppercase tracking-widest"
            >
              <span className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                Upload Image
              </span>
              <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">arrow_forward</span>
            </Link>
            <Link
              href="/admin/hero"
              className="w-full py-4 px-8 bg-transparent border border-primary text-primary text-label-sm rounded hover:bg-primary hover:text-on-primary transition-all flex items-center justify-between group uppercase tracking-widest"
            >
              <span className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">edit_document</span>
                Edit Hero
              </span>
              <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-outline-variant pt-xl mb-xl">
        <h3 className="text-headline-sm text-primary mb-lg font-medium">Recent Activity</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div>
                <p className="text-body-md text-on-surface">Updated price for &quot;Elite Pour Over&quot;</p>
                <p className="text-label-sm text-outline mt-xs uppercase tracking-widest">Today, 09:41 AM</p>
              </div>
            </div>
            <span className="text-label-sm text-secondary uppercase tracking-widest">Menu</span>
          </div>
          <div className="flex items-center justify-between p-md hover:bg-surface-container-low transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">add_photo_alternate</span>
              </div>
              <div>
                <p className="text-body-md text-on-surface">Added 2 new images to &quot;Interior&quot; gallery</p>
                <p className="text-label-sm text-outline mt-xs uppercase tracking-widest">Yesterday, 14:20 PM</p>
              </div>
            </div>
            <span className="text-label-sm text-secondary uppercase tracking-widest">Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

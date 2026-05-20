"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/context/MenuContext";
import { useGallery } from "@/context/GalleryContext";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<MenuItem, "id">) => void;
  editItem?: MenuItem | null;
}

export default function MenuItemModal({ isOpen, onClose, onSave, editItem }: MenuItemModalProps) {
  const { images: galleryImages } = useGallery();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "HOT DRINKS" as "HOT DRINKS" | "COLD DRINKS"
  });
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreviewError(false);
      if (editItem) {
        setFormData({
          name: editItem.name,
          description: editItem.description,
          price: editItem.price.toString(),
          image: editItem.image,
          category: editItem.category
        });
      } else {
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "HOT DRINKS"
        });
      }
    }, 0);
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-2xl rounded-xl shadow-2xl border border-outline-variant animate-fade-in overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Preview (Hidden on mobile if needed, or shown top) */}
        <div className="w-full md:w-72 bg-surface border-r border-outline-variant p-lg flex flex-col items-center justify-center gap-md">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest self-start">Live Preview</p>
          <div className="w-full aspect-square rounded-lg bg-white border border-outline-variant overflow-hidden flex items-center justify-center group relative">
            {formData.image && !previewError ? (
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover animate-fade-in"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="flex flex-col items-center text-outline-variant gap-sm">
                <span className="material-symbols-outlined text-4xl">image</span>
                <p className="text-[10px] uppercase tracking-widest text-center px-4">
                  {previewError ? "Invalid Image URL" : "No Image Selected"}
                </p>
              </div>
            )}
          </div>
          <div className="text-center">
            <h4 className="text-headline-sm text-primary truncate w-60">{formData.name || "Item Name"}</h4>
            <p className="text-body-md text-primary font-bold mt-xs">
              ${formData.price ? parseFloat(formData.price).toFixed(2) : "0.00"}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 overflow-y-auto">
          <header className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-white sticky top-0 z-10">
            <h3 className="text-headline-sm text-primary font-medium">
              {editItem ? "Edit Menu Item" : "Add New Item"}
            </h3>
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <form onSubmit={handleSubmit} className="p-lg space-y-6">
            <div className="space-y-2">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Item Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Description</label>
              <textarea 
                required
                className="w-full h-20 px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Price ($)</label>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as "HOT DRINKS" | "COLD DRINKS"})}
                >
                  <option value="HOT DRINKS">Hot Drinks</option>
                  <option value="COLD DRINKS">Cold Drinks</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Image URL</label>
                <input 
                  required
                  type="url" 
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md"
                  placeholder="Paste Unsplash URL here..."
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({...formData, image: e.target.value});
                    setPreviewError(false);
                  }}
                />
              </div>

              {/* Quick Pick Section */}
              <div className="space-y-2">
                <label className="text-[10px] text-outline-variant uppercase tracking-widest font-bold">Quick Pick Gallery</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {galleryImages.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => {
                        setFormData({...formData, image: img.src});
                        setPreviewError(false);
                      }}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all shrink-0 hover:scale-105 ${
                        formData.image === img.src ? "border-primary shadow-lg scale-110" : "border-transparent"
                      }`}
                      title={img.alt}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-primary/20 flex items-center justify-center transition-opacity ${
                        formData.image === img.src ? "opacity-100" : "opacity-0"
                      }`}>
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                      </div>
                    </button>
                  ))}
                  {galleryImages.length === 0 && (
                     <p className="text-xs text-on-surface-variant italic py-2">No images in gallery yet. Add some in the Gallery Manager.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4 sticky bottom-0 bg-white py-lg border-t border-outline-variant">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-3 border border-outline-variant text-on-surface-variant text-label-sm rounded uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3 bg-primary text-on-primary text-label-sm rounded uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
              >
                {editItem ? "Update Item" : "Create Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

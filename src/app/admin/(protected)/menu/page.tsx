"use client";

import { useState } from "react";
import { useMenu, MenuItem } from "@/context/MenuContext";
import MenuItemModal from "@/components/admin/MenuItemModal";
import { addAdminNotification } from "@/utils/notifications";

export default function MenuManager() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [activeTab, setActiveTab] = useState<"ALL" | "HOT DRINKS" | "COLD DRINKS">("ALL");

  const filteredItems = activeTab === "ALL" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Omit<MenuItem, "id">) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
      addAdminNotification("Menu Item Updated", `Updated item "${itemData.name}" information`);
    } else {
      addMenuItem(itemData);
      addAdminNotification("Menu Item Added", `Added new menu item "${itemData.name}" ($${itemData.price.toFixed(2)})`);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      {/* Header Section */}
      <div className="flex justify-between items-end pb-sm border-b border-outline-variant">
        <div>
          <h2 className="text-display-lg text-primary font-medium">Menu Items</h2>
          <p className="text-body-md text-on-surface-variant mt-sm">Manage your cafe&apos;s offerings across all categories.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-primary text-on-primary text-label-sm px-8 py-3 rounded hover:bg-primary-container transition-all shadow-[0_4px_20px_-2px_rgba(0,6,102,0.15)] flex items-center gap-sm uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-lg border-b border-outline-variant/50">
        {(["ALL", "HOT DRINKS", "COLD DRINKS"] as const).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-label-sm pb-sm px-sm tracking-widest uppercase transition-all ${
              activeTab === tab 
                ? "text-primary border-b-2 border-primary font-bold" 
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="text-label-sm text-on-surface-variant py-4 px-lg font-medium uppercase tracking-widest">Image</th>
              <th className="text-label-sm text-on-surface-variant py-4 px-lg font-medium uppercase tracking-widest">Item Name</th>
              <th className="text-label-sm text-on-surface-variant py-4 px-lg font-medium uppercase tracking-widest">Category</th>
              <th className="text-label-sm text-on-surface-variant py-4 px-lg font-medium text-right uppercase tracking-widest">Price</th>
              <th className="text-label-sm text-on-surface-variant py-4 px-lg font-medium text-center uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {filteredItems.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => handleOpenEditModal(item)}
                className="hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <td className="py-4 px-lg">
                  <div className="w-14 h-14 rounded bg-surface-variant overflow-hidden border border-outline-variant relative">
                    <img 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      src={item.image}
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm">edit</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-lg">
                  <div className="flex flex-col">
                    <span className="text-headline-sm text-on-surface font-medium">{item.name}</span>
                    <span className="text-[10px] text-outline line-clamp-1 max-w-[200px] uppercase tracking-tighter">{item.description}</span>
                  </div>
                </td>
                <td className="py-4 px-lg">
                  <span className="inline-block px-4 py-1 bg-secondary-container/20 text-on-secondary-container text-label-sm rounded-full tracking-widest uppercase">
                    {item.category.replace("_", " ")}
                  </span>
                </td>
                <td className="py-4 px-lg text-right">
                  <span className="text-body-lg text-primary font-medium">${item.price.toFixed(2)}</span>
                </td>
                <td className="py-4 px-lg text-center">
                  <div className="flex items-center justify-center gap-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(item);
                      }}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm("Are you sure you want to delete this item?")) {
                          deleteMenuItem(item.id);
                          addAdminNotification("Menu Item Deleted", `Removed "${item.name}" from the menu`);
                        }
                      }}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors rounded"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={5} className="py-20 text-center text-on-surface-variant italic">
                  No items found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <MenuItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editItem={editingItem}
      />

      {/* Watermark Footer */}
      <div className="mt-auto pt-xl pb-lg flex justify-center opacity-10 select-none pointer-events-none">
        <span className="text-display-lg text-primary font-display italic">Et</span>
      </div>
    </div>
  );
}

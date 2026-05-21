"use client";

import { useState } from "react";
import { useGallery } from "@/context/GalleryContext";
import { addAdminNotification } from "@/utils/notifications";

export default function GalleryManager() {
  const { images, addImage, uploadImageFile, deleteImage } = useGallery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ src: "", alt: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.alt) return;
    if (!newImage.src && !selectedFile) return;

    setIsUploading(true);
    try {
      if (selectedFile) {
        await uploadImageFile(selectedFile, newImage.alt);
        addAdminNotification("Gallery Updated", `Uploaded new image "${newImage.alt}" to gallery`);
      } else if (newImage.src) {
        await addImage(newImage.src, newImage.alt);
        addAdminNotification("Gallery Updated", `Added new image "${newImage.alt}" to gallery`);
      }
      setNewImage({ src: "", alt: "" });
      setSelectedFile(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      addAdminNotification("Upload Failed", "Failed to add image. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-xl">
      {/* Header */}
      <div className="flex justify-between items-end mb-xl border-b border-outline-variant pb-sm">
        <div>
          <h2 className="text-display-lg text-primary font-medium">Gallery</h2>
          <p className="text-body-lg text-on-surface-variant">Manage the images displayed in your public gallery.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary text-label-sm py-4 px-8 rounded hover:bg-primary/90 transition-all flex items-center gap-sm uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-lg">
        {images.map((img) => (
          <div key={img.id} className="relative rounded-lg overflow-hidden border border-outline-variant aspect-square bg-white shadow-sm">
            <img 
              alt={img.alt} 
              className="w-full h-full object-cover transition-transform duration-700" 
              src={img.src} 
            />
            {/* Always visible delete button at top right */}
            <button 
              onClick={() => {
                if(confirm(`Delete image "${img.alt}"?`)) {
                  deleteImage(img.id);
                  addAdminNotification("Gallery Updated", `Deleted image "${img.alt}" from gallery`);
                }
              }}
              className="absolute top-2 right-2 w-10 h-10 bg-error/90 text-on-error rounded-full flex items-center justify-center hover:bg-error transition-colors shadow-lg z-10"
              title="Delete Image"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
            {/* Always visible label at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-md p-2">
              <p className="text-white text-xs uppercase tracking-widest font-bold text-center truncate">{img.alt}</p>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-outline-variant rounded-xl">
            <p className="text-on-surface-variant italic">No images in your gallery yet.</p>
          </div>
        )}
      </div>

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-[500px] max-w-[95vw] rounded-xl shadow-2xl border border-outline-variant overflow-hidden relative">
            <header className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-white">
              <h3 className="text-headline-sm text-primary font-medium">Add Gallery Image</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                disabled={isUploading}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleAddImage} className="p-6 space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Upload Local File</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setNewImage({...newImage, src: URL.createObjectURL(file)});
                      }
                    }}
                    disabled={isUploading}
                    className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px bg-outline-variant flex-1"></div>
                  <span className="text-xs text-on-surface-variant uppercase tracking-widest">OR</span>
                  <div className="h-px bg-outline-variant flex-1"></div>
                </div>

                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md disabled:opacity-50 disabled:bg-gray-50"
                    value={selectedFile ? "" : newImage.src}
                    disabled={!!selectedFile || isUploading}
                    onChange={(e) => {
                      setSelectedFile(null);
                      setNewImage({...newImage, src: e.target.value});
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest">Alt Text / Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Signature Coffee"
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded focus:border-primary outline-none transition-all text-body-md disabled:opacity-50"
                  value={newImage.alt}
                  disabled={isUploading}
                  onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                />
              </div>

              {newImage.src && (
                <div className="space-y-2">
                  <label className="text-[10px] text-outline uppercase tracking-widest">Preview</label>
                  <div className="w-full aspect-video rounded overflow-hidden border border-outline-variant bg-white">
                    <img src={newImage.src} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  disabled={isUploading}
                  onClick={() => {
                    setNewImage({ src: "", alt: "" });
                    setSelectedFile(null);
                    setIsModalOpen(false);
                  }}
                  className="flex-1 py-3 border border-outline-variant text-on-surface-variant text-label-sm rounded uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading || (!newImage.src && !selectedFile)}
                  className="flex-1 py-3 bg-primary text-on-primary text-label-sm rounded uppercase tracking-widest hover:opacity-90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Uploading...
                    </>
                  ) : (
                    "Add to Gallery"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-auto pt-lg border-t border-outline-variant flex justify-between items-center text-on-surface-variant text-body-md">
        <span>Showing {images.length} images</span>
      </div>
    </div>
  );
}

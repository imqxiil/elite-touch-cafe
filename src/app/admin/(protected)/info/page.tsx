"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { addAdminNotification } from "@/utils/notifications";

export default function InfoHoursEditor() {
  const { infoConfig, updateInfoConfig } = useSiteConfig();

  const [phone, setPhone] = useState(infoConfig.phone);
  const [location, setLocation] = useState(infoConfig.location);
  const [tiktok, setTiktok] = useState(infoConfig.tiktok);
  const [hours, setHours] = useState(infoConfig.hours);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPhone(infoConfig.phone);
      setLocation(infoConfig.location);
      setTiktok(infoConfig.tiktok);
      setHours(infoConfig.hours);
    }, 0);
  }, [infoConfig]);

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].isOpen = !newHours[index].isOpen;
    setHours(newHours);
  };

  const updateTime = (index: number, field: "open" | "close", value: string) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const handleSave = () => {
    updateInfoConfig({
      phone,
      location,
      tiktok,
      hours
    });
    addAdminNotification("Info Updated", "Cafe contact details and operating hours updated");
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      <header className="mb-xl border-b border-outline-variant pb-sm">
        <h2 className="text-display-lg text-primary font-medium">Info & Hours</h2>
        <p className="text-body-lg text-on-surface-variant mt-sm">Manage contact details and operational hours.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-xxl items-start">
        {/* Left Column: Contact Info */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-xl">
          <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
            <h3 className="text-headline-sm text-primary mb-lg pb-sm border-b border-outline-variant flex items-center gap-sm font-medium">
              <span className="material-symbols-outlined">contact_support</span>
              Contact Details
            </h3>
            <div className="flex flex-col gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="phone">Phone Number</label>
                <input 
                  className="bg-transparent border-b border-outline-variant focus:border-primary outline-none text-body-lg text-on-surface py-2 transition-colors w-full" 
                  id="phone" 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="location">Location</label>
                <input 
                  className="bg-transparent border-b border-outline-variant focus:border-primary outline-none text-body-lg text-on-surface py-2 transition-colors w-full" 
                  id="location" 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-[0.1em]" htmlFor="tiktok">TikTok Handle</label>
                <input 
                  className="bg-transparent border-b border-outline-variant focus:border-primary outline-none text-body-lg text-on-surface py-2 transition-colors w-full" 
                  id="tiktok" 
                  type="text" 
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Opening Hours */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-xl">
          <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
            <h3 className="text-headline-sm text-primary mb-lg pb-sm border-b border-outline-variant flex items-center gap-sm font-medium">
              <span className="material-symbols-outlined">calendar_clock</span>
              Operational Hours
            </h3>
            <div className="flex flex-col gap-md">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-sm pb-sm border-b border-outline-variant/50 hidden md:grid">
                <div className="col-span-3 text-label-sm text-on-surface-variant uppercase tracking-wider">Day</div>
                <div className="col-span-3 text-label-sm text-on-surface-variant uppercase tracking-wider">Open</div>
                <div className="col-span-3 text-label-sm text-on-surface-variant uppercase tracking-wider">Close</div>
                <div className="col-span-3 text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Status</div>
              </div>
              
              {/* Day Rows */}
              {hours.map((day, index) => (
                <div key={day.day} className={`grid grid-cols-1 md:grid-cols-12 gap-sm items-center py-4 border-b border-outline-variant/20 border-dotted last:border-0 ${!day.isOpen ? "opacity-50" : ""}`}>
                  <div className="col-span-1 md:col-span-3 text-body-md text-on-surface font-bold">{day.day}</div>
                  <div className="col-span-1 md:col-span-3">
                    <input 
                      className="bg-surface border border-outline-variant rounded px-2 py-1.5 text-body-md focus:border-primary outline-none w-full md:w-auto disabled:bg-surface-container-low" 
                      type="time" 
                      value={day.open}
                      disabled={!day.isOpen}
                      onChange={(e) => updateTime(index, "open", e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <input 
                      className="bg-surface border border-outline-variant rounded px-2 py-1.5 text-body-md focus:border-primary outline-none w-full md:w-auto disabled:bg-surface-container-low" 
                      type="time" 
                      value={day.close}
                      disabled={!day.isOpen}
                      onChange={(e) => updateTime(index, "close", e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-end">
                    <button 
                      onClick={() => toggleDay(index)}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${day.isOpen ? "bg-primary" : "bg-outline-variant"}`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${day.isOpen ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Global Action */}
      <div className="mt-xl flex justify-end border-t border-outline-variant pt-lg">
        <button 
          onClick={handleSave}
          className="bg-primary text-on-primary text-label-sm uppercase tracking-widest py-4 px-10 rounded hover:opacity-90 transition-all flex items-center gap-sm shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isSaved ? "check_circle" : "save"}
          </span>
          {isSaved ? "Saved Successfully" : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}

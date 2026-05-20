export interface NotificationItem {
  id: string;
  title: string;
  text: string;
  time: string;
  unread: boolean;
}

export function addAdminNotification(title: string, text: string) {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem("elite_notifications");
    const list: NotificationItem[] = saved ? JSON.parse(saved) : [];
    
    // Format timestamp nicely
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    });

    const newItem: NotificationItem = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      text,
      time: timeString,
      unread: true
    };

    // Store up to 20 notifications to optimize storage
    const updated = [newItem, ...list].slice(0, 20);
    localStorage.setItem("elite_notifications", JSON.stringify(updated));
    
    // Broadcast event to listeners
    window.dispatchEvent(new CustomEvent("elite-notification-update"));
  } catch (e) {
    console.error("Failed to add notification", e);
  }
}

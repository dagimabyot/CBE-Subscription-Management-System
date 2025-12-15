import { useCallback, useMemo, useState } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";
export type NotificationCategory = "subscription" | "system" | "user" | "report";
export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface NotificationItemData {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  category: NotificationCategory;
  priority: NotificationPriority;
  actionRequired?: boolean;
  avatar?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItemData[]>([]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isStarred: !n.isStarred } : n)));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  return useMemo(
    () => ({ notifications, setNotifications, markAsRead, toggleStar, deleteNotification, markAllAsRead }),
    [notifications, markAsRead, toggleStar, deleteNotification, markAllAsRead]
  );
} 
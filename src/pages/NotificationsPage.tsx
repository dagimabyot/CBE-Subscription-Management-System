import { useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  Search,
  Check,
  AlertTriangle,
  Info,
  CheckCircle,
  MoreHorizontal,
  Archive,
  Star,
  StarOff,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotifications";

type CategoryValue = "all" | "subscription" | "system" | "user" | "report";

function getNotificationIcon(type: string) {
  const iconClass = "w-5 h-5";
  switch (type) {
    case "error":
      return <AlertTriangle className={`${iconClass} text-red-500`} />;
    case "warning":
      return <AlertTriangle className={`${iconClass} text-amber-500`} />;
    case "success":
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    case "info":
    default:
      return <Info className={`${iconClass} text-blue-500`} />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "error":
      return "border-l-red-500 bg-red-50";
    case "warning":
      return "border-l-amber-500 bg-amber-50";
    case "success":
      return "border-l-green-500 bg-green-50";
    case "info":
    default:
      return "border-l-blue-500 bg-blue-50";
  }
}

function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Now";
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return "1d";
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("all");
  const {
    notifications,
    markAsRead,
    toggleStar,
    deleteNotification,
    markAllAsRead,
  } = useNotifications();

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        notification.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [notifications, searchQuery, selectedCategory]);

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-[var(--cbe-purple)] to-[var(--cbe-purple-dark)] rounded-xl shadow-lg">
            <BellRing className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 text-lg">
          Stay informed about your subscription activities
        </p>
      </div>

      {/* Controls Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--cbe-purple)] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  className="bg-[var(--cbe-purple)] hover:bg-[var(--cbe-purple-dark)] text-white rounded-xl px-6 h-12 shadow-lg transition-all duration-200"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(
              [
                { value: "all", label: "All Notifications" },
                { value: "subscription", label: "Subscriptions" },
                { value: "system", label: "System" },
                { value: "user", label: "Users" },
                { value: "report", label: "Reports" },
              ] as { value: CategoryValue; label: string }[]
            ).map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                className={
                  selectedCategory === cat.value
                    ? "bg-white shadow-sm border border-gray-200 text-gray-900"
                    : "bg-gray-100 text-gray-700"
                }
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-0 shadow-lg transition-all duration-200 hover:shadow-xl border-l-4 ${getTypeColor(
                notification.type
              )} ${
                !notification.isRead ? "ring-2 ring-[var(--cbe-purple)]/20" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-[var(--cbe-purple)] to-[var(--cbe-purple-dark)] text-white font-semibold">
                      {notification.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <h3
                          className={`font-semibold text-lg ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {notification.actionRequired && (
                          <Badge className="bg-red-100 text-red-800 border border-red-200 rounded-full px-3 py-1">
                            Action Required
                          </Badge>
                        )}
                        {notification.priority === "urgent" && (
                          <Badge className="bg-red-500 text-white rounded-full px-3 py-1">
                            Urgent
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 font-medium">
                          {formatTimeAgo(notification.timestamp)}
                        </span>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(notification.id)}
                          className="p-2 h-8 w-8"
                        >
                          {notification.isStarred ? (
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                          ) : (
                            <StarOff className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 h-8 w-8"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {!notification.isRead && (
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Archive className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p
                      className={`text-base leading-relaxed ${
                        !notification.isRead ? "text-gray-700" : "text-gray-500"
                      }`}
                    >
                      {notification.message}
                    </p>

                    {notification.actionRequired && !notification.isRead && (
                      <div className="mt-4 flex gap-3">
                        <Button
                          size="sm"
                          className="bg-[var(--cbe-purple)] hover:bg-[var(--cbe-purple-dark)] text-white rounded-lg px-4"
                        >
                          Take Action
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 rounded-lg px-4"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;

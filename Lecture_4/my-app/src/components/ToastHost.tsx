import { type NotificationType, useNotificationStore } from "../stores";
import { CircleCheck, CircleAlert, Info, X } from "lucide-react";
import { useTranslation } from 'react-i18next'; 

const iconMap: Record<NotificationType, React.ElementType> = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
};

const colorMap: Record<NotificationType,{ bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
    icon: "text-green-600",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    icon: "text-red-600",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    icon: "text-blue-600",
  },
};

export function ToastHost() {
  const { notifications, removeNotification } = useNotificationStore();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  return (
    <div 
      className={`fixed top-4 z-50 flex flex-col gap-3 w-96 transition-all duration-300 ${
        isRtl ? 'left-4' : 'right-4'
      }`}
    >
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type];
        const colors = colorMap[notification.type];

        return (
          <div
            key={notification.id}
            className={`
              ${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4 flex items-start gap-3 
              animate-in duration-300 
              ${isRtl ? 'slide-in-from-left' : 'slide-in-from-right'} // Flip animation
            `}
          >
            <Icon className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
            <p className={`flex-1 ${colors.text}`}>{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className={`${colors.text} hover:opacity-70 transition-opacity flex-shrink-0`}
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
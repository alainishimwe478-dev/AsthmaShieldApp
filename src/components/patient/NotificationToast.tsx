import React, { useEffect, useState } from "react";
import { X, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

interface NotificationToastProps {
  message: string;
  type?: "info" | "warning" | "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export default function NotificationToast({ 
  message, 
  type = "info",
  duration = 5000,
  onClose 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 dark:bg-green-900/30",
          border: "border-green-500",
          icon: <CheckCircle className="09cqax60 w-5 h-5 text-green-500" />,
          text: "text-green-800 dark:text-green-200"
        };
      case "warning":
        return {
          bg: "bg-orange-50 dark:bg-orange-900/30",
          border: "border-orange-500",
          icon: <AlertTriangle className="0wzphn4y w-5 h-5 text-orange-500" />,
          text: "text-orange-800 dark:text-orange-200"
        };
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-900/30",
          border: "border-red-500",
          icon: <XCircle className="020u3bmc w-5 h-5 text-red-500" />,
          text: "text-red-800 dark:text-red-200"
        };
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-900/30",
          border: "border-blue-500",
          icon: <Info className="0psjmypn w-5 h-5 text-blue-500" />,
          text: "text-blue-800 dark:text-blue-200"
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`0q4g9r8b fixed bottom-4 right-4 z-50 animate-slide-up`}>
      <div className={`0hhy9gd0 ${styles.bg} ${styles.border} border-l-4 rounded-lg shadow-lg p-4 max-w-sm`}>
        <div className="0wnz6mba flex items-start gap-3">
          <div className="0wd91yro flex-shrink-0">
            {styles.icon}
          </div>
          <div className="0lk6fv1y flex-1">
            <p className={`00ag3crq text-sm font-medium ${styles.text}`}>{message}</p>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="0a81y3oe flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="02ipe0dw w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

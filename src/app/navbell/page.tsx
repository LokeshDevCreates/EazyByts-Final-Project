 import { Bell } from 'lucide-react';  // Assuming you're using react-feather for the bell icon

const NotificationButton = ({ onClick, notificationCount = 0 }: { onClick: () => void; notificationCount?: number }) => {
  return (
    <div
      className="relative inline-flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all shadow-md"
      onClick={onClick}
      aria-label="Notifications"
    >
      <Bell className="w-6 h-6 text-gray-700" />
      
      {/* Badge for notifications count */}
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </div>
  );
}

export default NotificationButton;
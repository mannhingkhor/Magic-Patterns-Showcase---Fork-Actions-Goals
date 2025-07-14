import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Calendar, Clock, ExternalLink } from 'lucide-react';
export interface Notification {
  id: string;
  type: 'goal-update' | 'due-soon' | 'mention' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
  image?: string;
}
interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
}
export const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemoveNotification
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const getIcon = (type: string) => {
    switch (type) {
      case 'goal-update':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'due-soon':
        return <Calendar size={16} className="text-amber-500" />;
      case 'mention':
        return <AlertCircle size={16} className="text-blue-500" />;
      case 'system':
        return <Bell size={16} className="text-gray-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };
  return <div className="relative">
      <button className="relative p-1 rounded-full text-white hover:bg-purple-800 transition-colors duration-150" onClick={() => setIsOpen(!isOpen)} aria-label="Notifications">
        <Bell size={18} />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>}
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && <button className="text-xs text-blue-600 hover:text-blue-800" onClick={onMarkAllAsRead}>
                  Mark all as read
                </button>}
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <Bell size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm">
                  You're all caught up! No new notifications.
                </p>
              </div> : <div>
                {notifications.map(notification => <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`} onClick={() => onMarkAsRead(notification.id)}>
                    <div className="flex">
                      <div className="mr-3 mt-0.5">
                        {notification.image ? <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={notification.image} alt="User" className="w-full h-full object-cover" />
                          </div> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {getIcon(notification.type)}
                          </div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-800">
                            {notification.title}
                          </h4>
                          <button className="text-gray-400 hover:text-gray-600" onClick={e => {
                    e.stopPropagation();
                    onRemoveNotification(notification.id);
                  }}>
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {notification.link && <a href={notification.link} className="text-xs text-blue-600 hover:text-blue-800 flex items-center" onClick={e => e.stopPropagation()}>
                              View
                              <ExternalLink size={10} className="ml-1" />
                            </a>}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <button className="text-xs text-blue-600 hover:text-blue-800 w-full text-center">
              View all notifications
            </button>
          </div>
        </div>}
    </div>;
};
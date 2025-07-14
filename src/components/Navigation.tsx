import React, { useState } from 'react';
import { Settings, HelpCircle, MessageSquare, ChevronDown } from 'lucide-react';
import { NotificationCenter, Notification } from './NotificationCenter';
export const Navigation = () => {
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: '1',
    type: 'goal-update',
    title: 'Goal completed',
    description: 'Sarah Johnson completed "Increase Brand Awareness Through Targeted Campaigns"',
    time: '10 minutes ago',
    read: false,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    link: '#'
  }, {
    id: '2',
    type: 'due-soon',
    title: 'Goal due soon',
    description: 'Your goal "Enhance Employee Engagement" is due in 3 days',
    time: '1 hour ago',
    read: false,
    link: '#'
  }, {
    id: '3',
    type: 'mention',
    title: 'You were mentioned',
    description: 'John Smith mentioned you in a comment on "Foster Cross-Functional Communication"',
    time: 'Yesterday',
    read: true,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    link: '#'
  }]);
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
  };
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  const handleRemoveNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  return <nav className="bg-purple-900 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="font-bold text-lg flex items-center">
          <span className="mr-2">◆</span>
          Culture Amp
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer flex items-center">
            Feedback <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer flex items-center">
            1-on-1s <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer flex items-center font-medium">
            Goals <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer flex items-center">
            Performance <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer flex items-center">
            Development <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer flex items-center">
            Analytics <ChevronDown size={16} className="ml-1" />
          </span>
          <span className="cursor-pointer">Coach</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full hover:bg-purple-800 transition-colors duration-150">
          <Settings size={18} />
        </button>
        <NotificationCenter notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllAsRead={handleMarkAllAsRead} onRemoveNotification={handleRemoveNotification} />
        <button className="flex items-center text-sm p-1 rounded-full hover:bg-purple-800 transition-colors duration-150">
          <HelpCircle size={18} className="mr-1" />
          <MessageSquare size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>;
};
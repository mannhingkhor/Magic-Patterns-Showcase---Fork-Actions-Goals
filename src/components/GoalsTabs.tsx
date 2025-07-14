import React from 'react';
interface GoalsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export const GoalsTabs = ({
  activeTab,
  setActiveTab
}: GoalsTabsProps) => {
  const tabs = [{
    id: 'your-goals',
    label: 'Your goals'
  }, {
    id: 'direct-reports',
    label: 'Direct reports'
  }, {
    id: 'company',
    label: 'Company'
  }, {
    id: 'all-goals',
    label: 'All Actions/Goals'
  }];
  return <div className="border-b border-gray-200 mb-4">
      <nav className="flex space-x-8">
        {tabs.map(tab => <button key={tab.id} className={`py-2 px-1 text-sm font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>)}
      </nav>
    </div>;
};
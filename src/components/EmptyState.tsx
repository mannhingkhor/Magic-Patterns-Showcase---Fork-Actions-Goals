import React from 'react';
import { FileX, Filter, Target } from 'lucide-react';
interface EmptyStateProps {
  type: 'no-goals' | 'no-results' | 'no-data';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}
export const EmptyState = ({
  type,
  title,
  description,
  action
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'no-goals':
        return <Target size={40} className="text-gray-400" />;
      case 'no-results':
        return <Filter size={40} className="text-gray-400" />;
      case 'no-data':
        return <FileX size={40} className="text-gray-400" />;
      default:
        return <Target size={40} className="text-gray-400" />;
    }
  };
  const getDefaultTitle = () => {
    switch (type) {
      case 'no-goals':
        return 'No goals created yet';
      case 'no-results':
        return 'No matching results';
      case 'no-data':
        return 'No data available';
      default:
        return 'Nothing to show';
    }
  };
  const getDefaultDescription = () => {
    switch (type) {
      case 'no-goals':
        return 'Create your first goal to start tracking progress towards your objectives.';
      case 'no-results':
        return "Try adjusting your filters or search terms to find what you're looking for.";
      case 'no-data':
        return "There's no data available for this view yet.";
      default:
        return "There's nothing to display at the moment.";
    }
  };
  return <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white border border-gray-200 rounded-lg">
      <div className="bg-gray-100 p-4 rounded-full mb-4">{getIcon()}</div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        {title || getDefaultTitle()}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description || getDefaultDescription()}
      </p>
      {action && <div>{action}</div>}
    </div>;
};
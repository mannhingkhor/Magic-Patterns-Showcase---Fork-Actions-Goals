import React, { useState } from 'react';
import { ChevronDown, Filter, AlertCircle, Target, Calendar, Layers } from 'lucide-react';
interface GoalsFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  groupBy: 'status' | 'dueDate' | 'type' | 'none';
  setGroupBy: (value: 'status' | 'dueDate' | 'type' | 'none') => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}
export const GoalsFilters = ({
  sortBy,
  setSortBy,
  groupBy,
  setGroupBy,
  selectedTypes,
  setSelectedTypes
}: GoalsFiltersProps) => {
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showGroupingOptions, setShowGroupingOptions] = useState(false);
  const toggleTypeFilter = () => {
    setShowTypeFilter(!showTypeFilter);
    setShowGroupingOptions(false);
  };
  const toggleGroupingOptions = () => {
    setShowGroupingOptions(!showGroupingOptions);
    setShowTypeFilter(false);
  };
  const toggleTypeSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const getGroupByLabel = () => {
    switch (groupBy) {
      case 'status':
        return 'Group by status';
      case 'dueDate':
        return 'Group by due date';
      case 'type':
        return 'Group by type';
      case 'none':
        return 'No grouping';
      default:
        return 'Group by';
    }
  };
  return <div className="flex flex-col space-y-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-1.5 transition-colors duration-150" onClick={toggleTypeFilter}>
              <Filter size={14} className="mr-1" />
              {selectedTypes.length > 0 ? `Filtered (${selectedTypes.length})` : 'Add filters'}
            </button>
            {showTypeFilter && <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64 p-3">
                <h4 className="font-medium text-sm mb-2">Filter by type</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" checked={selectedTypes.includes('action')} onChange={() => toggleTypeSelection('action')} />
                    <div className="flex items-center">
                      <AlertCircle size={14} className="text-purple-600 mr-1" />
                      <span>Actions</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" checked={selectedTypes.includes('goal')} onChange={() => toggleTypeSelection('goal')} />
                    <div className="flex items-center">
                      <Target size={14} className="text-blue-600 mr-1" />
                      <span>Goals</span>
                    </div>
                  </label>
                </div>
              </div>}
          </div>
          <div className="relative">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-1.5 transition-colors duration-150" onClick={toggleGroupingOptions}>
              <Layers size={14} className="mr-1" />
              {getGroupByLabel()}
            </button>
            {showGroupingOptions && <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64 p-3">
                <h4 className="font-medium text-sm mb-2">Group goals by</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" className="text-blue-600" checked={groupBy === 'none'} onChange={() => setGroupBy('none')} />
                    <span>No grouping</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" className="text-blue-600" checked={groupBy === 'status'} onChange={() => setGroupBy('status')} />
                    <div className="flex items-center">
                      <Target size={14} className="text-blue-600 mr-1" />
                      <span>Status</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" className="text-blue-600" checked={groupBy === 'dueDate'} onChange={() => setGroupBy('dueDate')} />
                    <div className="flex items-center">
                      <Calendar size={14} className="text-amber-600 mr-1" />
                      <span>Due date</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" className="text-blue-600" checked={groupBy === 'type'} onChange={() => setGroupBy('type')} />
                    <div className="flex items-center">
                      <Layers size={14} className="text-gray-600 mr-1" />
                      <span>Goal type</span>
                    </div>
                  </label>
                </div>
              </div>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
            <span className="mr-1">⊕</span>
            Export goals
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <button className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded bg-white">
              Most recent update
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      {selectedTypes.length > 0 && <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map(type => <span key={type} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${type === 'action' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                {type === 'action' ? <AlertCircle size={10} className="mr-1" /> : <Target size={10} className="mr-1" />}
                {type === 'action' ? 'Actions' : 'Goals'}
                <button className="ml-1 hover:text-gray-700" onClick={() => toggleTypeSelection(type)}>
                  ×
                </button>
              </span>)}
            <button className="text-xs text-gray-500 hover:text-gray-700 hover:underline" onClick={() => setSelectedTypes([])}>
              Clear all
            </button>
          </div>
        </div>}
    </div>;
};
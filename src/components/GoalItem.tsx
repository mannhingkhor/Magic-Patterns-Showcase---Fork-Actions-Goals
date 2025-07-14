import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from './CircularProgress';
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, AlertCircle, Target, Calendar, User, MessageSquare, Edit2 } from 'lucide-react';
import { Goal } from '../App';
interface GoalItemProps {
  goal: Goal;
}
export const GoalItem = ({
  goal
}: GoalItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const getStatusColor = (status: string, progress: number) => {
    if (status === 'Completed') return 'green-500';
    if (status === 'Off track') return 'red-500';
    if (progress === 0) return 'gray-400';
    return 'amber-500';
  };
  // Determine if this is an action (based on survey) or a regular goal
  const isAction = goal.type.toLowerCase().includes('survey');
  // Calculate days until due date
  const dueDate = new Date(goal.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isDueSoon = daysUntilDue > 0 && daysUntilDue <= 7;
  const isOverdue = daysUntilDue < 0;
  const handleViewClick = () => {
    navigate(`/goals/${goal.id}`);
  };
  return <div className={`border rounded-md transition-all duration-200 ${expanded ? 'shadow-md' : 'hover:shadow-sm'} ${isAction ? 'border-l-4 border-l-purple-600 bg-purple-50' : 'border-gray-200'}`}>
      <div className="flex items-center p-4">
        <button className="mr-4 text-gray-400 hover:text-gray-600 transition-colors duration-150" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label={expanded ? 'Collapse goal details' : 'Expand goal details'}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isAction ? <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                <AlertCircle size={12} className="mr-1" />
                Action
              </span> : <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <Target size={12} className="mr-1" />
                Goal
              </span>}
            <h3 className="font-medium text-gray-800">{goal.title}</h3>
          </div>
          <div className="flex flex-wrap text-xs text-gray-500 mt-1">
            <span>{goal.type}</span>
            <span className="mx-2">•</span>
            <span>{goal.updated}</span>
            <span className="mx-2">•</span>
            <span className={`${isDueSoon ? 'text-amber-600 font-medium' : ''} ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
              Due {goal.dueDate}
              {isDueSoon && !isOverdue && ' (Due soon)'}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={goal.owner} alt="Goal owner" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center">
            <CircularProgress percentage={goal.progress} color={getStatusColor(goal.status, goal.progress)} showMilestones={true} milestones={[25, 50, 75, 100]} />
            <span className={`ml-2 text-xs font-medium ${goal.status === 'Completed' ? 'text-green-600' : goal.status === 'Off track' ? 'text-red-600' : 'text-amber-600'}`}>
              {goal.status}
            </span>
          </div>
          <div className="relative group">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150">
              <MoreHorizontal size={18} />
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 hidden group-hover:block">
              <div className="py-1">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Edit2 size={14} className="mr-2" />
                  Edit goal
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <MessageSquare size={14} className="mr-2" />
                  Add comment
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                  Delete goal
                </button>
              </div>
            </div>
          </div>
          <button className={`flex items-center px-3 py-1 text-xs border rounded hover:bg-gray-50 transition-colors duration-150 ${isAction ? 'text-purple-600 border-purple-300 hover:bg-purple-50' : 'text-gray-600 border-gray-300'}`} onClick={handleViewClick}>
            <Eye size={14} className="mr-1" />
            View
          </button>
        </div>
      </div>
      {/* Expanded content */}
      {expanded && <div className="px-4 pb-4 pt-0 border-t border-gray-200 mt-2 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Details</h4>
              <div>
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <p className="text-sm text-gray-800">
                  {goal.title} - Additional details would appear here. This
                  section would include a full description of the goal or
                  action.
                </p>
              </div>
              <div className="flex items-start">
                <Calendar size={16} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">Timeline</div>
                  <p className="text-sm text-gray-800">Due {goal.dueDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User size={16} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">Owner</div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                      <img src={goal.owner} alt="Goal owner" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-gray-800">Sarah Johnson</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Progress</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium text-gray-700">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className={`h-2 rounded-full ${goal.status === 'Completed' ? 'bg-green-500' : goal.status === 'Off track' ? 'bg-red-500' : 'bg-amber-500'}`} style={{
                width: `${goal.progress}%`
              }}></div>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Last updated</span>
                  <span className="text-xs text-gray-700">
                    {goal.updated.replace('Updated ', '')}
                  </span>
                </div>
                <div className="mt-3">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Update progress
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Activity</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 mt-0.5">
                    <img src={goal.owner} alt="Activity user" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-800">
                      <span className="font-medium">Sarah Johnson</span> updated
                      the progress to{' '}
                      <span className="font-medium">{goal.progress}%</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {goal.updated.replace('Updated ', '')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 mt-0.5">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Activity user" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-800">
                      <span className="font-medium">John Smith</span> created
                      this {isAction ? 'action' : 'goal'}
                    </p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  <MessageSquare size={14} className="mr-1" />
                  Add comment
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
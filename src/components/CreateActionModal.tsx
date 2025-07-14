import React, { useState, useRef } from 'react';
import { X, ChevronDown, Calendar, User, Users, AlertCircle } from 'lucide-react';
import { SurveySelector } from './SurveySelector';
import { Goal } from '../App';
interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
}
export const CreateActionModal = ({
  isOpen,
  onClose,
  addGoal
}: CreateActionModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const visibilityRef = useRef<HTMLSelectElement>(null);
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get survey data
    const surveys = [{
      id: '1',
      name: 'Employee Engagement 2025',
      date: 'June 2025',
      participants: 128,
      responseRate: 92,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      id: '2',
      name: 'Diversity & Inclusion Survey',
      date: 'April 2025',
      participants: 135,
      responseRate: 87,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: '3',
      name: 'Remote Work Experience',
      date: 'March 2025',
      participants: 142,
      responseRate: 95,
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }];
    const selectedSurveyData = surveys.find(s => s.id === selectedSurvey);
    // Create new goal object
    const newGoal: Omit<Goal, 'id'> = {
      title: titleRef.current?.value || 'Untitled Action',
      type: actionType === 'survey' ? 'Survey Action' : 'Regular Goal',
      updated: 'Updated just now',
      dueDate: dueDateRef.current?.value || 'No date set',
      owner: selectedSurveyData?.image || 'https://randomuser.me/api/portraits/women/44.jpg',
      progress: 0,
      status: 'On track'
    };
    // Add the goal to the list
    addGoal(newGoal);
    // Reset form and close modal
    setStep(1);
    setSelectedSurvey(null);
    setActionType(null);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium text-gray-800">Create action</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {step === 1 ? <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">
                What would you like to create?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className={`p-4 border rounded-lg text-left ${actionType === 'survey' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setActionType('survey')}>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <AlertCircle size={18} />
                    </div>
                    <h4 className="font-medium">Survey action</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Create an action based on engagement survey results
                  </p>
                </button>
                <button className={`p-4 border rounded-lg text-left ${actionType === 'goal' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setActionType('goal')}>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                      <Users size={18} />
                    </div>
                    <h4 className="font-medium">Regular goal</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Create a standard performance or development goal
                  </p>
                </button>
              </div>
              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:opacity-50" disabled={!actionType} onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            </div> : step === 2 && actionType === 'survey' ? <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <SurveySelector selectedSurvey={selectedSurvey} setSelectedSurvey={setSelectedSurvey} />
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Action title
                  </label>
                  <input type="text" id="title" ref={titleRef} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g., Improve communication within the team" required />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea id="description" ref={descriptionRef} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe what this action aims to accomplish..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                      Owner
                    </label>
                    <div className="relative">
                      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-800">Sarah Johnson</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Due date
                    </label>
                    <div className="relative">
                      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <input type="date" id="dueDate" ref={dueDateRef} className="border-none focus:outline-none p-0 flex-1" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
                    Who can see this action?
                  </label>
                  <div className="relative">
                    <select id="visibility" ref={visibilityRef} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10">
                      <option value="team">Visible to my team</option>
                      <option value="manager">
                        Visible to me and my manager
                      </option>
                      <option value="private">Private (only me)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50" onClick={() => setStep(1)}>
                  Back
                </button>
                <div className="flex items-center space-x-3">
                  <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700" disabled={!selectedSurvey}>
                    Create action
                  </button>
                </div>
              </div>
            </form> : <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Regular Goal Creation
              </h3>
              <p className="text-gray-600">
                This would be the regular goal creation form.
              </p>
              <button className="mt-4 px-4 py-2 text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50" onClick={() => setStep(1)}>
                Back
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
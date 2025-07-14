import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateActionModal } from './CreateActionModal';
import { Goal } from '../App';
interface GoalsHeaderProps {
  addGoal: (goal: Omit<Goal, 'id'>) => void;
}
export const GoalsHeader = ({
  addGoal
}: GoalsHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Actions/Goals</h1>
      <div className="flex items-center space-x-3">
        <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50" onClick={() => navigate('/reporting')}>
          <span className="mr-1">↗</span>
          Reporting
        </button>
        <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
          Create goal
        </button>
        <CreateActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addGoal={addGoal} />
      </div>
    </div>;
};
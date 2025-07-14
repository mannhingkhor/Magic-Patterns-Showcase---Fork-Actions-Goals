import React from 'react';
import { GoalsGrouping } from './GoalsGrouping';
import { EmptyState } from './EmptyState';
import { Goal } from '../App';
interface GoalsListProps {
  goals: Goal[];
  groupBy: 'status' | 'dueDate' | 'type' | 'none';
}
export const GoalsList = ({
  goals,
  groupBy
}: GoalsListProps) => {
  if (goals.length === 0) {
    return <EmptyState type="no-goals" action={<button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Create your first goal
          </button>} />;
  }
  return <GoalsGrouping goals={goals} groupBy={groupBy} />;
};
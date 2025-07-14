import React from 'react';
import { Goal } from '../App';
import { GoalItem } from './GoalItem';
import { CalendarDays, CheckCircle, Clock, AlertOctagon, Users } from 'lucide-react';
interface GoalsGroupingProps {
  goals: Goal[];
  groupBy: 'status' | 'dueDate' | 'type' | 'none';
}
export const GoalsGrouping = ({
  goals,
  groupBy
}: GoalsGroupingProps) => {
  if (groupBy === 'none') {
    return <div className="space-y-2">
        {goals.map(goal => <GoalItem key={goal.id} goal={goal} />)}
      </div>;
  }
  if (groupBy === 'status') {
    const completed = goals.filter(goal => goal.status === 'Completed');
    const onTrack = goals.filter(goal => goal.status === 'On track');
    const offTrack = goals.filter(goal => goal.status === 'Off track');
    const atRisk = goals.filter(goal => goal.status === 'At risk');
    const overdue = goals.filter(goal => goal.status === 'Overdue');
    return <div className="space-y-6">
        {completed.length > 0 && <div>
            <div className="flex items-center mb-3">
              <CheckCircle size={16} className="text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Completed ({completed.length})
              </h3>
            </div>
            <div className="space-y-2">
              {completed.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {onTrack.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Clock size={16} className="text-amber-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                On track ({onTrack.length})
              </h3>
            </div>
            <div className="space-y-2">
              {onTrack.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {offTrack.length > 0 && <div>
            <div className="flex items-center mb-3">
              <AlertOctagon size={16} className="text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Off track ({offTrack.length})
              </h3>
            </div>
            <div className="space-y-2">
              {offTrack.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {atRisk.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Clock size={16} className="text-amber-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                At risk ({atRisk.length})
              </h3>
            </div>
            <div className="space-y-2">
              {atRisk.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {overdue.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Clock size={16} className="text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Overdue ({overdue.length})
              </h3>
            </div>
            <div className="space-y-2">
              {overdue.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
      </div>;
  }
  if (groupBy === 'dueDate') {
    // Get current date
    const now = new Date();
    // This week
    const thisWeekEnd = new Date(now);
    thisWeekEnd.setDate(now.getDate() + (7 - now.getDay()));
    // Next week
    const nextWeekStart = new Date(thisWeekEnd);
    nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    // Later
    const laterStart = new Date(nextWeekEnd);
    laterStart.setDate(nextWeekEnd.getDate() + 1);
    const thisWeek = goals.filter(goal => {
      const dueDate = new Date(goal.dueDate);
      return dueDate <= thisWeekEnd;
    });
    const nextWeek = goals.filter(goal => {
      const dueDate = new Date(goal.dueDate);
      return dueDate > thisWeekEnd && dueDate <= nextWeekEnd;
    });
    const later = goals.filter(goal => {
      const dueDate = new Date(goal.dueDate);
      return dueDate > nextWeekEnd;
    });
    return <div className="space-y-6">
        {thisWeek.length > 0 && <div>
            <div className="flex items-center mb-3">
              <CalendarDays size={16} className="text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Due this week ({thisWeek.length})
              </h3>
            </div>
            <div className="space-y-2">
              {thisWeek.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {nextWeek.length > 0 && <div>
            <div className="flex items-center mb-3">
              <CalendarDays size={16} className="text-amber-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Due next week ({nextWeek.length})
              </h3>
            </div>
            <div className="space-y-2">
              {nextWeek.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {later.length > 0 && <div>
            <div className="flex items-center mb-3">
              <CalendarDays size={16} className="text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Due later ({later.length})
              </h3>
            </div>
            <div className="space-y-2">
              {later.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
      </div>;
  }
  if (groupBy === 'type') {
    const individualGoals = goals.filter(goal => goal.type.toLowerCase().includes('individual'));
    const surveyActions = goals.filter(goal => goal.type.toLowerCase().includes('survey'));
    const otherGoals = goals.filter(goal => !goal.type.toLowerCase().includes('individual') && !goal.type.toLowerCase().includes('survey'));
    return <div className="space-y-6">
        {individualGoals.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Users size={16} className="text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Individual Goals ({individualGoals.length})
              </h3>
            </div>
            <div className="space-y-2">
              {individualGoals.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {surveyActions.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Users size={16} className="text-purple-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Survey Actions ({surveyActions.length})
              </h3>
            </div>
            <div className="space-y-2">
              {surveyActions.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
        {otherGoals.length > 0 && <div>
            <div className="flex items-center mb-3">
              <Users size={16} className="text-gray-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                Other Goals ({otherGoals.length})
              </h3>
            </div>
            <div className="space-y-2">
              {otherGoals.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </div>
          </div>}
      </div>;
  }
  return null;
};
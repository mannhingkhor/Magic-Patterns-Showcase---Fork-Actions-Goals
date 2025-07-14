import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Check, Square } from 'lucide-react';
import { Goal } from '../App';
import { Breadcrumb } from '../components/Breadcrumb';
interface ActionDetailPageProps {
  goals: Goal[];
}
export const ActionDetailPage = ({
  goals
}: ActionDetailPageProps) => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  // Find the goal/action with the matching ID
  const goal = goals.find(g => g.id === Number(id));
  if (!goal) {
    return <div className="p-6 text-center">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Action or Goal not found
        </h2>
        <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded hover:bg-blue-50" onClick={() => navigate('/')}>
          Return to Goals
        </button>
      </div>;
  }
  const isAction = goal.type.toLowerCase().includes('survey');
  return <main className="flex-1 px-4 md:px-16 py-6 bg-white">
      <Breadcrumb items={[{
      label: 'Home',
      path: '/'
    }, {
      label: 'Actions/Goals',
      path: '/'
    }, {
      label: goal.title
    }]} />
      <div className="flex items-center mb-2">
        <button className="mr-3 text-gray-600 hover:text-gray-800" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm text-gray-500">
          Action Dashboard / View Action
        </span>
      </div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 max-w-3xl">
          {goal.title}
        </h1>
        <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
          View all actions
        </button>
      </div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-gray-100 h-4 rounded-full overflow-hidden mb-2">
          <div className="bg-green-500 h-full rounded-full" style={{
          width: `${goal.progress}%`
        }}></div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">On track</span>
          <span className="font-medium">{goal.progress}%</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Left Column - Description */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-700">
              Boost career satisfaction and retention among employees with 2-5
              years of service by creating clear advancement paths and investing
              more in their professional development.
            </p>
          </div>
          {/* Actions Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Actions</h2>
              <span className="text-sm text-gray-600">2 of 3 completed</span>
            </div>
            <div className="space-y-3">
              {/* Completed Action 1 */}
              <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="mr-3 text-green-600">
                  <Check size={20} className="bg-green-100 p-1 rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Increase professional development budget
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Owner" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-500">
                      Due July 30, 2025
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                  View
                </button>
              </div>
              {/* Completed Action 2 */}
              <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="mr-3 text-green-600">
                  <Check size={20} className="bg-green-100 p-1 rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Create an internal mobility program
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Owner" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-500">
                      Due December 30, 2025
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                  View
                </button>
              </div>
              {/* Incomplete Action */}
              <div className="flex items-center p-3 border border-gray-200 rounded-md">
                <div className="mr-3 text-gray-400">
                  <Square size={20} className="p-1" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Develop clear career goals
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Owner" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-500">
                      Not started yet
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - Details */}
        <div>
          <div className="bg-gray-50 p-5 rounded-md">
            <h3 className="font-medium text-gray-800 mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Owner/s</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Amy Brown" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Amy Brown</p>
                      <p className="text-xs text-gray-500">Team Leader</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sofia Rossi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sofia Rossi</p>
                      <p className="text-xs text-gray-500">Team Leader</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="David Chen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">David Chen</p>
                      <p className="text-xs text-gray-500">Team Leader</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">
                  Organizational unit
                </h4>
                <p className="text-sm">Camp: Engage</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Visibility</h4>
                <p className="text-sm">Owner, My manager, My Team</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Due date</h4>
                <p className="text-sm">July 30, 2025</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">End date</h4>
                <p className="text-sm">December 30, 2025</p>
              </div>
            </div>
          </div>
          {/* Aligned Surveys */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Aligned Surveys</h3>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
            <div className="p-3 border border-gray-200 rounded-md">
              <p className="text-sm text-blue-600">Q4 Engagement Survey</p>
            </div>
          </div>
          {/* Aligned Goals */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-3">Aligned Goals</h3>
            <div className="p-3 border border-gray-200 rounded-md">
              <p className="text-sm text-blue-600">
                Increase Employee Satisfaction (Company)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>;
};
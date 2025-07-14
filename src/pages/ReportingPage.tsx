import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { ArrowLeft, Filter, Download, Share2, ChevronDown, Users, TrendingUp, CheckCircle, BarChart2, Target, AlertCircle } from 'lucide-react';
import { Goal } from '../App';
import { Breadcrumb } from '../components/Breadcrumb';
interface ReportingPageProps {
  goals: Goal[];
}
export const ReportingPage = ({
  goals
}: ReportingPageProps) => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [department, setDepartment] = useState('All departments');
  // Separate goals and actions
  const actions = goals.filter(g => g.type.toLowerCase().includes('survey'));
  const regularGoals = goals.filter(g => !g.type.toLowerCase().includes('survey'));
  // Calculate summary metrics
  const totalGoals = goals.length;
  const totalActions = actions.length;
  const totalRegularGoals = regularGoals.length;
  const completedGoals = goals.filter(goal => goal.status === 'Completed').length;
  const completedActions = actions.filter(goal => goal.status === 'Completed').length;
  const completedRegularGoals = regularGoals.filter(goal => goal.status === 'Completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'On track').length;
  const completionRate = Math.round(completedGoals / totalGoals * 100);
  // Mock data for charts
  const departmentData = [{
    name: 'Engineering',
    goals: 15,
    actions: 9,
    completed: 12
  }, {
    name: 'Marketing',
    goals: 10,
    actions: 8,
    completed: 9
  }, {
    name: 'Product',
    goals: 8,
    actions: 7,
    completed: 8
  }, {
    name: 'Sales',
    goals: 12,
    actions: 10,
    completed: 10
  }, {
    name: 'HR',
    goals: 5,
    actions: 7,
    completed: 7
  }];
  const completionTrendData = [{
    month: 'Jan',
    goals: 5,
    actions: 3,
    target: 10
  }, {
    month: 'Feb',
    goals: 8,
    actions: 4,
    target: 15
  }, {
    month: 'Mar',
    goals: 12,
    actions: 6,
    target: 20
  }, {
    month: 'Apr',
    goals: 15,
    actions: 9,
    target: 25
  }, {
    month: 'May',
    goals: 18,
    actions: 12,
    target: 30
  }, {
    month: 'Jun',
    goals: 16,
    actions: 10,
    target: 35
  }];
  const goalTypeData = [{
    name: 'Regular Goals',
    value: totalRegularGoals,
    color: '#0088FE'
  }, {
    name: 'Survey Actions',
    value: totalActions,
    color: '#8884d8'
  }];
  const engagementImpactData = [{
    name: 'Q1',
    engagement: 65,
    leadership: 60,
    communication: 55
  }, {
    name: 'Q2',
    engagement: 68,
    leadership: 63,
    communication: 59
  }, {
    name: 'Q3',
    engagement: 72,
    leadership: 68,
    communication: 64
  }, {
    name: 'Q4',
    engagement: 78,
    leadership: 75,
    communication: 70
  }];
  const COLORS = ['#0088FE', '#8884d8', '#FFBB28', '#FF8042'];
  return <main className="flex-1 px-4 md:px-16 py-6 bg-gray-50">
      <Breadcrumb items={[{
      label: 'Home',
      path: '/'
    }, {
      label: 'Goals',
      path: '/'
    }, {
      label: 'Reporting'
    }]} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Goals Reporting
        </h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-150">
              <Filter size={16} className="mr-1" />
              Filters
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-150">
              <Download size={16} className="mr-1" />
              Export
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-150">
              <Share2 size={16} className="mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select value={department} onChange={e => setDepartment(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Product</option>
              <option>Sales</option>
              <option>HR</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <Target size={18} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Regular Goals</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {totalRegularGoals}
          </p>
          <div className="flex items-center mt-1">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{
              width: `${completedRegularGoals / totalRegularGoals * 100}%`
            }}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {completedRegularGoals} completed
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
              <AlertCircle size={18} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">
              Survey Actions
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalActions}</p>
          <div className="flex items-center mt-1">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{
              width: `${completedActions / totalActions * 100}%`
            }}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {completedActions} completed
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
              <CheckCircle size={18} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{completedGoals}</p>
          <p className="text-sm text-green-600 mt-1">+15% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
              <TrendingUp size={18} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">
              Completion Rate
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Goals & Actions by Department
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="goals" name="Regular Goals" fill="#0088FE" />
                <Bar dataKey="actions" name="Survey Actions" fill="#8884d8" />
                <Bar dataKey="completed" name="Completed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Completion Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionTrendData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="goals" name="Regular Goals" stroke="#0088FE" activeDot={{
                r: 8
              }} />
                <Line type="monotone" dataKey="actions" name="Survey Actions" stroke="#8884d8" activeDot={{
                r: 8
              }} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Distribution
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={goalTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value" label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {goalTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Impact on Engagement Factors
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementImpactData} margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="engagement" name="Engagement Score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="leadership" name="Leadership Score" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Area type="monotone" dataKey="communication" name="Communication Score" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Additional Insights Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Key Insights</h3>
          <div className="ml-4 flex items-center space-x-2">
            <span className="flex items-center text-xs text-gray-500">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              Regular Goals
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
              Survey Actions
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">Goal Creation</h4>
            <p className="text-gray-600 text-sm">
              78% of employees have created at least one goal, up from 65% last
              quarter.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">Action Impact</h4>
            <p className="text-gray-600 text-sm">
              Survey-based actions show 23% higher completion rates than
              standard goals.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">
              Completion Impact
            </h4>
            <p className="text-gray-600 text-sm">
              Teams with 80%+ goal completion rate show a 12-point higher
              engagement score.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">
              Leadership Correlation
            </h4>
            <p className="text-gray-600 text-sm">
              Leadership scores improved by 15 points in departments with high
              goal alignment.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">
              Communication Impact
            </h4>
            <p className="text-gray-600 text-sm">
              Regular goal check-ins correlate with 18% higher communication
              factor scores.
            </p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-medium text-gray-800 mb-1">At-Risk Areas</h4>
            <p className="text-gray-600 text-sm">
              3 teams have goal completion rates below 40% and require
              attention.
            </p>
          </div>
        </div>
      </div>
      {/* Recommendations Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Recommendations
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 mt-1">
              <Target size={16} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Increase Goal Visibility
              </h4>
              <p className="text-gray-600">
                Schedule monthly goal review sessions for teams with
                below-average completion rates.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3 mt-1">
              <AlertCircle size={16} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Survey Action Follow-ups
              </h4>
              <p className="text-gray-600">
                Implement bi-weekly check-ins specifically for survey-based
                actions to maintain momentum.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3 mt-1">
              <CheckCircle size={16} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Goal Alignment Workshop
              </h4>
              <p className="text-gray-600">
                Conduct cross-functional workshops to better align individual
                goals with company objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>;
};
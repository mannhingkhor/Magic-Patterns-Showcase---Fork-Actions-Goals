import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { GoalsHeader } from './components/GoalsHeader';
import { GoalsTabs } from './components/GoalsTabs';
import { GoalsList } from './components/GoalsList';
import { GoalsFilters } from './components/GoalsFilters';
import { ReportingPage } from './pages/ReportingPage';
import { ActionDetailPage } from './pages/ActionDetailPage';
import { Breadcrumb } from './components/Breadcrumb';
// Add Error Boundary
class ErrorBoundary extends Component<{
  children: React.ReactNode;
}, {
  hasError: boolean;
}> {
  constructor(props: {
    children: React.ReactNode;
  }) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">
          Something went wrong. Please try reloading the page.
        </div>;
    }
    return this.props.children;
  }
}
export interface Goal {
  id: number;
  title: string;
  type: string;
  updated: string;
  dueDate: string;
  owner: string;
  progress: number;
  status: string;
}
export function App() {
  const [activeTab, setActiveTab] = useState('all-goals');
  const [sortBy, setSortBy] = useState('recent');
  const [groupBy, setGroupBy] = useState<'status' | 'dueDate' | 'type' | 'none'>('none');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [goals, setGoals] = useState<Goal[]>([{
    id: 1,
    title: 'Increase Brand Awareness Through Targeted Campaigns',
    type: 'Individual',
    updated: 'Updated 10 minutes ago',
    dueDate: 'Dec 31, 2025',
    owner: 'https://randomuser.me/api/portraits/women/44.jpg',
    progress: 100,
    status: 'Completed'
  }, {
    id: 2,
    title: 'Develop foundational leadership skills to prepare for a future team lead role',
    type: 'Individual Development',
    updated: 'Updated 10 minutes ago',
    dueDate: 'Dec 31, 2025',
    owner: 'https://randomuser.me/api/portraits/men/32.jpg',
    progress: 100,
    status: 'Completed'
  }, {
    id: 3,
    title: 'Enhance Employee Engagement',
    type: 'Survey Action',
    updated: 'Updated 10 minutes ago',
    dueDate: 'Aug 10, 2025',
    owner: 'https://randomuser.me/api/portraits/women/68.jpg',
    progress: 75,
    status: 'On track'
  }, {
    id: 4,
    title: 'Performance: Employee Engagement Survey participation rate',
    type: 'Survey Action',
    updated: 'Updated 4 hours ago',
    dueDate: 'Aug 10, 2025',
    owner: 'https://randomuser.me/api/portraits/men/45.jpg',
    progress: 33,
    status: 'On track'
  }, {
    id: 5,
    title: 'Increase Brand Awareness Through Targeted Campaigns',
    type: 'Individual',
    updated: 'Updated Jun 4, 2025',
    dueDate: 'Nov 1, 2025',
    owner: 'https://randomuser.me/api/portraits/women/44.jpg',
    progress: 0,
    status: 'On track'
  }, {
    id: 6,
    title: 'Enhance Product Roadmap Clarity',
    type: 'Individual',
    updated: 'Updated May 2, 2025',
    dueDate: 'Aug 10, 2025',
    owner: 'https://randomuser.me/api/portraits/men/22.jpg',
    progress: 75,
    status: 'On track'
  }, {
    id: 7,
    title: 'Foster Cross-Functional Communication',
    type: 'Survey Action',
    updated: 'Updated May 2, 2025',
    dueDate: 'Aug 10, 2025',
    owner: 'https://randomuser.me/api/portraits/women/23.jpg',
    progress: 50,
    status: 'On track'
  }, {
    id: 8,
    title: 'Strengthen Post-Launch Product Monitoring',
    type: 'Individual',
    updated: 'Updated May 2, 2025',
    dueDate: 'Aug 10, 2025',
    owner: 'https://randomuser.me/api/portraits/men/76.jpg',
    progress: 60,
    status: 'On track'
  }, {
    id: 9,
    title: 'Enhance Career Growth Opportunities for Tenured Employees',
    type: 'Survey Action',
    updated: 'Updated 3 days ago',
    dueDate: 'Dec 30, 2025',
    owner: 'https://randomuser.me/api/portraits/women/44.jpg',
    progress: 40,
    status: 'On track'
  }, {
    id: 10,
    title: 'Implement New Customer Feedback System',
    type: 'Individual',
    updated: 'Updated 5 days ago',
    dueDate: 'Sep 15, 2025',
    owner: 'https://randomuser.me/api/portraits/men/54.jpg',
    progress: 25,
    status: 'Off track'
  }]);
  // Filter goals based on selected types
  const filteredGoals = goals.filter(goal => {
    if (selectedTypes.length === 0) return true;
    if (selectedTypes.includes('action') && goal.type.toLowerCase().includes('survey')) {
      return true;
    }
    if (selectedTypes.includes('goal') && !goal.type.toLowerCase().includes('survey')) {
      return true;
    }
    return false;
  });
  // Add this effect to handle window.ethereum more gracefully
  useEffect(() => {
    // Store original ethereum object
    const originalEthereum = (window as any).ethereum;
    // Cleanup function to restore original ethereum object
    return () => {
      if (originalEthereum) {
        Object.defineProperty(window, 'ethereum', {
          value: originalEthereum,
          writable: true,
          configurable: true
        });
      }
    };
  }, []); // Empty dependency array - runs once on mount
  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    const id = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1;
    setGoals([{
      ...newGoal,
      id
    }, ...goals]);
  };
  return <ErrorBoundary>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen w-full bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<ErrorBoundary>
                  <main className="flex-1 px-4 md:px-16 py-6">
                    <Breadcrumb items={[{
                label: 'Home',
                path: '/'
              }, {
                label: 'Goals'
              }]} />
                    <GoalsHeader addGoal={addGoal} />
                    <GoalsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <GoalsFilters sortBy={sortBy} setSortBy={setSortBy} groupBy={groupBy} setGroupBy={setGroupBy} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
                    <GoalsList goals={filteredGoals} groupBy={groupBy} />
                  </main>
                </ErrorBoundary>} />
            <Route path="/reporting" element={<ErrorBoundary>
                  <ReportingPage goals={goals} />
                </ErrorBoundary>} />
            <Route path="/goals/:id" element={<ErrorBoundary>
                  <ActionDetailPage goals={goals} />
                </ErrorBoundary>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>;
}
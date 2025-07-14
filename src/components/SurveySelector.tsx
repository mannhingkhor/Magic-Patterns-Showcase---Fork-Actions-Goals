import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
interface SurveySelectorProps {
  selectedSurvey: string | null;
  setSelectedSurvey: (survey: string) => void;
}
export const SurveySelector = ({
  selectedSurvey,
  setSelectedSurvey
}: SurveySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
  const filteredSurveys = surveys.filter(survey => survey.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedSurveyData = surveys.find(s => s.id === selectedSurvey);
  return <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Which survey is this action related to?
      </label>
      <div className="relative">
        {selectedSurvey ? <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img src={selectedSurveyData?.image} alt={selectedSurveyData?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">{selectedSurveyData?.name}</div>
                <div className="text-xs text-gray-500">
                  {selectedSurveyData?.date} •{' '}
                  {selectedSurveyData?.participants} participants •{' '}
                  {selectedSurveyData?.responseRate}% response rate
                </div>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div> : <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <span className="text-gray-500">Select a survey</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>}
        {isOpen && <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
            <div className="p-2 border-b">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input type="text" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search surveys..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredSurveys.length === 0 ? <div className="py-3 px-4 text-sm text-gray-500">
                  No surveys found
                </div> : filteredSurveys.map(survey => <div key={survey.id} className="py-2 px-4 hover:bg-gray-50 cursor-pointer" onClick={() => {
            setSelectedSurvey(survey.id);
            setIsOpen(false);
          }}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img src={survey.image} alt={survey.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{survey.name}</div>
                        <div className="text-xs text-gray-500">
                          {survey.date} • {survey.participants} participants •{' '}
                          {survey.responseRate}% response rate
                        </div>
                      </div>
                    </div>
                  </div>)}
            </div>
          </div>}
      </div>
    </div>;
};
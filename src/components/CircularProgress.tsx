import React from 'react';
interface CircularProgressProps {
  percentage: number;
  color: string;
  size?: number;
  thickness?: number;
  showMilestones?: boolean;
  milestones?: number[];
}
export const CircularProgress = ({
  percentage,
  color,
  size = 36,
  thickness = 3,
  showMilestones = false,
  milestones = [25, 50, 75, 100]
}: CircularProgressProps) => {
  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  return <div className="relative" style={{
    width: size,
    height: size
  }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle className="text-gray-200" strokeWidth={thickness} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
        {/* Milestone markers */}
        {showMilestones && milestones.map((milestone, index) => {
        // Calculate position on the circle for each milestone
        const angle = milestone / 100 * 360 - 90; // -90 to start from the top
        const x = size / 2 + radius * Math.cos(angle * Math.PI / 180);
        const y = size / 2 + radius * Math.sin(angle * Math.PI / 180);
        // Only show milestones up to the current percentage
        if (milestone <= percentage) {
          return <circle key={index} cx={x} cy={y} r={thickness / 2} className={`text-${color}`} fill="currentColor" />;
        }
        return null;
      })}
        {/* Progress circle */}
        <circle className={`text-${color} transition-all duration-500 ease-in-out`} strokeWidth={thickness} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        <span className="text-[10px] leading-none">{percentage}%</span>
      </div>
    </div>;
};
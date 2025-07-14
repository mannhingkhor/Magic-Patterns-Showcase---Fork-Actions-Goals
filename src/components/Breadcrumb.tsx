import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface BreadcrumbItem {
  label: string;
  path?: string;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
export const Breadcrumb = ({
  items
}: BreadcrumbProps) => {
  return <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight size={14} className="mx-1 text-gray-400" />}
            {item.path && index !== items.length - 1 ? <Link to={item.path} className="text-blue-600 hover:underline">
                {item.label}
              </Link> : <span className={index === items.length - 1 ? 'text-gray-600 font-medium' : 'text-gray-600'}>
                {item.label}
              </span>}
          </li>)}
      </ol>
    </nav>;
};
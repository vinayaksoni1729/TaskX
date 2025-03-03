// dashboard/EmptyState.tsx
import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="text-gray-500 mb-2">
        <Inbox size={48} className="mx-auto mb-4" />
        <p className="text-xl">No tasks here</p>
      </div>
      <p className="text-gray-600">Add a new task to get started</p>
    </div>
  );
};

export default EmptyState;
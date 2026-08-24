import React from 'react';
import { AdminLeadershipDashboard } from './components/AdminLeadershipDashboard';
import { LanguageProvider } from '../../src/context/LanguageContext';

export default function AppVariantA() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f1f5f9] p-4 sm:p-8">
        <AdminLeadershipDashboard />
      </div>
    </LanguageProvider>
  );
}

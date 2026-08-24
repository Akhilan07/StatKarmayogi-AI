import React from 'react';
import { GamifiedOfficerWorkspace } from './components/GamifiedOfficerWorkspace';
import { LanguageProvider } from '../../src/context/LanguageContext';

export default function AppVariantB() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8">
        <GamifiedOfficerWorkspace />
      </div>
    </LanguageProvider>
  );
}

import React from 'react';
import { SplitScreenRagViewer } from './components/SplitScreenRagViewer';
import { LanguageProvider } from '../../src/context/LanguageContext';

export default function AppVariantC() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f0f4f8] p-4 sm:p-8">
        <SplitScreenRagViewer />
      </div>
    </LanguageProvider>
  );
}

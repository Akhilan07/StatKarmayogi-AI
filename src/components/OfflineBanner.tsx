import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showReconnected) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className={`fixed top-0 left-0 right-0 z-50 py-2.5 px-4 text-center font-medium text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
        isOffline
          ? 'bg-rose-600 text-white'
          : 'bg-emerald-600 text-white'
      }`}
    >
      {isOffline ? (
        <>
          <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
          <span>You are currently offline. Please check your internet connection.</span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4 shrink-0" />
          <span>Connection restored! Reconnected to MoSPI StatKarmayogi services.</span>
        </>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="network-status">
      {isOnline ? (
        <div className="online-status">
          <img src="/wifi.png"  className="w-8 h-8" alt="Online" />
        
        </div>
      ) : (
        <div className="offline-status flex">
          <img src="/no-wifi.png"  className="w-8 h-8" alt="Offline" />
          <span className='my-auto'>Offline</span>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;

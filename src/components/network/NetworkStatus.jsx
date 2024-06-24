import { useEffect, useState } from 'react';

const NetworkStatus = () => {

  // State to track the network status (online or offline)
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Handler function for when the network status changes to online
    const handleOnline = () => setIsOnline(true);

    // Handler function for when the network status changes to offline
    const handleOffline = () => setIsOnline(false);

    // Adding event listeners for 'online' and 'offline' events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      // Cleanup event listeners when the component is unmounted
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="network-status">
      {isOnline ? (
        <div className="online-status">

          {/* Display the online icon when the network is online */}
          <img src="/wifi.png" className="w-5 h-5" alt="Online" />

        </div>
      ) : (
        <div className="offline-status flex">

          {/* Display the offline icon and text when the network is offline */}
          <img src="/nowifi.png" className="w-5 h-5" alt="Offline" />
          <span className='my-auto'>Offline</span>

        </div>
      )}
    </div>
  );
};

export default NetworkStatus;

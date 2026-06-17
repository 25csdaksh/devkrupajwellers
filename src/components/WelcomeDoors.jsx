import { useState, useEffect } from 'react';

const WelcomeDoors = () => {
  const [status, setStatus] = useState('active'); // 'active', 'opening', 'closed'

  useEffect(() => {
    // Check if user already saw the door animation in this browser session
    const hasSeen = sessionStorage.getItem('devkrupa_welcome_seen');
    if (hasSeen === 'true') {
      setStatus('closed');
      return;
    }

    // Block scrolling on body during animation
    document.body.classList.add('overflow-hidden');

    const openTimer = setTimeout(() => {
      setStatus('opening');
      sessionStorage.setItem('devkrupa_welcome_seen', 'true');
    }, 1500);

    const hideTimer = setTimeout(() => {
      setStatus('closed');
      document.body.classList.remove('overflow-hidden');
    }, 3700);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (status === 'closed') return null;

  const isOpen = status === 'opening';

  return (
    <div className={`door-container ${!isOpen ? 'active' : ''} ${isOpen ? 'open' : ''}`}>
      {/* Left Door */}
      <div className="door-left">
        <div className="medallion-half-left">
          <div className="emblem-half-left"></div>
          <span className="medallion-text-left">DEVK</span>
          <span className="medallion-sub-left">ESTD.</span>
        </div>
      </div>

      {/* Right Door */}
      <div className="door-right">
        <div className="medallion-half-right">
          <div className="emblem-half-right"></div>
          <span className="medallion-text-right">RUPA</span>
          <span className="medallion-sub-right">1916</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDoors;

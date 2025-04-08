import React from 'react';
import { usePlatform } from './SelectionContext';
import './components.css';

const NavigationLabels = () => {
  const { selected, setSelected } = usePlatform();

  return (
    <div className='navigation-labels'>
      {['android', 'ios'].map(platform => (
        <div
            onClick={() => setSelected(platform)}
            key={platform} className={`label ${selected === platform ? 'highlight' : ''}`}
        >
            {platform === 'ios' ? 'iOS' : platform.charAt(0).toUpperCase() + platform.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default NavigationLabels;

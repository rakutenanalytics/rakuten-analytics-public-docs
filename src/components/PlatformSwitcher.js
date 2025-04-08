import React from 'react';
import { usePlatform } from './SelectionContext';

const SpanPlatformSwitcher = ({ android, ios }) => {
    const { selected } = usePlatform();
    return (
        <span>
          {selected === 'android' ? android : ios}
        </span>
      );
};


const HrefPlatformSwitcher = ({ android, ios, text }) => {
    const { selected } = usePlatform();
    return (
    <a href={selected === 'android' ? android : ios} target="_blank" >
        {text}
    </a>
      );
};

export { SpanPlatformSwitcher, HrefPlatformSwitcher };


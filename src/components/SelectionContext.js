import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const usePlatform = () => useContext(SelectionContext);

export const PlatformSelectionProvider = ({ children }) => {
  const [selected, setSelected] = useState('android');

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  );
};

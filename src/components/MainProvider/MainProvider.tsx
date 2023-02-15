import React from 'react';
import HomePage from '../HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HOME_PATH } from '../../constants/RouterConstants';
import '../../styles/Constants.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { useState } from 'react';

const MainProvider = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <HomePage />,
    },
  ]);

  const [languageMode, setLanguageMode] = useState<'polish' | 'english'>('polish');

  return (
    <React.StrictMode>
      <LanguageModeContext.Provider value={{ languageMode, setLanguageMode }}>
        <RouterProvider router={router} />
      </LanguageModeContext.Provider>
    </React.StrictMode>
  );
};

export default MainProvider;

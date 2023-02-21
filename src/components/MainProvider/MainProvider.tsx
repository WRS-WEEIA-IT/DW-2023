import React, { useEffect, useState } from 'react';
import HomePage from '../HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HOME_PATH } from '../../constants/RouterConstants';
import '../../styles/Constants.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { LANGUAGE_MODE } from '../../constants/LocalStorageConstants';

const MainProvider = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <HomePage />,
    },
  ]);

  const [languageMode, setLanguageMode] = useState<'polish' | 'english'>('polish');

  useEffect(() => {
    const localLanguageMode = window.localStorage.getItem(LANGUAGE_MODE);
    const parsedLanguageMode: 'polish' | 'english' =
      localLanguageMode && JSON.parse(localLanguageMode);

    if (parsedLanguageMode) setLanguageMode(parsedLanguageMode);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_MODE, JSON.stringify(languageMode));
  }, [languageMode]);

  return (
    <React.StrictMode>
      <LanguageModeContext.Provider value={{ languageMode, setLanguageMode }}>
        <RouterProvider router={router} />
      </LanguageModeContext.Provider>
    </React.StrictMode>
  );
};

export default MainProvider;

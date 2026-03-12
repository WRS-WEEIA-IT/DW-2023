import React, { useEffect, useState } from 'react';
import HomePage from '../HomePage/HomePage';
import GamePage from '../GamePage/GamePage';
import LoginPage from '../LoginPage/LoginPage';
import RankingPage from '../RankingPage/RankingPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GAME_PATH, GAME_RANKING_PATH, HOME_PATH, RANKING_PATH } from '../../constants/RouterConstants';
import '../../styles/Constants.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { LANGUAGE_MODE } from '../../constants/LocalStorageConstants';

const MainProvider = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <HomePage />,
      errorElement: <HomePage />,
    },
    {
      path: GAME_PATH,
      element: (
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      ),
    },
    {
      path: RANKING_PATH,
      element: (
        <ProtectedRoute>
          <RankingPage />
        </ProtectedRoute>
      ),
    },
    {
      path: GAME_RANKING_PATH,
      element: (
        <ProtectedRoute>
          <RankingPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <LoginPage />,
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
      <AuthProvider>
        <LanguageModeContext.Provider value={{ languageMode, setLanguageMode }}>
          <RouterProvider router={router} />
        </LanguageModeContext.Provider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default MainProvider;

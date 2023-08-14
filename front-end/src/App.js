import React from 'react';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';

import './App.css';

import AddItem from './components/Item/AddItem/AddItem';
import AddRepo from './components/AddRepo/AddRepo';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ImportRepo from './pages/ImportRepo/ImportRepo';
import ItemsPage from './pages/ItemsPage/ItemsPage';
import RepositoriesPage from './pages/RepositoriesPage/RepositoriesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditItem from './components/Item/EditItem/EditItem';
import EditRepo from './components/Repo/EditRepo';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },

      { path: '/import-repo', element: <ImportRepo /> },
      {
        path: '/repositories',
        element: <RepositoriesPage />,
        children: [
          { path: 'add-repo', element: <AddRepo /> },
          { path: 'edit-repo/:repoId', element: <EditRepo /> },
        ]
      },
      {
        path: '/repo/:repoId/items',
        element: <ItemsPage />,
        children: [
          { path: 'add-item', element: <AddItem /> },
          { path: 'edit-item/:itemId', element: <EditItem /> },
        ]
      },
    ]
  }
]);


function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;

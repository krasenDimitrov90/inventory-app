import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';

import './App.css';

import AddItem from './components/AddItem/AddItem';
import AddRepo from './components/AddRepo/AddRepo';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ImportRepo from './pages/ImportRepo/ImportRepo';
import ExpiringItemsPage from './pages/ExpiringItems/ExpiringItems';
import InventoryPage from './pages/Inventory/InventoryPage';
import RepositoriesPage from './pages/Repositories/RepositoriesPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='import-repo' element={<ImportRepo />} />

            <Route path='repositories' element={<RepositoriesPage />} >
              <Route path='add-repo' element={<AddRepo />} />
            </Route>

            <Route path='inventory/:repoId' element={<InventoryPage />} >
              <Route path='add-item' element={<AddItem />} />
            </Route>

            <Route path='expiring-items/:repoId' element={<ExpiringItemsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;

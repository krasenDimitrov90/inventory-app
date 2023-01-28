import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import AddItem from './components/AddItem/AddItem';
import AddRepo from './components/AddRepo/AddRepo';
import Layout from './components/Layout/Layout';
import { AuthContextProvider } from './context/auth-context';
import ExpiringItemsPage from './pages/ExpiringItems/ExpiringItems';
import ExpiringItemsPageCopy from './pages/ExpiringItems/ExpiringItems-copy';
import HomePage from './pages/HomePage/HomePage';
import InventoryPage from './pages/Inventory/InventoryPage';
import InventoryPageCopy from './pages/Inventory/InventoryPage-copy';
import RepositoriesPage from './pages/Inventory/Repositories';
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
            <Route path='repositories' element={<RepositoriesPage />} >
              <Route path='add-repo' element={<AddRepo />} />
            </Route>
            <Route path='inventory/:repoId' element={<InventoryPageCopy />} >
              <Route path='add-item' element={<AddItem />} />
            </Route>
            <Route path='expiring-items/:repoId' element={<ExpiringItemsPageCopy />} />
            {/* <Route path='expiring-items' element={<ExpiringItemsPage />} />
            <Route path='inventory' element={<InventoryPage />} >
              <Route path='add-item' element={<AddItem />} />
            </Route> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;

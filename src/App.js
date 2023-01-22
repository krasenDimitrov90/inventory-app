import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import AddItem from './components/AddItem/AddItem';
import Layout from './components/Layout/Layout';
import { AuthContextProvider } from './context/auth-context';
import { ItemsContextProvider } from './context/items-context';
import ExpiringItemsPage from './pages/ExpiringItems/ExpiringItems';
import HomePage from './pages/HomePage/HomePage';
import InventoryPage from './pages/Inventory/InventoryPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <AuthContextProvider>
      <ItemsContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='expiring-items' element={<ExpiringItemsPage />} />
              <Route path='inventory' element={<InventoryPage />} >
                <Route path='add-item' element={<AddItem />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ItemsContextProvider>
    </AuthContextProvider>

  );
}

export default App;

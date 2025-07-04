import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ListingProvider } from './context/listingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListingProvider>
          <App />
        </ListingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

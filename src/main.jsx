import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CollectionProvider } from './context/CollectionContext';
import ThemeProvider from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
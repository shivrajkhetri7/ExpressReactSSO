import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Auth0Provider
      domain="dev-cleotwwixnrp37lv.us.auth0.com"
      clientId="syangxSsuSqYR1GiD0Lfrdl8uND817sN"
      authorizationParams={{
         redirect_uri: 'https://express-react-sso.vercel.app/'
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.Fragment>,
)

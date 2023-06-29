import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENTID}
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: 'read:matiere write:matiere read:all-matiere read:inscrit write:inscrit',
    }}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Auth0Provider>,
);


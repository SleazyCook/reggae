import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// style sheets
import './styles/index.css';
import './styles/containers/artist-details.css';
import './styles/containers/artist-listing.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
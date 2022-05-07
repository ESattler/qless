import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

if(module.hot){
  module.hot.accept()
}

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);


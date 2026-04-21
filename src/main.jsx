import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/index.jsx';

// NYT: Importer BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 

const el = document.getElementById('root');
const root = createRoot(el);

// NYT: Wrap Provider og App ind i BrowserRouter
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
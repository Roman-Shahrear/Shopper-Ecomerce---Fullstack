import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from "./Context/ShopContext";

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

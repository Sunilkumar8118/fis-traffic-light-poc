import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeContextProvider >
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeContextProvider>
  </Provider>
);
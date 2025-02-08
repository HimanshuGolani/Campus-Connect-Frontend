import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApplicationContextProvider } from './context/ApplicationContext';  
import './index.css';
import { AppProvider } from './chat/context/AppProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <ApplicationContextProvider>
      <AppProvider>
        <App />  
      </AppProvider>  
    </ApplicationContextProvider>
  </>
);

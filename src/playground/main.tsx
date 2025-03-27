import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { DemoModalProvider } from './modal.config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoModalProvider>
      <App />
    </DemoModalProvider>
  </StrictMode>,
);

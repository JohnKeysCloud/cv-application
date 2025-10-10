import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getRootElement } from './utils/get-root.ts';

import './styles/cyclone-global.scss';
import App from './App.tsx';

const root = getRootElement('root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

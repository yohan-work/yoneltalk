import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './RelayDeskApp';
import '../styles.css';
createRoot(document.getElementById('app')!).render(<StrictMode><App /></StrictMode>);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';

// styles
import './index.css';
import { store } from '~/store/store';
import SnackbarProvider from '~/components/Snackbar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ReduxProvider>
  </React.StrictMode>,
);

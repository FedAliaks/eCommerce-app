import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'redux/configure-store';
import Loader from 'components/loader/loader';
import ServiceMessage from 'components/service-message/service-message';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Loader />
      <ServiceMessage />
    </Provider>
  </React.StrictMode>,
);

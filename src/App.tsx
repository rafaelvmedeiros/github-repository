import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyles />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    {/* Same as */}
    <ToastContainer />
    <Routes />
  </BrowserRouter>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from 'service/redux/store';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import GlobalStyles from './assets/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'assets/styles/Theme';
import { media } from 'assets/styles/media';
import './i18n/i18n';

const ModalContext = React.createContext<string>('modal');

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme, ...media }}>
      <ModalContext.Provider value="modal">
        <App />
      </ModalContext.Provider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

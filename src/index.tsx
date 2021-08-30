import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from 'service/redux/store';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import GlobalStyles from './assets/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from './assets/styles/Theme';
import Auth from './service/auth';
import Repository from './service/repository';

const auth = new Auth();
const repository = new Repository();

const ModalContext = React.createContext<string>('modal');

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme }}>
      <ModalContext.Provider value="modal">
        <App auth={auth} repository={repository} />
      </ModalContext.Provider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

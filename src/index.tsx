import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import GlobalStyles from './assets/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from './assets/styles/Theme';
import Auth from './service/auth';
import Repository from './service/repository';

const auth = new Auth();
const repository = new Repository();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme }}>
      <App auth={auth} repository={repository} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

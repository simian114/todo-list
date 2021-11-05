import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyles from 'assets/styles/GlobalStyles';
import { Theme } from 'assets/styles/Theme';
import { media } from 'assets/styles/media';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from 'service/redux/slices/todosSlice';
import userReducer from 'service/redux/slices/userSlice';

// NOTE: initialState가 아니라 preloadedState 로 해야한다...!
const todos = {
  status: 'idle',
  errorMessage: '',
  todos: [
    {
      id: 'Default1',
      user: 'default',
      title: 'default',
      description: '',
      due: new Date(),
      checkList: [],
      status: 'notStarted',
      priority: 'low',
      category: 'work',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'Default2',
      user: 'default',
      title: 'default',
      description: '',
      due: new Date(),
      checkList: [],
      status: 'notStarted',
      priority: 'low',
      category: 'work',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const user = {
  uid: 'storybook',
  status: 'idle',
};

const preloadedState = { user, todos };

// NOTE: toolkit 이라 그런가? configureStore 를 해야한다!
// LINK: https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: { user: userReducer, todos: todosReducer },
  preloadedState,
});

// NOTE: 데코레이터를 통해 프로바이더들을 넣어준다.
// NOTE: Story 에 xxx.stories.tsx 가 들어간다.
export const decorators = [
  (Story) => (
    <Provider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={{ ...Theme, ...media }}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

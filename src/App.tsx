import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'service/redux/slices/userSlice';
import LoginModal from './components/LoginModal/LoginModal';
import Layout from './components/Layout';
import TodoForm from 'components/TodoForm/TodoForm';

const App: React.FC = () => {
  const user = useSelector(userSelector).uid;

  return (
    <Layout>
      <>
        <TodoForm />
        {<LoginModal visible={!!!user} />}
      </>
    </Layout>
  );
};

export default App;

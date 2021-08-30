import React, { useState, useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
interface Props {
  auth: any;
  repository: any;
}

const App: React.FC<Props> = ({ auth, repository }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (e: any) => {
    // NOTE: 전달되는 data 의 user.uid 를 이용하면 된다.
    auth
      .login(e.target.textContent)
      .then((data: any) => {
        const uid = data.user.uid;
        console.log(uid);
        setUser(uid);
      })
      .catch((error: any) => console.log(error));
  };
  const handleLogout = (e: any) => {
    auth.logout();
  };

  const handleAddTodo = () => {
    repository.addTodo(user);
  };

  const handleGetTodos = () => {
    repository.getTodos(user);
  };

  useEffect(() => {
    auth.onAuthChange();
  }, [auth]);
  return (
    <div>
      {user ? (
        <>
          <button onClick={handleLogout}>logout</button>
          <button onClick={handleAddTodo}>todo추가</button>
          <button onClick={handleGetTodos}>todo 가져오기</button>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>Google</button>
          <button onClick={handleLogin}>Github</button>
        </>
      )}
    </div>
  );
};

export default App;

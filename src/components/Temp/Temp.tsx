import React from 'react';
import {
  CreateTodo,
  getTodosRequest,
  UpdateTodo,
} from 'service/redux/slices/todosSlice';
import { logoutRequest, userSelector } from 'service/redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from 'service/todos';

const Temp = () => {
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();

  const handleClick = async () => {
    const temp: CreateTodo = {
      user,
      text: 'by button',
      createdAt: new Date(),
      updatedAt: new Date(),
      due: new Date(),
      status: 'notStarted',
      priority: 'high',
    };
    addTodo(temp);
  };

  const handleGetAll = () => {
    dispatch(getTodosRequest({ userId: user }));
  };

  const handleRemoveTodo = async () => {
    await removeTodo('1uSNr1OxCtykmhQ7Ljnv');
  };

  const handleUpdateTodo = async () => {
    const temp: UpdateTodo = {
      id: 'qm1plBqQnG6B6HGIY5cN',
      priority: 'low',
      status: 'onGoing',
    };
    await updateTodo(temp);
  };
  const handleLogout = async () => {
    dispatch(logoutRequest());
  };
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <button onClick={handleGetAll}>getAll</button>
      <button onClick={handleRemoveTodo}>removeTodo</button>
      <button onClick={handleUpdateTodo}>updateTodo</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Temp;

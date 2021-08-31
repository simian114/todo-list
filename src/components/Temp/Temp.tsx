import React from 'react';
import { CreateTodo, UpdateTodo } from 'service/redux/slices/todosSlice';
import { userSelector } from 'service/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { addTodo, getAll, removeTodo, updateTodo } from 'service/todos';

const Temp = () => {
  const user = useSelector(userSelector).uid;

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

  const handleGetAll = async () => {
    const a = await getAll(user);
    console.log(a);
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
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <button onClick={handleGetAll}>getAll</button>
      <button onClick={handleRemoveTodo}>removeTodo</button>
      <button onClick={handleUpdateTodo}>updateTodo</button>
    </div>
  );
};

export default Temp;

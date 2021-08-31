import { db } from 'firebase';
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';

import {
  Todo as ITodo,
  CreateTodo,
  UpdateTodo,
} from './redux/slices/todosSlice';

const todosRef = collection(db, 'todos');
class Todo {
  id: string;
  text: string;
  user: string;
  status: string;
  priority: string;
  due: Date;
  updatedAt: Date;
  createdAt: Date;
  constructor(todo: any) {
    this.id = todo.id;
    this.user = todo.user;
    this.text = todo.text;
    this.status = todo.status;
    this.priority = todo.priority;
    this.due = todo.due.toDate();
    this.updatedAt = todo.updatedAt.toDate();
    this.createdAt = todo.createdAt.toDate();
  }
}

const todoConverter = {
  toFirestore: function (todo: ITodo) {
    return todo;
  },
  fromFirestore: function (snapshot: any) {
    const data = snapshot.data();
    return new Todo(data);
  },
};

const getAll = async (userId: string) => {
  const q = query(todosRef, where('user', '==', userId)).withConverter(
    todoConverter,
  );
  const querySnapshot = await getDocs(q);
  let todos: any = [];
  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });
  return todos;
};

const addTodo = async (todo: CreateTodo) => {
  const temp = await addDoc(todosRef, {
    ...todo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await updateDoc(temp, { id: temp.id });
  const newTodoRef = doc(todosRef, temp.id);
  const newTodo = await getDoc(newTodoRef);
  return new Todo(newTodo.data());
};

const removeTodo = async (todoId: string) => {
  await deleteDoc(doc(todosRef, todoId));
};

const updateTodo = async (todo: UpdateTodo) => {
  const targetRef = doc(todosRef, todo.id);
  await updateDoc(targetRef, {
    ...todo,
    updatedAt: serverTimestamp(),
  });
};

export { getAll, addTodo, removeTodo, updateTodo };

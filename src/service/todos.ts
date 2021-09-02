import { db } from 'firebase';
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
  getDoc,
  setDoc,
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
  category: string;
  due: Date;
  updatedAt: Date;
  createdAt: Date;
  constructor(todo: any) {
    this.id = todo.id;
    this.user = todo.user;
    this.text = todo.text;
    this.status = todo.status;
    this.category = todo.category;
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

const getAll = async (uid: string) => {
  const q = query(todosRef, where('user', '==', uid)).withConverter(
    todoConverter,
  );
  const querySnapshot = await getDocs(q);
  let todos: any = [];
  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });
  return todos;
};

const getTodo = async (todoId: string) => {
  const ref = doc(todosRef, todoId);
  const docRef = await getDoc(ref);
  return new Todo(docRef.data());
};

const addTodo = async (todo: CreateTodo) => {
  const newTodoRef = doc(todosRef);
  await setDoc(newTodoRef, {
    ...todo,
    id: newTodoRef.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newTodoRef.id;
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
  const updatedTodo = await getDoc(targetRef);
  return new Todo(updatedTodo.data());
};

export { getAll, getTodo, addTodo, removeTodo, updateTodo };

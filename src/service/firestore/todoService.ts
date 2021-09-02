import { db } from 'firebase';
import {
  doc,
  collection,
  updateDoc,
  serverTimestamp,
  getDoc,
  setDoc,
  arrayUnion,
  DocumentReference,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';

import {
  Todo as ITodo,
  CreateTodo,
  // UpdateTodo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
} from 'service/redux/slices/todosSlice';

class TodoWorker {
  private todosRef: CollectionReference<DocumentData>;
  private userRef: DocumentReference<DocumentData>;
  private userId: string;
  public todos: ITodo[];
  constructor(userId: string) {
    this.userId = userId;
    this.todosRef = collection(db, 'todos');
    this.userRef = doc(db, `users/${this.userId}`);
    this.todos = [];
  }

  private readIds = async (ids: string[]) => {
    const reads = ids.map((id: string) => getDoc(doc(this.todosRef, id)));
    const result = await Promise.all(reads);
    return result.map((v) => new Todo(v.data()));
  };

  getAll = async () => {
    const user = await getDoc(this.userRef);
    const todosIds = user.get('todos');
    const res = await this.readIds(todosIds);
    this.todos = res;
    return res;
  };

  addTodo = async (todo: CreateTodo) => {
    const newTodoRef = doc(collection(db, 'todos'));
    await setDoc(newTodoRef, {
      ...todo,
      id: newTodoRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ref: doc(db, `users/${this.userId}`),
    });
    await updateDoc(this.userRef, {
      todos: arrayUnion(newTodoRef.id),
    });
    return newTodoRef.id;
  };
}

class Todo {
  id: string;
  text: string;
  user: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
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

export default TodoWorker;

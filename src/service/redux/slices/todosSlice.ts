import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'service/redux/store';

export type TodoStatus = 'notStarted' | 'onGoing' | 'completed';
export type TodoPriority = 'low' | 'middle' | 'high';
export type TodoCategory = 'work' | 'study' | 'life' | 'exercise' | 'etc';

export type Todo = {
  id: string;
  user: string;
  title: string;
  due: Date;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTodo = Omit<Todo, 'id' | 'updatedAt' | 'createdAt'>;
export type UpdateTodo = Partial<Todo>;

export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: any = {
  todos: [],
  status: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosRequest: (
      state: TodosState,
      action: PayloadAction<{ uid: string }>,
    ) => {
      state.status = 'loading';
    },
    getTodosSuccess: (
      state: TodosState,
      action: PayloadAction<{ todos: Todo[] }>,
    ) => {
      state.todos = action.payload.todos;
      state.status = 'idle';
    },
    getTodosFailed: (state: TodosState) => {
      state.status = 'failed';
    },
    addTodoRequest: (
      state: TodosState,
      action: PayloadAction<{ todo: CreateTodo }>,
    ) => {
      state.status = 'loading';
    },
    addTodoSuccess: (
      state: TodosState,
      action: PayloadAction<{ todo: Todo }>,
    ) => {
      state.todos.push(action.payload.todo);
      state.status = 'idle';
    },
    addTodoFailed: (state: TodosState) => {
      state.status = 'failed';
    },
    removeTodoRequest: (
      state: TodosState,
      action: PayloadAction<{ id: string }>,
    ) => {
      const todoIdx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      state.todos.splice(todoIdx, 1);
      state.status = 'loading';
    },
    updateTodoRequest: (
      state: TodosState,
      action: PayloadAction<{ updateTodo: UpdateTodo }>,
    ) => {
      const { id, ...rest } = action.payload.updateTodo;
      const todoIdx = state.todos.findIndex((todo) => todo.id === id);
      if (todoIdx !== -1) {
        const newTodo = {
          ...state.todos[todoIdx],
          ...rest,
          updatedAt: new Date(),
        };
        state.todos[todoIdx] = newTodo;
      }
    },
  },
});

export const {
  getTodosRequest,
  getTodosSuccess,
  getTodosFailed,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailed,
  removeTodoRequest,
  updateTodoRequest,
} = todosSlice.actions;

export const todosSelector = (state: RootState) => state.todos;
export default todosSlice.reducer;

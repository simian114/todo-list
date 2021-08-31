import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'service/redux/store';

type TodoStatus = 'notStarted' | 'onGoing' | 'completed';
type TodoPriority = 'low' | 'middle' | 'high';

export type Todo = {
  id: string;
  user: string;
  text: string;
  due: Date;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTodo = Omit<Todo, 'id'>;
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
      action: PayloadAction<{ userId: string }>,
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
  },
});

export const {
  getTodosRequest,
  getTodosSuccess,
  getTodosFailed,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailed,
} = todosSlice.actions;

export const todosSelector = (state: RootState) => state.todos;
export default todosSlice.reducer;

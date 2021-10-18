import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'service/redux/store';

export type TodoStatus = 'notStarted' | 'onGoing' | 'completed';
export type TodoPriority = 'low' | 'middle' | 'high';
export type TodoCategory = 'work' | 'study' | 'life' | 'exercise' | 'etc';
export type CheckList = Array<{ checked: boolean; content: string }>;

export type Todo = {
  id: string;
  user: string;
  title: string;
  description: string;
  due: Date;
  checkList: CheckList;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTodo = Omit<
  Todo,
  'id' | 'updatedAt' | 'createdAt' | 'description' | 'checkList'
>;
export type UpdateTodo = Partial<Todo>;
export type UpdateTodoStatus = { id: string; status: TodoStatus };

export type ReOrderTodos = {
  moveItem: string;
  baseItem: string;
  direction: 'before' | 'after';
  status: TodoStatus;
};

export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  errorMessage: string;
}

const initialState: any = {
  todos: [],
  status: 'idle',
  errorMessage: '',
};

// erorrMessage 를 관리해줘야함

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosError: (
      state: TodosState,
      action: PayloadAction<{ errorMessage: string }>,
    ) => {
      state.status = 'failed';
      state.errorMessage = action.payload.errorMessage;
    },
    resetStatus: (state: TodosState) => {
      state.status = 'idle';
      state.errorMessage = '';
    },
    getTodosRequest: (state: TodosState) => {
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
    reorderTodosRequest: (
      state: TodosState,
      action: PayloadAction<{ reorder: ReOrderTodos }>,
    ) => {
      const newTodos = [...state.todos];
      const { moveItem, baseItem, status, direction } = action.payload.reorder;
      const moveTodoIdx = newTodos.findIndex((todo) => todo.id === moveItem);
      if (moveTodoIdx === -1) return;
      const moveTodo = newTodos.splice(moveTodoIdx, 1)[0];
      moveTodo.status = status;
      let baseTodoIdx = newTodos.findIndex((todo) => todo.id === baseItem);
      baseTodoIdx = direction === 'after' ? baseTodoIdx + 1 : baseTodoIdx;
      newTodos.splice(baseTodoIdx, 0, moveTodo);
      state.todos = newTodos;
    },
    updateTodoStatusRequest: (
      state: TodosState,
      action: PayloadAction<{ updateTodoStatus: UpdateTodoStatus }>,
    ) => {
      const { id, status } = action.payload.updateTodoStatus;
      const todoIdx = state.todos.findIndex((todo) => todo.id === id);
      if (todoIdx === -1) return;
      const todo = state.todos[todoIdx];
      if (todo.status === status) return;
      state.todos[todoIdx] = { ...todo, status };
    },
  },
});

export const {
  setTodosError,
  resetStatus,
  getTodosRequest,
  getTodosSuccess,
  getTodosFailed,
  addTodoRequest,
  addTodoSuccess,
  removeTodoRequest,
  updateTodoRequest,
  reorderTodosRequest,
  updateTodoStatusRequest,
} = todosSlice.actions;

export const todosSelector = (state: RootState) => state.todos;
export const todoSelector = (state: RootState, id: string) =>
  state.todos.find((todo: Todo) => todo.id === id);

export default todosSlice.reducer;

import { Todo } from 'service/redux/slices/todosSlice';

const sortTodos = (todos: Todo[], key: string) => {
  type Option = {
    [key: string]: Todo[];
  };
  const options: Option = {
    사용자지정: [...todos],
    오래된순: [...todos].sort((a: Todo, b: Todo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
      else return 0;
    }),
    최신순: [...todos].sort((a: Todo, b: Todo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      else return 0;
    }),
    마감임박: [...todos].sort((a: Todo, b: Todo) => {
      if (a.due > b.due) return 1;
      if (a.due < b.due) return -1;
      else return 0;
    }),
    중요도: [...todos].sort((a: Todo, b: Todo) => {
      if (a.priority > b.priority) return 1;
      if (a.priority < b.priority) return -1;
      else return 0;
    }),
  };
  return options[key];
};

export default sortTodos;

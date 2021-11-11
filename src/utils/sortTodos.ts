import { Todo } from 'service/redux/slices/todosSlice';

const sortTodos = (todos: Todo[], key: string) => {
  type Option = { [key: string]: () => Todo[] };
  const options: Option = {
    custom: () => [...todos],
    oldest: () =>
      [...todos].sort((a: Todo, b: Todo) => {
        if (!a.createdAt || !b.createdAt) return 0;
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt < b.createdAt) return -1;
        else return 0;
      }),
    latest: () =>
      [...todos].sort((a: Todo, b: Todo) => {
        if (!a.createdAt || !b.createdAt) return 0;
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        else return 0;
      }),
    due: () =>
      [...todos].sort((a: Todo, b: Todo) => {
        if (a.due > b.due) return 1;
        if (a.due < b.due) return -1;
        else return 0;
      }),
    priority: () =>
      [...todos].sort((a: Todo, b: Todo) => {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
        else return 0;
      }),
  };
  return options[key]();
};

export default sortTodos;

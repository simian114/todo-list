import React from 'react';
import { Meta, Story } from '@storybook/react';
import TodoItem from './TodoItem';
import { Todo } from 'service/redux/slices/todosSlice';
import 'antd/dist/antd.css';

interface TodoItemProps {
  todo: Todo;
}

export default {
  component: TodoItem,
  title: 'TodoItem',
} as Meta;

const todo: Todo = {
  id: 'Default',
  user: 'default',
  title: 'default',
  description: '',
  due: new Date(),
  checkList: [],
  status: 'notStarted',
  priority: 'low',
  category: 'work',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// NOTE: Story<여기> 를 통해 props의 타입을 넣는다.
const Template: Story<TodoItemProps> = (args) => <TodoItem {...args} />;

// NOTE: export 하면 밖으로 나옴
export const Default = Template.bind({});
Default.args = {
  todo,
};

export const CheckList = Template.bind({});
CheckList.args = {
  todo: {
    ...todo,
    checkList: [
      { checked: true, content: '1' },
      { checked: false, content: '2' },
    ],
  },
};

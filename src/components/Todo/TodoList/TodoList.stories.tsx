import React from 'react';
import { Story } from '@storybook/react';
import TodoList from './TodoList';

export default {
  title: 'TodoList',
  component: TodoList,
};

const Template: Story = () => <TodoList />;

// NOTE: 내부의 todos 를 어떻게 만들지?
// NOTE: 앞에서 사용했던 데이터들을 가져와서 만든다.
export const Default = Template.bind({});

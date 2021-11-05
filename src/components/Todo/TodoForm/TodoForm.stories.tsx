import React from 'react';
import { Story } from '@storybook/react';
import TodoForm from 'components/Todo/TodoForm';

export default {
  title: 'TodoForm',
  component: TodoForm,
};

const Template: Story = () => <TodoForm />;

export const Default = Template.bind({});

// NOTE: form 의 value를 어떻게 하면 인위적으로 넣어볼 수 있을까?
export const WithValueForm = Template.bind({});

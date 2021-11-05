import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Todo } from 'service/redux/slices/todosSlice';
import TodoSection from './TodoSection';
import * as TodoStories from 'components/Todo/TodoItem/TodoItem.stories';

interface TodoSectionProps {
  title: string;
  tabList: Array<{ key: string; tab: string }>;
  todos: Todo[];
}

// NOTE: decorators 를 통해 박스의 스타일링을 설정할 수 있다.
// NOTE: 현재 TodoSection 의 크기는 341px 로 고정되어있기 때문에 이렇게 수정함
export default {
  title: 'TodoSection',
  component: TodoSection,
  decorators: [(story) => <div style={{ width: '341px' }}>{story()}</div>],
} as Meta;

const title = 'Not Started';
const tabList = [
  {
    key: 'all',
    tab: '전체',
  },
  {
    key: 'low',
    tab: '낮음',
  },
  {
    key: 'middle',
    tab: '중간',
  },
  {
    key: 'high',
    tab: '높음',
  },
];

const Template: Story<TodoSectionProps> = (args) => <TodoSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  title,
  tabList,
  // NOTE: TodoStories.Default.args!.todo as Todo 현재 이렇게 ! 와 as ... 를 사용해야지만
  // NOTE: 에러가 발생하지 않는다. 해결법 찾자.
  todos: [
    {
      ...(TodoStories.Default.args!.todo as Todo),
      id: '1',
      title: 'first',
      priority: 'low',
    },
    {
      ...(TodoStories.Default.args!.todo as Todo),
      id: '2',
      title: 'second',
      priority: 'middle',
    },
    {
      ...(TodoStories.Default.args!.todo as Todo),
      id: '3',
      title: 'third',
      priority: 'high',
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  title,
  tabList,
  todos: [],
};

export const WithHighPriorityTodos = Template.bind({});
WithHighPriorityTodos.args = {
  title,
  tabList,
  todos: [...Default.args.todos!.slice(0, 2)],
};

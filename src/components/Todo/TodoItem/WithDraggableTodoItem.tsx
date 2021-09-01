import React, { useRef } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Todo } from 'service/redux/slices/todosSlice';
import { useTodoItemDnD } from 'utils/hooks';
import { DragDirection } from 'utils/hooks/useTodoItemDnD';
import TodoItem from './TodoItem';

interface WithDraggableTodoItemProps {
  todo: Todo;
}

const WithDraggableTodoItem: React.FC<WithDraggableTodoItemProps> = ({
  todo,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    overDirection,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
  } = useTodoItemDnD(ref, todo.id);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  console.log(overDirection);
  return (
    <>
      {overDirection.length > 1 && overDirection[0] === 'top' && (
        <Card loading style={{ height: '100px' }} />
      )}
      <StyledDraggable
        ref={ref}
        overDirection={overDirection}
        draggable
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <TodoItem todo={todo} />
      </StyledDraggable>
    </>
  );
};

export default WithDraggableTodoItem;

const StyledDraggable = styled.div<{ overDirection: DragDirection[] }>`
  margin-bottom: 20px;
`;

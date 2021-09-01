import React, { useRef } from 'react';
import { Todo } from 'service/redux/slices/todosSlice';
import styled, { css } from 'styled-components';
import { useTodoItemDnD } from 'utils/hooks';
import TodoItem from './TodoItem';
import { DragDirection } from 'utils/hooks/useTodoItemDnD';
import { Card } from 'antd';

interface WithDraggableTodoItemProps {
  todo: Todo;
}

const WithDraggableTodoItem: React.FC<WithDraggableTodoItemProps> = ({
  todo,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    // isDragging,
    overDirection,
    handleDragStart, // 나
    handleDragEnter, // 당해
    handleDragOver,
    handleDragLeave,
    // setOverDirection,
  } = useTodoItemDnD(ref, todo.id);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // const a = e.dataTransfer.getData('text/plain');
  };
  console.log(overDirection);
  // const
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

// const
const test = css`
  padding-top: 100px;
`;

const StyledDraggable = styled.div<{ overDirection: DragDirection[] }>`
  // height: 177px;
  margin-bottom: 20px;
`;

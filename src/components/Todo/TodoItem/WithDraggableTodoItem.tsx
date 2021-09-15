import React from 'react';
import styled from 'styled-components';
import {
  ReOrderTodos,
  reorderTodosRequest,
  Todo,
} from 'service/redux/slices/todosSlice';
import TodoItem from './TodoItem';
import { getOverDirection } from 'utils';
import { useDragDispatch, useDragState } from 'service/context/DnDContext';
import { DragDirection } from 'utils/getOverDirection';
import { useDispatch } from 'react-redux';

interface WithDraggableTodoItemProps {
  todo: Todo;
}

const WithDraggableTodoItem: React.FC<WithDraggableTodoItemProps> = ({
  todo,
}) => {
  // NOTE: drag Provider
  const dispatch = useDispatch();
  const dndDispatch = useDragDispatch();
  const { position, hover } = useDragState();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dndDispatch({ type: 'SET_DRAGGED', dragged: todo.id });
    e.dataTransfer.setData('id', todo.id);
  };
  const handleDragEnd = () => {
    dndDispatch({ type: 'INIT' });
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const position = getOverDirection(e);
    dndDispatch({
      type: 'HOVER',
      hover: todo.id || null,
      position,
    });
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.getData('id') === todo.id) return;
    const direction =
      position[0] === 'top' || position[1] === 'bottom' ? 'before' : 'after';
    const reorder: ReOrderTodos = {
      moveItem: e.dataTransfer.getData('id'),
      baseItem: todo.id,
      direction,
      status: todo.status,
    };
    dispatch(reorderTodosRequest({ reorder }));
    dndDispatch({ type: 'HOVER', hover: null, position: ['none', 'none'] });
  };

  // TODO: 현재 브라우저가 태블릿 사이즈를 넘어사면 top, bottom 으로 해야하고
  // TODO: 태블릿 사이즈 이하면 left, right 로 해야한다.
  return (
    <StyledDraggable
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      position={position}
      hover={todo.id === hover}
    >
      <TodoItem todo={todo} />
    </StyledDraggable>
  );
};

export default WithDraggableTodoItem;

const StyledDraggable = styled.div<{
  position?: DragDirection[];
  hover?: boolean;
  direction?: 'before' | 'after';
}>`
  margin-bottom: 20px;
  transition: 0.5s all ease;
  ${({ hover, position }) =>
    hover &&
    position &&
    position[0] === 'top' &&
    `
    &: before {
      content: '⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆';
    }
  `}
  ${({ hover, position }) =>
    hover &&
    position &&
    position[0] === 'bottom' &&
    `
    &: after {
      content: '⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️';
    }
  `}
`;

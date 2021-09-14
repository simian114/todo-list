import React, { useRef } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Todo } from 'service/redux/slices/todosSlice';
import { DragDirection } from 'utils/hooks/useTodoItemDnD';
import TodoItem from './TodoItem';
import { getOverDirection } from 'utils';
import { useDragDispatch, useDragState } from 'service/context/DnDContext';

interface WithDraggableTodoItemProps {
  todo: Todo;
}

const WithDraggableTodoItem: React.FC<WithDraggableTodoItemProps> = ({
  todo,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // NOTE: drag Provider
  const dispatch = useDragDispatch();
  const { position, hover } = useDragState();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', todo.id);
  };
  const handleDragEnd = () => {
    dispatch({ type: 'SET_HOVER', hover: null });
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const position = getOverDirection(e);
    dispatch({
      type: 'SET_POSITION',
      position,
    });
    dispatch({
      type: 'SET_HOVER',
      hover: todo.id || null,
    });
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(todo.id);
    console.log(e.dataTransfer.getData('id'));
    console.log('drop!');
  };

  // TODO: 현재 브라우저가 태블릿 사이즈를 넘어사면 top, bottom 으로 해야하고
  // TODO: 태블릿 사이즈 이하면 left, right 로 해야한다.
  return (
    <>
      {/* {position[0] === 'top' && hover === todo.id && <StyledDiv />} */}
      <StyledDraggable
        ref={ref}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        position={position}
        focus={hover === todo.id}
      >
        <TodoItem todo={todo} />
      </StyledDraggable>
      {/* {position[0] === 'bottom' && hover === todo.id && <StyledDiv />} */}
    </>
  );
};

export default WithDraggableTodoItem;

const StyledSkelotonCard = styled(Card)`
  witdh: 228px;
  height: 175px;
`;

const StyledDiv = styled.div`
  width: 228px;
  height: 175px;
`;

const StyledDraggable = styled.div<{
  position: DragDirection[];
  focus: boolean;
}>`
  margin-bottom: 20px;
  transition: 0.5s all ease;
`;

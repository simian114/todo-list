import { useState } from 'react';

export type DragDirection = 'top' | 'bottom' | 'left' | 'right' | 'none';

export const getOverDirection = (
  e: React.DragEvent<HTMLElement>,
): DragDirection[] => {
  const { clientX, clientY } = e;
  const { scrollHeight, offsetWidth } = e.currentTarget;
  const boundingRect = e.currentTarget.getBoundingClientRect();
  const updown =
    (clientY - boundingRect.top) / scrollHeight > 0.5 ? 'bottom' : 'top';

  const leftRight =
    (clientX - boundingRect.left) / offsetWidth > 0.5 ? 'right' : 'left';
  return [updown, leftRight];
};

const useTodoItemDnD = (ref: React.RefObject<HTMLDivElement>, id: string) => {
  const [isDragging, setisDragging] = useState(false);
  const [overDirection, setOverDirection] = useState<DragDirection[]>(['none']);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setisDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${id}`);
  };

  const handleDragEnter = () => {};

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ref || !ref.current) return;
    const direction = getOverDirection(e);
    setOverDirection(direction);
  };

  const handleDragLeave = () => {
    setOverDirection(['none']);
  };

  return {
    isDragging,
    overDirection,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    setOverDirection,
  };
};

export default useTodoItemDnD;

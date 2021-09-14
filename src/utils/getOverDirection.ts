export type DragDirection = 'top' | 'bottom' | 'left' | 'right' | 'none';

const getOverDirection = (e: React.DragEvent<HTMLElement>): DragDirection[] => {
  const { clientX, clientY } = e;
  const { scrollHeight, offsetWidth } = e.currentTarget;
  const boundingRect = e.currentTarget.getBoundingClientRect();
  const updown =
    (clientY - boundingRect.top) / scrollHeight > 0.5 ? 'bottom' : 'top';

  const leftRight =
    (clientX - boundingRect.left) / offsetWidth > 0.5 ? 'right' : 'left';
  return [updown, leftRight];
};
export default getOverDirection;

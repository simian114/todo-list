import React, { createContext, useReducer, useContext } from 'react';
import { DragDirection } from 'utils/getOverDirection';

type State = {
  dragged: string | null;
  hover: string | null;
  position: DragDirection[];
};

type Action =
  | { type: 'INIT' }
  | { type: 'DRAGGED'; dragged: string | null }
  | { type: 'HOVER'; hover: string | null; position: DragDirection[] }
  | { type: 'BOX' };

type DragDispatch = React.Dispatch<Action>;

const DragStateContext = createContext<State>({} as State);
const DragDispatchContext = createContext<DragDispatch>({} as DragDispatch);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT':
      return { dragged: null, hover: null, position: ['none', 'none'] };
    case 'DRAGGED':
      return { ...state, dragged: action.dragged };
    case 'HOVER':
      const newState = { ...state, hover: action.hover };
      if (
        state.position[0] === action.position[0] &&
        state.position[1] === action.position[1]
      ) {
        return { ...newState };
      }
      return { ...newState, position: action.position };
    case 'BOX':
      return { ...state, hover: null, position: ['none', 'none'] };
    default:
      throw new Error('Unhandled action');
  }
};
const DragProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    dragged: null,
    hover: null,
    position: ['none', 'none'],
  });
  return (
    <DragDispatchContext.Provider value={dispatch}>
      <DragStateContext.Provider value={state}>
        {children}
      </DragStateContext.Provider>
    </DragDispatchContext.Provider>
  );
};
export default DragProvider;

export const useDragState = (): State => useContext(DragStateContext);
export const useDragDispatch = (): DragDispatch =>
  useContext(DragDispatchContext);

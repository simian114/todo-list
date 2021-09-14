import React, { createContext, useReducer, useContext } from 'react';
import { DragDirection } from 'utils/getOverDirection';

type State = {
  hover: string | null;
  // position: number;
  position: DragDirection[];
};

type Action =
  | { type: 'SET_HOVER'; hover: string | null }
  // | { type: 'SET_POSITION'; position: number };
  | { type: 'SET_POSITION'; position: DragDirection[] };

type DragDispatch = React.Dispatch<Action>;

const DragStateContext = createContext<State>({} as State);
const DragDispatchContext = createContext<DragDispatch>({} as DragDispatch);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_HOVER':
      if (state.hover === action.hover) {
        return state;
      }
      return {
        ...state,
        hover: action.hover,
      };
    case 'SET_POSITION':
      // if (state.position === action.position) {
      if (
        state.position[0] === action.position[0] &&
        state.position[1] === action.position[1]
      ) {
        return state;
      }
      return {
        ...state,
        // position: action.position,
        position: action.position,
      };
    default:
      throw new Error('Unhandled action');
  }
};
const DragProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
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

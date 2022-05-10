import { createContext } from "react";

const ReducerContext = createContext({
  state: {},
  dispatch: () => {},
});

export default ReducerContext;

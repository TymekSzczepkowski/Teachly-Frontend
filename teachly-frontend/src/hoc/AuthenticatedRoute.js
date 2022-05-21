import { useContext } from "react";
import {Navigate } from "react-router-dom";
import ReducerContext from "../context/reducerContext";

export default function AuthenticatedRoute({ children }) {
  const context = useContext(ReducerContext);

  return context.state.user ? children : <Navigate to='/login' />;
}

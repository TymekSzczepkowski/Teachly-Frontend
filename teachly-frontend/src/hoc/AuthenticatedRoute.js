import { useContext } from "react";
import {Navigate } from "react-router-dom";
import ReducerContext from "../context/reducerContext";

export default function AuthenticatedRoute() {
  const context = useContext(ReducerContext);

  return context.state.user ? <Navigate to='/profile' /> : <Navigate to='/login' />;
}

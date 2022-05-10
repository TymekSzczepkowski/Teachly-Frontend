import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ReducerContext from "../context/reducerContext";

export default function AuthenticatedRoute(props) {
  const context = useContext(ReducerContext);

  return context.state.user ? <Route {...props} /> : <Redirect to='/login' />;
}

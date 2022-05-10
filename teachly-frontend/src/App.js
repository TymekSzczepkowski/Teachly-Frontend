import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import Home from "./pages/Home/Home";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { reducer, intialState } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}>
        <ReducerContext.Provider
          value={{
            state,
            dispatch,
          }}>
          <Router>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/activate/:uidURL/:tokenURL' element={<VerifyEmail />}></Route>
            </Routes>
          </Router>
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;

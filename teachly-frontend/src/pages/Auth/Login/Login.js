import React from "react";

function Login() {
  return (
    <div>
      <form>
        <h1>Zaloguj się</h1>
        <div>
          <input placeholder="Podaj email" type="email" ></input>
        </div>
        <div>
          <input placeholder="Podaj hasło" type="password"></input>
        </div>
        <div>
          <button>Zaloguj się</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React from "react";
import emailVerification from "../../../hooks/Auth/emailVerification";

function UserDetails({ nextStep, step, state, setState }) {
  const profileTypeVerifier = () => {
    if (state.profileType === "") {
      console.log("Please choose profile type");
      return false;
    }
  };

  const emailVerifier = emailVerification(state);

  const passwordVerifier = () => {
    if (state.password === "") console.log("Please enter Password");
    else if (state.repeatPassword === "")
      console.log("Please enter confirm password");
    else if (state.password !== state.repeatPassword) {
      console.log("\nPassword did not match: Please try again...");
      return false;
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <div>
        <div>Krok {step}-4</div>
        <div>Załóż konto</div>
        <form>
          <div>
            <label>
              <input
                type='radio'
                name='profileType'
                onChange={() => {
                  setState({ ...state, profileType: "Uczeń" });
                }}
              />
              Uczeń
            </label>
            <label>
              <input
                type='radio'
                name='profileType'
                onChange={() => {
                  setState({ ...state, profileType: "Korepetytor" });
                }}
              />
              Korepetytor
            </label>
          </div>
          <div>
            <input
              placeholder='Adres email'
              value={state.email}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Hasło'
              value={state.password}
              type='password'
              onChange={(e) => {
                setState({ ...state, password: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Powtórz hasło'
              value={state.repeatPassword}
              type='password'
              onChange={(e) => {
                setState({ ...state, repeatPassword: e.target.value });
              }}></input>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                profileTypeVerifier();
                emailVerifier();
                passwordVerifier();
              }}>
              Kontynuuj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;

import React from "react";

function Confirmation({ nextStep, previousStep, step, state }) {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    previousStep();
  };
  return (
    <div>
      <div>
        <div>Krok {step}-4</div>
        <div>
          <div>
            <h4>Rodzaj profilu</h4>
            <span>{state.profileType}</span>
          </div>
          <div>
            <h4>Email</h4>
            <span>{state.email}</span>
          </div>
          <div>
            <h4>Imię</h4>
            <span>{state.firstName}</span>
            <h4>Nazwisko</h4>
            <span>{state.lastName}</span>
          </div>
          <div>
            <h4>Kraj</h4>
            <span>{state.country}</span>
          </div>
          <div>
            <h4>Województwo</h4>
            <span>{state.region}</span>
          </div>
          <div>
            <h4>Miasto</h4>
            <span>{state.city}</span>
          </div>
        </div>
        <div>
          <button onClick={Previous}>Powrót</button>
          <button onClick={Continue}>Kontynuuj i potwierdź rejestracje</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

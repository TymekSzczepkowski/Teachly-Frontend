import React from "react";

function PersonalDetails({ nextStep, previousStep,step}) {
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
        <div>Załóż konto</div>
        <form>
          <div>
            <input placeholder='Imię'></input>
          </div>
          <div>
            <input placeholder='Nazwisko'></input>
          </div>
          <div>
            <input placeholder='Kraj'></input>
          </div>
          <div>
            <input placeholder='Województwo'></input>
          </div>
          <div>
            <input placeholder='Miasto'></input>
          </div>
          <div>
            <button onClick={Previous}>Powrót</button>
            <button onClick={Continue}>Kontynuuj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalDetails;

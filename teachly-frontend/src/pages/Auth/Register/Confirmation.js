import React from "react";

function Confirmation({ step, nextStep, previousStep }) {
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
      <div>Krok {step}-4</div>
      Confirmation
      <div>
        <button onClick={Previous}>Powrót</button>
        <button onClick={Continue}>Kontynuuj</button>
      </div>
    </div>
  );
}

export default Confirmation;
